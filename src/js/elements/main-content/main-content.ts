import { AttributesToString } from "../code/code";
import { FluentElement, FluentRegister } from "../fluent-element";

export class MainContent extends HTMLElement implements FluentElement {
	flName = "fluent-main-content";

	connectedCallback() {
		setTimeout(() =>
			this.outerHTML = `<div class="fluent-main-content" ${AttributesToString(this)}>${this.innerHTML}</div>`
		);
	}
}

FluentRegister(MainContent);
