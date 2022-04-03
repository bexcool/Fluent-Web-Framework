import { lstatSync, writeFileSync } from "fs";
import glob from "glob";
import { dirname, posix, resolve, sep } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create a list of icons
const iconsDir = resolve(__dirname, "node_modules", "@fluentui", "svg-icons", "icons") + sep;
glob(iconsDir + "**/*", (err, res) => {
	console.time("Create icons listing");
	if (err)
		throw new Error(`Could not get the icons listing: ${err.message}`);
	const outputDir = resolve(__dirname, "src", "js", "icons") + sep;
	const outputFile = outputDir + "list.ts";

	// Object of first icon segment => [icon names], used for grouping in output file
	let iconsList = {};
	// Make the path use the same directory separators
	// Filter out directory names
	// Only keep the file name
	// Some icons are in a directory, so convert \ to /
	// Remove file extensions
	// Sort alphabetically
	// Group icons
	res
		.map(icon => resolve(icon))
		.filter(icon => lstatSync(icon).isFile())
		.map(icon => icon.replace(iconsDir, ""))
		.map(icon => icon.split(sep).join(posix.sep))
		.map(icon => icon.replace(".svg", ""))
		.sort((a, b) => a.localeCompare(b))
		.map(icon => {
			const groupId = icon.split(/[_|/-]+/)[0];
			if (!(groupId in iconsList))
				iconsList[groupId] = [];
			iconsList[groupId].push(icon);
		});

	// Template literal with quotes instead of JSON.stringify: https://linkify.cz/template-stringify-bench
	// Convert to a grouped array (without []) of icons with comments
	let lastGroup = "";
	const iconsString = Object.entries(iconsList)
		.map((group, i) => {
			const isFirst = i === 0;
			const isLast = i + 1 === Object.keys(iconsList).length;
			const groupId = group[0];
			// Capitalize the first letter
			// For easier searching - g:
			const comment = `g:${groupId[0].toUpperCase()}${groupId.slice(1)}`;
			// Make the icon names a valid string and join them
			const val = group[1].map(icon => `"${icon}"`).join(",");
			let prefix = "", suffix = "";
			if (groupId !== lastGroup) {
				lastGroup = groupId;
				// Make it start on a new line
				if (isFirst) prefix = "\n\t";
				// A comma because val doesn't have it
				suffix = ",\n";
				// Don't insert \t at the end of array
				if (!isLast) suffix += "\t";
			}
			return `${prefix}//${comment}\n\t${val}${suffix}`;
		})
		.join("");
	// Create group union types of all icons
	const iconGroupsType = Object.entries(iconsList)
		.map(group => {
			const name = group[0];
			const values = group[1].map(icon => `"${icon}"`).join("|");
			return `type ${name}_t = ${values};`;
		})
		.join("\n");
	// Make a simple union type of all groups
	// Grouped by intial
	let lastGroupInitial = "";
	const groupUnionType = Object.keys(iconsList)
		.map(groupId => {
			const initial = groupId.charAt(0);
			if (initial !== lastGroupInitial) {
				lastGroupInitial = initial;
				groupId = `\n\t${groupId}`;
			}
			return `${groupId}_t`;
		})
		.join("|");

	const content = `/*
Generated file, DO NOT EDIT (changes will be lost anyway)
*/
import { CDN_URL } from "../fluent";

// Convert ["icon_name", ...] to {icon_name: "icon_name", ...}
const arrToObj = (arr: _Icons[]) => Object.fromEntries(arr.map(e => [e, e]));
export const _iconsUrl = \`\${CDN_URL}/icons\` as const;
export const _icons = arrToObj([${iconsString}]);
export type _Icons = ${groupUnionType};
${iconGroupsType}
`.replaceAll("\n", "\r\n"); // ESLint wants us to use windows line breaks

	writeFileSync(outputFile, content);
	console.timeEnd("Create icons listing");
});
