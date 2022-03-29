export const decodeHtml = (html: string) => {
	const txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
};

