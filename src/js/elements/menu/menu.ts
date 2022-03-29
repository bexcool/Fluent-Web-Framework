import { AttributesToString } from "../code/code";
import { FluentElement, FluentRegister } from "../fluent-element";

export class Menu extends HTMLElement implements FluentElement {
	flName = "fluent-menu";

	connectedCallback() {
		setTimeout(() =>
			this.outerHTML = `<div class="fluent-menu" ${AttributesToString(this)}><ul class="fluent-menu-list">${this.innerHTML}</ul></div></div>`
		);
	}
}

FluentRegister(Menu);
