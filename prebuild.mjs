import glob from "glob";
import { dirname, resolve, sep, posix } from "path";
import { writeFileSync, lstatSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create a list of all icons
console.time("Create icons listing");
const iconsDir = resolve(__dirname, "node_modules", "@fluentui", "svg-icons", "icons") + sep;
glob(iconsDir + "**/*", (err, res) => {
	if (err)
		throw new Error(`Could not get the icons listing: ${err.message}`);
	const outputDir = resolve(__dirname, "src", "js", "icons") + sep;
	const outputFile = outputDir + "list.ts";

	// Make the path use the same directory separators
	// Filter out directory names
	// Only keep the file name
	// Some icons are in a directory, so convert \ to /
	// Remove file extensions
	let iconsList = res
		.map(icon => resolve(icon))
		.filter(icon => lstatSync(icon).isFile())
		.map(icon => icon.replace(iconsDir, ""))
		.map(icon => icon.split(sep).join(posix.sep))
		.map(icon => icon.replace(".svg", ""));
	// Convert it to a formatted json with tabs
	const iconsString = JSON.stringify(iconsList, null, 4).replaceAll(" ".repeat(4), "\t");
	// Make a simple string union type
	// Template literal instead of JSON.stringify: https://linkify.cz/template-stringify-bench
	const iconsType = iconsList.map(icon => `"${icon}"`).join("\n\t| ");

	const content = `/*
Generated file, DO NOT EDIT (changes will be lost anyway)
*/
import { CDN_URL } from "../fluent";

// Convert ["icon-name", ...] to {"icon-name": "icon-name", ...}
const arrToObj = (arr: _Icons[]) => Object.fromEntries(arr.map(e => [e, e]));
export const _iconsUrl = \`\${CDN_URL}/icons\` as const;
export const _icons = arrToObj(${iconsString});
export type _Icons = ${iconsType};
`.replaceAll("\n", "\r\n"); // ESLint wants us to use windows line breaks

	writeFileSync(outputFile, content);
	console.timeEnd("Create icons listing");
});
