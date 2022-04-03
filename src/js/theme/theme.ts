import { docElement, KEY_THEME } from "../fluent";

// Could be optimized by it being an array, then converting to an object
// using .reduce, but this is simply too small to be useful
export type Themes = "DARK" | "LIGHT";
export const themes: { [k in Themes]: Themes } = {
	"DARK": "DARK",
	"LIGHT": "LIGHT",
};

export const getActiveTheme = () => localStorage.getItem(KEY_THEME) as Themes ?? themes.DARK;

export const setTheme = (theme: Themes) => {
	if (theme === "DARK")
		return _setTheme(themes.DARK);
	if (theme === "LIGHT")
		return _setTheme(themes.LIGHT);
	_setTheme(themes.DARK);
};

export const switchTheme = () => {
	if (getActiveTheme() === "DARK")
		setTheme("LIGHT");
	else
		setTheme("DARK");
};

function _setTheme(key: Themes) {
	// Could be written with an if, but easier to maintain
	Object.values(themes)
		.filter(t => t !== key)
		.forEach(t => docElement.classList.remove(`fluent-theme-${t.toLowerCase()}`));
	docElement.classList.add(`fluent-theme-${key.toLowerCase()}`);

	localStorage.setItem(KEY_THEME, key);
}
