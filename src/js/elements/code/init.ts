// TODO: Fix vscode thinking it's invalid
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import iCopy from "@fluentui/svg-icons/icons/copy_20_regular.svg";
import { copyToClipboard } from "../../util/clipboard";
import { decodeHtml } from "../../util/html";
import { uniqueRand } from "../../util/math";
import { showFlyout } from "../flyout/flyout";

export default () => {
	const codes = document.querySelectorAll("code");

	codes.forEach(code => {
		const copyId = `flcode-${code.id || "cat"}${uniqueRand()}`;

		code.outerHTML = `<div class="fluent-code-container"><div style="display: inline-block; margin: 0.225em 0;">${code.innerHTML}</div><button class="fluent-code-copy-button" id="${copyId}">${iCopy}</button></div>`;

		// Copy button click
		const copyButton = document.getElementById(copyId) as HTMLButtonElement;
		copyButton.addEventListener("click", () => {
			// eslint-disable-next-line no-irregular-whitespace
			copyToClipboard(decodeHtml(code.innerHTML).replace(/<\/?span[^>]*>/g, "").replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, " "));

			if (copyButton)
				showFlyout(copyButton, "Code copied!", 1000);
		});
	});
};
