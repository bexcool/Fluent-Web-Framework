import { FluentExpose } from "../fluent";
import { copyToClipboard } from "./clipboard";
import { decodeHtml } from "./html";
import { clamp } from "./math";

export default () => {
	FluentExpose(copyToClipboard, true);
	FluentExpose(decodeHtml, true);
	FluentExpose(clamp, true);
};
