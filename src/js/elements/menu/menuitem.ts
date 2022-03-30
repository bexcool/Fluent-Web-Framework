import { attributesToString } from "../../util/html";
import { FluentElement, FluentRegister } from "../fluent-element";

export class MenuItem extends HTMLElement implements FluentElement {
	flName = "fluent-menu-item";

	connectedCallback() {
		setTimeout(() => {
			// Check if is selectable
			if (!this.hasAttribute("selectable")) {
				this.outerHTML = `<li><a class="fluent-menu-item" ${attributesToString(this)}>${this.innerHTML}` || "" +
					"</a></li>";
			}
			else {
				this.outerHTML = `<li><a class="fluent-menu-item-select" ${attributesToString(this)}>${this.innerHTML}` || "" +
					"</a></li>";
			}
		});
	}
}

FluentRegister(MenuItem, "fluent-menu-item");
