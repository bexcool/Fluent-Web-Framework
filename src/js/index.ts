import "../css/fluent.scss";
import animations from "./animations/index";
import elements from "./elements/index";
import { CDN_URL, FluentDefine, FluentExpose, isInitialized, onInitialized } from "./fluent";
import theme from "./theme/index";
import util from "./util/index";
import init from "./util/init";


(() => {
	FluentDefine(CDN_URL, "CDN_URL", true);
	FluentExpose(isInitialized, true);
	FluentExpose(onInitialized, true);
	FluentExpose(onInitialized, true, "onReady");
	util();
	theme();
	elements();
	animations();

	init();
})();
