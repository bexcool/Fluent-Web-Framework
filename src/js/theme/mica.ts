import { docElement, KEY_MICA } from "../fluent";

export const isMicaActive = () => (/true/i).test(localStorage.getItem(KEY_MICA) ?? "true");

export const enableMica = () => {
	docElement.classList.remove("fluent-mica-disabled");
	docElement.classList.add("fluent-mica-enabled");
	localStorage.setItem(KEY_MICA, "true");
};

export const disableMica = () => {
	docElement.classList.remove("fluent-mica-enabled");
	docElement.classList.add("fluent-mica-disabled");
	localStorage.setItem(KEY_MICA, "false");
};
