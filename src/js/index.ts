import "../scss/index.scss";
import animations from "./animations/index";
import { config } from "./config";
import elements from "./elements/index";
import { CDN_URL, FluentDefine, FluentExpose, isInitialized, onInitialized } from "./fluent";
import { mCode, mIcons, mRouter } from "./modules";
import theme from "./theme/index";
import util from "./util/index";
import init from "./util/init";


(async () => {
	FluentDefine(CDN_URL, "CDN_URL", true);
	FluentExpose(isInitialized, true);
	FluentExpose(onInitialized, true);
	FluentExpose(onInitialized, true, "onReady");
	if (config.enableIcons) {
		const code = await mCode();
		console.log("[fluent code]", "imported");
	}
	if (config.enableRouter) {
		const router = await mRouter();
		console.log("[fluent router]", "imported");
		router.default();
	}
	if (config.enableIcons) {
		const icons = await mIcons();
		console.log("[fluent icons]", "imported");
		icons.default();
	}
	util();
	theme();
	elements();
	animations();

	init();
})();
