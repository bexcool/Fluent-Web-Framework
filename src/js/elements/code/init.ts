import { copyToClipboard } from "../../util/clipboard";
import { attributesToString, decodeHtml } from "../../util/html";
import { showFlyout } from "../flyout/flyout";
import { codeSyntaxHigh } from "./code";

export default () => {
	// Code
	document.querySelectorAll("code").forEach(code => {
		code.outerHTML = `<div class="fluent-code-container"><div style="display: inline-block; margin: 0.225em 0;"><code ${attributesToString(code)} style="${code.style.cssText}">${code.innerHTML}</code></div><button class="fluent-code-copy-button" ><svg class="fluent-svg" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path class="fluent-svg-path" d="M8 2C6.89543 2 6 2.89543 6 4V14C6 15.1046 6.89543 16 8 16H14C15.1046 16 16 15.1046 16 14V4C16 2.89543 15.1046 2 14 2H8ZM7 4C7 3.44772 7.44772 3 8 3H14C14.5523 3 15 3.44772 15 4V14C15 14.5523 14.5523 15 14 15H8C7.44772 15 7 14.5523 7 14V4ZM4 6.00001C4 5.25973 4.4022 4.61339 5 4.26758V14.5C5 15.8807 6.11929 17 7.5 17H13.7324C13.3866 17.5978 12.7403 18 12 18H7.5C5.567 18 4 16.433 4 14.5V6.00001Z" fill="#212121"/></svg></button></div>`;
	});

	document.querySelectorAll("code").forEach(code => {
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
