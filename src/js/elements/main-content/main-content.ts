import { attributesToString } from "../../util/html";
import { FluentElement, FluentRegister } from "../fluent-element";

export class MainContent extends HTMLElement implements FluentElement {
	connectedCallback() {
		setTimeout(() =>
			this.outerHTML = /*html*/`<div class="fluent-main-content" ${attributesToString(this)}>${this.innerHTML}</div>`
		);
	}
}

FluentRegister(MainContent, "fluent-main-content");
