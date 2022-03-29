export interface FluentElement {
	flName?: string;
}

// TODO: Figure out the type (HTMLElement + interface FluentElement)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FluentRegister = (el: FluentElement & CustomElementConstructor, name: string) => {
	customElements.define(name, el);
};
