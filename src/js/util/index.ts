import { FluentExpose } from "../fluent";
import { copyToClipboard } from "./clipboard";
import { decodeHtml } from "./html";
import { clamp } from "./math";

export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export default () => {
	FluentExpose(capitalize, true);
	FluentExpose(copyToClipboard, true);
	FluentExpose(decodeHtml, true);
	FluentExpose(clamp, true);
};
