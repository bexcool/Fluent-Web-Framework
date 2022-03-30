import { CDN_URL } from "../../fluent";
import { FluentElement, FluentRegister } from "../fluent-element";

export class Expander extends HTMLElement implements FluentElement {
	flName = "fluent-expander";

	connectedCallback() {
		// TODO: ???
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Header = this.attributes.Header != null ? this.attributes.Header.value : "";

		setTimeout(() => {
			if (this.hasAttribute("expanded")) {
				this.outerHTML = /*html*/`<div style="${this.style.cssText}" class="fluent-expander"><div class="fluent-expander-header"><p>${Header}</p><div><img class="fluent-expander-arrow" style="transform: rotate(180deg)" src="${CDN_URL}/img/arrow_down.svg"></div></div><div class="fluent-expander-body-container"><div class="fluent-expander-body expanded">${this.innerHTML}</div></div></div>`;
			}
			else {
				this.outerHTML = /*html*/`<div style="${this.style.cssText}" class="fluent-expander"><div class="fluent-expander-header"><p>${Header}</p><div><img class="fluent-expander-arrow" src="https://cdn.spej.eu/fwf/img/arrow_down.svg"></div></div><div class="fluent-expander-body-container"><div class="fluent-expander-body">${this.innerHTML}</div></div></div>`;
			}
		});
	}
}

FluentRegister(Expander, "fluent-expander");
