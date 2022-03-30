import { docElement, KEY_MICA } from "../fluent";

export const isMicaActive = () => (/true/i).test(localStorage.getItem(KEY_MICA) ?? "false");

export const enableMica = () => {
	docElement.getElementsByClassName("fluent-mica-effect")[0].classList.add("mica-enabled");
	localStorage.setItem(KEY_MICA, "true");
};

export const disableMica = () => {
	docElement.getElementsByClassName("fluent-mica-effect")[0].classList.remove("mica-enabled");
	localStorage.setItem(KEY_MICA, "false");
};
