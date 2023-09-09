import { disableMica, enableMica, isMicaActive } from "./mica";
import { getActiveTheme, setTheme, themes } from "./theme";

export default () => {
	if (getActiveTheme() == themes.LIGHT)
		setTheme("LIGHT");
	// else if (getActiveTheme() == themes.DARK)
	else
		setTheme("DARK");

	// Init mica
	const mica = document.createElement("div");
	mica.classList.add("fluent-mica-effect");
	document.body.appendChild(mica);

	if (isMicaActive())
		enableMica();
	else
		disableMica();
};
