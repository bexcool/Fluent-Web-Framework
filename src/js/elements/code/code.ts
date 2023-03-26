import iCopy from "@fluentui/svg-icons/icons/copy_20_regular.svg";
import * as Prism from "prismjs";
import { copyToClipboard } from "../../util/clipboard";
import { decodeHtml } from "../../util/html";
import { uniqueRand } from "../../util/math";
import { showFlyout } from "../flyout/flyout";

// Smart/reusable factory for code element
// Template specifies id & language, which creates a new element
// Basic code elements just pass themselves, not creating anything
export const createCodeElement = (codeContent: string, options: { id?: string; language?: string; codeElement?: HTMLElement }): HTMLElement => {
	const element = options.codeElement ?? document.createElement("pre");


	const copyId = options.id ?? `flcode-${element.id ?? "cat"}${uniqueRand()}`;

	const container = document.createElement("div");
	container.classList.add("fluent-code-container");
	const wrapper = document.createElement("div");
	wrapper.style.display = "inline-block";
	wrapper.style.margin = "0.225em 0";
	wrapper.innerHTML = codeContent;
	if (options.language) {
		wrapper.classList.add(`language-${options.language}`);
		Prism.highlightElement(wrapper);
	}
	container.append(wrapper);

	const copyButton = document.createElement("button");
	copyButton.id = copyId;
	copyButton.classList.add("fluent-code-copy-button");
	copyButton.innerHTML = iCopy;
	container.append(copyButton);

	// Copy button click
	copyButton.addEventListener("click", () => {
		// eslint-disable-next-line no-irregular-whitespace
		copyToClipboard(decodeHtml(codeContent).replace(/<\/?span[^>]*>/g, "").replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, " "));

		if (copyButton)
			showFlyout(copyButton, "Code copied!", 1000);
	});

	// Replace original code with the modified
	if (options.codeElement)
		element.replaceWith(container);
	// Insert into new element
	else
		element.append(container);
	return element;
};
