import { CDN_URL, docElement, KEY_THEME } from "../fluent";

interface Theme {
	// Global colors
	"black-white-color": string;
	"dark-color": string;
	"dark-border-color": string;
	"darker-color": string;
	"darker-color-noa": string;
	"light-color": string;
	"light-trans-color": string;
	"light-hover-color": string;
	"lighter-hover-color": string;
	"lighter-press-color": string;
	"light-border-color": string;
	"lighter-border-color": string;
	"focus-color": string;
	"text-color-inverted": string;
	"text-focus-color-inverted": string;
	"text-color": string;
	"text-focus-color": string;
	"text-nobg-color": string;
	"textbox-border-bottom-color": string;
	"light-dark-color": string;
	"accent-focus-color": string;
	"accent-hover-color": string;
	"accent-color": string;
	"icon-color": string;

	// Syntax Highlighting
	"HTML-tagcolor": string;
	"HTML-tagnamecolor": string;
	"HTML-attributecolor": string;
	"HTML-attributevaluecolor": string;
	"HTML-commentcolor": string;
	"CSS-selectorcolor": string;
	"CSS-propertycolor": string;
	"CSS-propertyvaluecolor": string;
	"CSS-delimitercolor": string;
	"CSS-importantcolor": string;
	"JS-color": string;
	"JS-keywordcolor": string;
	"JS-stringcolor": string;
	"JS-numbercolor": string;
	"JS-propertycolor": string;
	// Button
	"button-color": string;
	"button-hover-color": string;
	"button-focus-color": string;
	"button-border-color": string;
	// Slider
	"slider-thumb-border-color": string;
	// Background
	"background-image": string;
}

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
		return setDarkTheme();
	if (theme === "LIGHT")
		return setLightTheme();
	setDarkTheme();
};

export const switchTheme = () => {
	if (getActiveTheme() === "DARK")
		setTheme("LIGHT");
	else
		setTheme("DARK");
};

function setDarkTheme() {
	_setTheme({
		// Global colors
		"black-white-color": "white",
		"dark-color": "rgb(32, 32, 32)",
		"dark-border-color": "rgb(25, 25, 25, 0.6)",
		"darker-color": "hsla(0, 0%, 100%, 3.26%)",
		"darker-color-noa": "rgb(43, 43, 43)",
		"light-color": "hsla(0, 0%, 100%, 5.12%)",
		"light-trans-color": "rgba(40, 40, 40, 0.7)",
		"light-hover-color": "hsla(0, 0%, 100%, .084)",
		"lighter-hover-color": "rgba(100, 100, 100, 0.25)",
		"lighter-press-color": "rgba(100, 100, 100, 0.125)",
		"light-border-color": "rgba(25, 25, 25, 0.25)",
		"lighter-border-color": "rgba(105, 105, 105, 0.25)",
		"focus-color": "rgba(255, 255, 255, 0.043)",
		"text-color-inverted": "black",
		"text-focus-color-inverted": "rgba(0, 0, 0, 0.5)",
		"text-color": "white",
		"text-focus-color": "rgba(255, 255, 255, 0.75)",
		"text-nobg-color": "rgb(185, 185, 185)",
		"textbox-border-bottom-color": "rgb(180, 180, 180)",
		"light-dark-color": "rgb(33, 33, 33)",
		"accent-focus-color": "#42a1d2",
		"accent-hover-color": "#47b1e8",
		"accent-color": "#4cc2ff",
		"icon-color": "0",
		// Syntax Highlighting
		"HTML-tagcolor": "darkgray",
		"HTML-tagnamecolor": "#569cd6",
		"HTML-attributecolor": "#9cdcfe",
		"HTML-attributevaluecolor": "#ce9178",
		"HTML-commentcolor": "#6a9955",
		"CSS-selectorcolor": "#d7ba7d",
		"CSS-propertycolor": "#569cd6",
		"CSS-propertyvaluecolor": "#ce9178",
		"CSS-delimitercolor": "white",
		"CSS-importantcolor": "#569cd6",
		"JS-color": "#dcdcaa",
		"JS-keywordcolor": "#569cd6",
		"JS-stringcolor": "#ce9178",
		"JS-numbercolor": "#b5cea8",
		"JS-propertycolor": "#4fc1ff",
		// Button
		"button-color": "hsla(0, 0%, 100%, .061",
		"button-hover-color": "rgba(255, 255, 255, 0.089)",
		"button-focus-color": "rgba(255, 255, 255, 0.040)",
		"button-border-color": "rgba(63, 63, 63, 0.5)",
		// Slider
		"slider-thumb-border-color": "rgb(69, 69, 69)",
		// Background
		"background-image": `url(${CDN_URL}/img/background_dark.png)`,
	}, themes.DARK);
}

function setLightTheme() {
	_setTheme({
		// Global colors
		"black-white-color": "black",
		"dark-color": "rgb(238, 238, 238)",
		"dark-border-color": "rgb(225, 225, 225)",
		"darker-color": "hsla(0, 0%, 100%, 46.74%)",
		"darker-color-noa": "",
		"light-color": "hsla(0, 0%, 100%, 65.12%)",
		"light-trans-color": "rgba(251, 251, 251, 0.7)",
		"light-hover-color": "rgb(0, 0, 0, 0.03)",
		"lighter-hover-color": "rgb(242, 242, 242)",
		"lighter-press-color": "rgb(245, 245, 245)",
		"light-border-color": "rgba(220, 220, 220, 0.4)",
		"lighter-border-color": "rgba(180, 180, 180, 0.4)",
		"focus-color": "rgb(0, 0, 0, 0.02)",
		"text-color-inverted": "white",
		"text-focus-color-inverted": "rgba(255, 255, 255, 0.5)",
		"text-color": "black",
		"text-focus-color": "rgba(0, 0, 0, 0.55)",
		"text-nobg-color": "rgb(50, 50, 50)",
		"textbox-border-bottom-color": "rgb(110, 110, 110)",
		"light-dark-color": "rgb(248, 248, 248)",
		"accent-focus-color": "#3183ca",
		"accent-hover-color": "#1975c5",
		"accent-color": "#0067c0",
		"icon-color": "0.7",
		// Syntax Highlighting
		"HTML-tagcolor": "#0000ff",
		"HTML-tagnamecolor": "#a31616",
		"HTML-attributecolor": "#ff0000",
		"HTML-attributevaluecolor": "#0000ff",
		"HTML-commentcolor": "#6a9955",
		"CSS-selectorcolor": "#800000",
		"CSS-propertycolor": "#ff0000",
		"CSS-propertyvaluecolor": "#0451a5",
		"CSS-delimitercolor": "#000",
		"CSS-importantcolor": "#000",
		"JS-color": "#795e26",
		"JS-keywordcolor": "#0000ff",
		"JS-stringcolor": "#a31616",
		"JS-numbercolor": "#098658",
		"JS-propertycolor": "#001080",
		// Button
		"button-color": "hsla(0, 0%, 100%, .939",
		"button-hover-color": "rgba(255, 255, 255, 0.611)",
		"button-focus-color": "rgba(255, 255, 255, 0.040)",
		"button-border-color": "rgba(150, 150, 150, 0.3)",
		// Slider
		"slider-thumb-border-color": "white",
		// Background
		"background-image": `url(${CDN_URL}/img/background_light.png)`,
	}, themes.LIGHT);
}

function _setTheme(theme: Theme, key: Themes) {
	Object.entries(theme).forEach(c => docElement.style.setProperty(`--${c[0]}`, c[1]));
	localStorage.setItem(KEY_THEME, key);

	document.querySelectorAll("code").forEach(code => {
		code.dispatchEvent(new Event("code_RefreshSH"));
	});
}
