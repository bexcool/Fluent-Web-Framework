import { getIcon } from "../../icons";
import { copyToClipboard } from "../../util/clipboard";
import { attributesToString, decodeHtml } from "../../util/html";
import { showFlyout } from "../flyout/flyout";
import { codeSyntaxHigh } from "./code";

export default () => {
	const codes = document.querySelectorAll("code");

	codes.forEach(code => {
		code.outerHTML = `<div class="fluent-code-container"><div style="display: inline-block; margin: 0.225em 0;"><code ${attributesToString(code)} style="${code.style.cssText}">${code.innerHTML}</code></div><button class="fluent-code-copy-button" >${getIcon("clipboard")}</button></div>`;

		// Copy button click
		code?.parentElement?.parentElement?.children[1].addEventListener("click", () => {
			// eslint-disable-next-line no-irregular-whitespace
			copyToClipboard(decodeHtml(code.innerHTML).replace(/<\/?span[^>]*>/g, "").replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, " "));

			if (code?.parentElement?.parentElement?.children[1])
				showFlyout(code.parentElement.parentElement.children[1] as HTMLElement, "Code copied!", 1000);
		});

		const codeContent = code.innerHTML;

		code.addEventListener("code_RefreshSH", () => {
			code.innerHTML = codeContent;

			if (code.hasAttribute("sh")) {
				codeSyntaxHigh(code, code.getAttribute("sh")?.toLowerCase());
			}
		});
	});
};
