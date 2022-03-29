import { FluentElement, FluentRegister } from "../fluent-element";

export class ContextMenu extends HTMLElement implements FluentElement {
	flName = "fluent-contextmenu";

	connectedCallback() {
		// TODO: ???
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Header = this.attributes.Header != null ? this.attributes.Header.value : "";
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Url = this.attributes.Url != null ? this.attributes.Url.value : "#";

		setTimeout(() =>
			this.outerHTML = `<div style="${this.style.cssText}" class="fluent-context-menu-container" style=""><a href="${Url}">${Header}</a><div class="fluent-context-menu"><ul class="fluent-menu-list">${this.innerHTML}</ul></div></div>`);
	}
}

FluentRegister(ContextMenu);
