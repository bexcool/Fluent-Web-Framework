export interface FluentElement {
	flName?: string;
}

export const FluentRegister = (el: FluentElement & CustomElementConstructor, name: string) => {
	customElements.define(name, el);
};
