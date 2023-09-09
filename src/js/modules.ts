import { config } from "./config";

const error = (module: string) => new Error(`Cannot use ${module} module if disabled`);

export const mCode = async () => {
	if (!config.enableCode)
		throw error("code");
	return await import("./elements/code/index");
};

export const mRouter = async () => {
	if (!config.enableRouter)
		throw error("router");
	return await import("./router/index");
};

export const mIcons = async () => {
	if (!config.enableIcons)
		throw error("icons");
	return await import("./icons/index");
};

