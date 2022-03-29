import { AttributesToString } from "../code/code";
import { FluentElement, FluentRegister } from "../fluent-element";

export class Label extends HTMLElement implements FluentElement {
	flName = "fluent-label";

	connectedCallback() {
		setTimeout(() => {
			this.outerHTML = `<span class="fluent-label" ${AttributesToString(this)}>${this.innerHTML}</span>`;
		});
	}
}

FluentRegister(Label, "fluent-label");
