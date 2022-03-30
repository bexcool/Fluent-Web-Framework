import { attributesToString } from "../../util/html";
import { FluentElement, FluentRegister } from "../fluent-element";

export class MainContent extends HTMLElement implements FluentElement {
	flName = "fluent-main-content";

	connectedCallback() {
		setTimeout(() =>
			this.outerHTML = `<div class="fluent-main-content" ${attributesToString(this)}>${this.innerHTML}</div>`
		);
	}
}

FluentRegister(MainContent, "fluent-main-content");
