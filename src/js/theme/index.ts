import { FluentDefine, FluentExpose } from "../fluent";
import { disableMica, enableMica, isMicaActive } from "./mica";
import { getActiveTheme, onThemeChanged, setTheme, switchTheme, themes } from "./theme";


export default () => {
	FluentDefine(themes, "themes", true);
	FluentExpose(getActiveTheme, true);
	FluentExpose(setTheme, true);
	FluentExpose(switchTheme, true);
	FluentExpose(onThemeChanged, true);

	FluentExpose(isMicaActive, true);
	FluentExpose(enableMica, true);
	FluentExpose(disableMica, true);
};
