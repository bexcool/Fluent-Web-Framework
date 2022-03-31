import { addAlpha, colorNameToHex, getVisibleTextColor, hexToRgbA, pSBC } from "../code/code";

export default () => {
	const labels = document.querySelectorAll<HTMLElement>(".fluent-label");

	labels.forEach(label => {
		if (label.hasAttribute("consolas")) {
			label.style.fontFamily = "Consolas, monaco, monospace";
		}

		if (label.hasAttribute("color")) {
			const _color = label.getAttribute("color") as string;
			const color = _color?.includes("#") ? _color : colorNameToHex(_color);
			label.style.backgroundColor = addAlpha(pSBC(0.05, color), 0.2);
			label.style.borderColor = pSBC(-0.9, addAlpha(color, 0.9)) ?? "";
			label.style.color = label.style.backgroundColor.includes("#") ? getVisibleTextColor(hexToRgbA(label.style.backgroundColor)) : getVisibleTextColor(label.style.backgroundColor);
		}
	});
};
