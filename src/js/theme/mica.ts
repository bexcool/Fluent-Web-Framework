import { FluentExpose, KEY_MICA } from "../fluent";

export const isMicaActive = () => (/true/i).test(localStorage.getItem(KEY_MICA) ?? "false");

export const enableMica = () => {
	document.documentElement.getElementsByClassName("fluent-mica-effect")[0].classList.add("mica-enabled");
	localStorage.setItem("Mica", "true");
};

export const disableMica = () => {
	document.documentElement.getElementsByClassName("fluent-mica-effect")[0].classList.remove("mica-enabled");
	localStorage.setItem("Mica", "false");
};

FluentExpose(isMicaActive, true);
FluentExpose(enableMica, true);
FluentExpose(disableMica, true);
