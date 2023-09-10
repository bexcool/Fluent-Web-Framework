import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { exit } from "node:process";
import { dirname, resolve } from "path";
import tar from "tar";
import { fileURLToPath } from "url";
import { brotliCompressSync, constants as zConsts } from "zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "tmp");
if (!existsSync(outputPath)) 
	mkdirSync(outputPath);

const tmpFile = resolve(outputPath, "icons.tar");
const outFile = resolve(outputPath, "icons.tar.br");

console.time("Create icons.tar");
tar.c(
	{
		file: tmpFile,
		cwd: resolve(__dirname, "node_modules", "@fluentui", "svg-icons")
	},
	["icons"]
).then((e) => {
	if (e) {
		console.error("cannot create tarball", e);
		exit(1);
	}
	console.timeEnd("Create icons.tar");
	
	console.time("Create icons.tar.br");
	const compressed = brotliCompressSync(readFileSync(tmpFile), {
		params: { [zConsts.BROTLI_PARAM_QUALITY]: zConsts.BROTLI_MAX_QUALITY }
	});

	writeFileSync(outFile, compressed);
	unlinkSync(tmpFile);
	console.timeEnd("Create icons.tar.br");
});
