// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FluentElement {

}

export const FluentRegister = (el: FluentElement & CustomElementConstructor, name: string) => {
	customElements.define(name, el);
};
