import { readFileSync, unlinkSync, writeFileSync } from "fs";
import { resolve } from "path";
import tar from "tar";
import { brotliCompressSync, constants as zConsts } from "zlib";

console.time("Create icons.tar");
tar.c(
	{
		file: "icons.tar",
		cwd: resolve("node_modules", "@fluentui", "svg-icons")
	},
	["icons"]
).then(() => {
	console.timeEnd("Create icons.tar");

	writeFileSync("icons.tar.br",
		brotliCompressSync(readFileSync("icons.tar"), {
			params: { [zConsts.BROTLI_PARAM_QUALITY]: zConsts.BROTLI_MAX_QUALITY }
		}));
	unlinkSync("icons.tar");
});
