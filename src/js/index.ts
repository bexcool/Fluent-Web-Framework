import "../scss/index.scss";
import animations from "./animations/index";
import { config } from "./config";
import elements from "./elements/index";
import { CDN_URL, FluentDefine, FluentExpose, isInitialized, onInitialized } from "./fluent";
import initIcons from "./icons";
import theme from "./theme/index";
import util from "./util/index";
import init from "./util/init";


(async () => {
	FluentDefine(CDN_URL, "CDN_URL", true);
	FluentExpose(isInitialized, true);
	FluentExpose(onInitialized, true);
	FluentExpose(onInitialized, true, "onReady");
	await initIcons();
	if (config.enableRouter) {
		const router = await import("./router/index");
		console.log("[fluent router]", "imported");
		// init
		router.default();
		FluentExpose(router.routerAddHandler, true, "routerAddHandler");
		FluentExpose(router.routerAddHandlers, true, "routerAddHandlers");
		FluentExpose(router.routerNavigate, true, "routerNavigate");
	}
	util();
	theme();
	elements();
	animations();

	init();
})();
