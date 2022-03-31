import "../scss/index.scss";
import animations from "./animations/index";
import { config } from "./config";
import elements from "./elements/index";
import { CDN_URL, FluentDefine, FluentExpose, isInitialized, onInitialized } from "./fluent";
import theme from "./theme/index";
import util from "./util/index";
import init from "./util/init";


(async () => {
	console.log(config);

	FluentDefine(CDN_URL, "CDN_URL", true);
	FluentExpose(isInitialized, true);
	FluentExpose(onInitialized, true);
	FluentExpose(onInitialized, true, "onReady");
	if (config.enableRouter) {
		const router = await import("./router/index");
		console.log("fluent router", "imported", "enabled");
		// init
		router.default();
		FluentExpose(router.routerAddHandler, true, "routerAddHandler");
		FluentExpose(router.routerAddHandlers, true, "routerAddHandlers");
		FluentExpose(router.routerNavigate, true, "routerNavigate");
	}
	else {
		console.log("fluent router", "disabled");
	}
	util();
	theme();
	elements();
	animations();

	init();
})();
