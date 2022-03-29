import { FluentElement, FluentRegister } from "../fluent-element";

export class Border extends HTMLElement implements FluentElement {
	flName = "fluent-border";

	connectedCallback() {
		setTimeout(() =>
			this.outerHTML = `<div style="${this.style.cssText}" class="fluent-background-border">${this.innerHTML}</div>`
		);
	}
}

FluentRegister(Border, "fluent-border");
