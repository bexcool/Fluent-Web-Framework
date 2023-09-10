import { readdirSync } from "fs";
import { dirname, extname, join, resolve } from "path";
import { sync } from "prepend-file";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "dist");

// Add copyright to every js or css file
console.time("Add headers");
const files = readdirSync(outputPath)
	.map(file => join(outputPath, file))
	.filter((file) => extname(file) === ".js" || extname(file) === ".css");

files.forEach(file => sync(file, `/* (c)${new Date().getFullYear()} BeXCool, All rights reserved. */\n`));
console.timeEnd("Add headers");
