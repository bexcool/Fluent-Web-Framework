import { attributesToString } from "../../util/html";
import { FluentElement, FluentRegister } from "../fluent-element";

export class Hyperlink extends HTMLElement implements FluentElement {
	connectedCallback() {
		setTimeout(() => {
			this.outerHTML = `<a class="fluent-hyperlink" ${attributesToString(this)}>${this.innerHTML}</a>`;
		});
	}
}

FluentRegister(Hyperlink, "fluent-hyperlink");
