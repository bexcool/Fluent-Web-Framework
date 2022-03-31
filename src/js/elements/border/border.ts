import { FluentElement, FluentRegister } from "../fluent-element";

export class Border extends HTMLElement implements FluentElement {
	connectedCallback() {
		setTimeout(() =>
			this.outerHTML = /*html*/`<div style="${this.style.cssText}" class="fluent-background-border">${this.innerHTML}</div>`
		);
	}
}

FluentRegister(Border, "fluent-border");
