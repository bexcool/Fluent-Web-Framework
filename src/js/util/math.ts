import { FluentExpose } from "../fluent";

export const clamp = (num: number, min: number, max: number) => {
	return Math.min(Math.max(num, min), max);
};

FluentExpose(clamp, true);
