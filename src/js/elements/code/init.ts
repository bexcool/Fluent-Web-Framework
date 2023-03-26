import { createCodeElement } from "./code";
import templateCode from "./template";


export default () => {
	// Probably all browsers should support this
	if ("content" in document.createElement("template")) {
		templateCode();
	}

	const codes = document.querySelectorAll("code");

	codes.forEach(code => {
		const element = createCodeElement(code.innerHTML, { codeElement: code });
		code.replaceWith(element);
	});
};
