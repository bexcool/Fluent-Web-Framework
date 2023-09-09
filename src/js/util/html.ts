export const escapeHtml = (unsafeHtml: string): string => {
	// https://stackoverflow.com/a/6234804/8304380
	return unsafeHtml.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
};

export const decodeHtml = (html: string): string => {
	const txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
};

export function attributesToString(element: Element) {
	const elementAtt = Array.from(element.attributes, ({ name, value }) => (!value ? `${name}` : `${name}="${value}"`));
	const attrs = elementAtt.join(" ").trim();
	return attrs;
}
