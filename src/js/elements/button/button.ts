import { attributesToString } from "../../util/html";
import { FluentElement, FluentRegister } from "../fluent-element";

export class Button extends HTMLElement implements FluentElement {
	connectedCallback() {
		setTimeout(() => {
			if (this.hasAttribute("accent")) {
				this.outerHTML = /*html*/`<a class="fluent-button-accent" href="#" ${attributesToString(this)}>${this.innerHTML}</a>`;
			}
		});
	}
}

FluentRegister(Button, "fluent-button");
