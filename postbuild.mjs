import { readdirSync } from "fs";
import { extname, join, resolve, sep } from "path";
import { sync } from "prepend-file";
import tar from "tar";

const outputPath = resolve("./dist");

// Add copyright to every js or css file
console.time("Add headers");
const files = readdirSync(outputPath)
	.map(file => join(outputPath, file))
	.filter((file) => extname(file) === ".js" || extname(file) === ".css");

files.forEach(file => sync(file, `/* (c)${new Date().getFullYear()} BeXCool, All rights reserved. */\n`));
console.timeEnd("Add headers");


// Create tar of icons
// eslint-disable-next-line no-undef
if (process.argv.includes("--create-tar")) {
	console.time("Create icons.tar");
	tar.c(
		{
			file: resolve("dist") + sep + "icons.tar",
			cwd: resolve("node_modules", "@fluentui", "svg-icons")
		},
		["icons"]
	).then(_ => {
		console.timeEnd("Create icons.tar");
	});
}
