export const decodeHtml = (html: string) => {
	const txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
};

export function attributesToString(element: Element) {
	const elementAtt = Array.from(element.attributes, ({ name, value }) => (!value ? `${name}` : `${name}="${value}"`));
	const attrs = elementAtt.join(" ").trim();
	return attrs;
}
