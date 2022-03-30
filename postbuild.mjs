import { readdirSync } from "fs";
import { resolve, join, extname } from "path";
import { sync } from "prepend-file";


const outputPath = resolve("./dist");

const files = readdirSync(outputPath)
	.map(file => join(outputPath, file))
	.filter((file) => extname(file) === ".js" || extname(file) === ".css");

files.forEach(file => sync(file, `/* (c)${new Date().getFullYear()} BeXCool, All rights reserved. */\n`));
