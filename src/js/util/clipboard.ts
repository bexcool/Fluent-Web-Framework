import { FluentExpose } from "../fluent";

export const copyToClipboard = (string: string) => {
	navigator.clipboard.writeText(string);
};

FluentExpose(copyToClipboard, true);
FluentExpose(copyToClipboard);
