import { attributesToString } from "../../util/html";
import { FluentElement, FluentRegister } from "../fluent-element";

export class Menu extends HTMLElement implements FluentElement {
	connectedCallback() {
		setTimeout(() =>
			this.outerHTML = /*html*/`<div class="fluent-menu" ${attributesToString(this)}><ul class="fluent-menu-list">${this.innerHTML}</ul></div>`
		);
	}
}

FluentRegister(Menu, "fluent-menu");
