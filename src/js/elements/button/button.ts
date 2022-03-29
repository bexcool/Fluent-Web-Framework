import { AttributesToString } from "../code/code";
import { FluentElement, FluentRegister } from "../fluent-element";

export class Button extends HTMLElement implements FluentElement {
	flName = "fluent-button";

	connectedCallback() {
		setTimeout(() => {
			if (this.hasAttribute("accent")) {
				this.outerHTML = `<a class="fluent-button-accent" href="#" ${AttributesToString(this)}>${this.innerHTML}</a>`;
			}
		});
	}
}

FluentRegister(Button);
