import { attributesToString } from "../../util/html";
import { FluentElement, FluentRegister } from "../fluent-element";

export class Label extends HTMLElement implements FluentElement {
	flName = "fluent-label";

	connectedCallback() {
		setTimeout(() => {
			this.outerHTML = /*html*/`<span class="fluent-label" ${attributesToString(this)}>${this.innerHTML}</span>`;
		});
	}
}

FluentRegister(Label, "fluent-label");
