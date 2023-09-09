import { attributesToString } from "../../util/html";

export default () => {
	// Button attributes
	const buttons = document.querySelectorAll("button");

	buttons.forEach(button => {
		// Set styles
		if (button.hasAttribute("accent")) {
			button.outerHTML = `<button class="fluent-button-accent" ${attributesToString(button)}>${button.innerHTML}</button>`;
		}
		else if (button.hasAttribute("hyperlink")) {
			button.outerHTML = `<button class="fluent-button-hyperlink" ${attributesToString(button)}>${button.innerHTML}</button>`;
		}

		// Get URL attribute
		if (button.hasAttribute("url")) {
			button.addEventListener("click", () => {
				const url = button.getAttribute("url") ?? "";
				window.open(url, "_self");
			});
		}
		else if (button.hasAttribute("urlnew")) {
			button.addEventListener("click", () => {
				const urlnew = button.getAttribute("urlnew") ?? "";
				window.open(urlnew);
			});
		}
	});

	// a attributes
	const links = document.querySelectorAll("a");

	links.forEach(link => {
		if (link.hasAttribute("accent")) {
			link.outerHTML = `<a ${attributesToString(link)} class="fluent-button-accent">${link.innerHTML}</a>`;
		}
		else if (link.hasAttribute("hyperlink")) {
			link.outerHTML = `<a ${attributesToString(link)} class="fluent-button-hyperlink">${link.innerHTML}</a>`;
		}
	});
};
