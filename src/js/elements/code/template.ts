/* eslint-disable indent */
import * as Prism from "prismjs";
import { escapeHtml } from "../../util/html";
import { uniqueRand } from "../../util/math";
import { createCodeElement } from "./code";

export default () => {
	const templates = document.querySelectorAll<HTMLTemplateElement>("template[fluent-code]");

	templates.forEach(template => {
		// Must be specified
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const language = template.getAttribute("fluent-code")!;
		if (!(language in Prism.languages)) {
			console.warn(`unknown language "${language}"`);
		}

		const outletId = template.getAttribute("outlet-id");
		const outputMode = outletId === null ? "append" : "outlet";

		const id = `flcode-${template.id || "smart-cat"}${uniqueRand()}`;

		const codeElement = createCodeElement(escapeHtml(template.innerHTML), { id, language });
		const contentNode = template.content.cloneNode(true);
		const contentTag = document.createComment(id);
		// fluent-border > code
		const codeNode = document.createElement("fluent-border");
		codeNode.append(codeElement);

		switch (outputMode) {
			case "append": {
				template.after(codeNode, contentTag);
				break;
			}
			case "outlet": {
				const disableToken = "$disable";
				// We wouldn't be here if it was null
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const outletIds = outletId!.split("//");
				const outletCodeId = outletIds[0];
				const outletNodeId = outletIds[1];
				const outletCode = document.getElementById(outletCodeId);
				const outletNode = document.getElementById(outletNodeId);

				if (outletCodeId !== disableToken) {
					if (outletCode === null) {
						console.error(`code outlet ${outletId} doesn't exist`);
						return;
					}
					outletCode.replaceWith(codeNode);
				}
				if (outletNodeId !== disableToken) {
					if (outletNode === null) {
						outletCode?.before(contentTag);
						break;
					}
					outletNode.replaceWith(contentTag);
				}
				break;
			}
		}

		contentTag.after(contentNode);
	});
};
