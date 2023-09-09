import { FluentExpose } from "../fluent";
import "./border/border";
import "./button/button";
import "./button/togglebutton";
import "./content-dialog/content-dialog";
import { hideContentDialog, showContentDialog } from "./content-dialog/content-dialog";
import "./context-menu/context-menu";
import "./expander/expander";
import "./flyout/flyout";
import { showFlyout } from "./flyout/flyout";
import "./hyperlink/hyperlink";
import "./label/label";
import "./main-content/main-content";
import "./menu/menu";
import "./menu/menuitem";
import "./menu/menuitemexpander";
import "./pages/pages";
import { setActivePageIndex } from "./pages/pages";
import "./splash/splash";
import { showSplashScreen } from "./splash/splash";


export default () => {
	FluentExpose(showSplashScreen, true);
	FluentExpose(setActivePageIndex, true);
	FluentExpose(showFlyout, true);
	FluentExpose(showContentDialog, true);
	FluentExpose(hideContentDialog, true);
};
