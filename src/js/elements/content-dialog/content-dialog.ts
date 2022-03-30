import { attributesToString } from "../../util/html";
import { FluentElement, FluentRegister } from "../fluent-element";

export class ContentDialog extends HTMLElement implements FluentElement {
	flName = "fluent-content-dialog";

	connectedCallback() {
		setTimeout(() => {
			this.outerHTML = /*html*/`<div class="fluent-content-dialog-background"><div class="fluent-content-dialog" ${attributesToString(this)}>${this.innerHTML}</div></div>`;
		});
	}
}

FluentRegister(ContentDialog, "fluent-content-dialog");


export const showContentDialog = (id: string) => {
	const contentDialog = document.getElementById(id);

	if (contentDialog != null) {
		const parent = contentDialog.parentElement as HTMLElement;
		parent.style.animation = "fluent-content-dialog-fade 0.1s ease-in";
		parent.style.display = "flex";
		document.body.style.overflow = "hidden";
		setTimeout(() => { parent.style.animation = "none"; }, 105);
	}
};

// Hide content dialog
export const hideContentDialog = (id: string) => {
	const contentDialog = document.getElementById(id);

	if (contentDialog != null) {
		const parent = contentDialog.parentElement as HTMLElement;
		parent.style.animation = "fluent-content-dialog-fade-rev 0.1s ease-out";
		setTimeout(() => { parent.style.display = "none"; document.body.style.overflow = "auto"; }, 85);
	}
};
