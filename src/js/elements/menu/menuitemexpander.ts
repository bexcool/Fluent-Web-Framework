// TODO: Fix vscode thinking it's invalid
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import iChevronDown from "@fluentui/svg-icons/icons/chevron_down_24_regular.svg";
import { FluentElement, FluentRegister } from "../fluent-element";

export class MenuItemExpander extends HTMLElement implements FluentElement {
	connectedCallback() {
		// TODO: ???
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Header = this.attributes.Header != null ? this.attributes.Header.value : "";
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Icon = this.attributes.icon;

		setTimeout(() => {
			if (this.hasAttribute("expanded")) {
				this.outerHTML = /*html*/`<div style="${this.style.cssText}" class="fluent-menu-item-expander"><div class="fluent-menu-item-expander-header" ${Icon !== null ? `icon="${Icon?.value}"` : ""}><p>${Header}</p><div class="fluent-menu-item-expander-arrow" style="transform: rotate(180deg)">${iChevronDown}</div></div><div class="fluent-menu-item-expander-body-container"><div class="fluent-menu-item-expander-body expanded">${this.innerHTML}</div></div></div>`;
			}
			else {
				this.outerHTML = /*html*/`<div style="${this.style.cssText}" class="fluent-menu-item-expander"><div class="fluent-menu-item-expander-header" ${Icon !== null ? `icon="${Icon?.value}"` : ""}><p>${Header}</p><div class="fluent-menu-item-expander-arrow">${iChevronDown}</div></div><div class="fluent-menu-item-expander-body-container"><div class="fluent-menu-item-expander-body">${this.innerHTML}</div></div></div>`;
			}
		});
	}
}

FluentRegister(MenuItemExpander, "fluent-menu-item-expander");
