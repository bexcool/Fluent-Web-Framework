import { FluentElement, FluentRegister } from "../fluent-element";

export class ToggleButton extends HTMLElement implements FluentElement {
	connectedCallback() {
		setTimeout(() =>
			this.outerHTML = /*html*/`<button style="${this.style.cssText}" class="fluent-button">${this.innerHTML}</button>`
		);
	}
}

FluentRegister(ToggleButton, "fluent-togglebutton");
