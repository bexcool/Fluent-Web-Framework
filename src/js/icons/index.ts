import { FluentDefine, FluentExpose } from "../fluent";
import { _icons, _Icons, _iconsUrl } from "./list";
export { _Icons as Icons } from "./list";

const _cache: { [k in _Icons]?: string } = {};

export default () => {
	FluentDefine(_icons, "icons", true);
	FluentDefine(_iconsUrl, "CDN_URL_ICONS", true);
	FluentExpose(getIcon, true);
	FluentExpose(iconExists, true);
};

export const iconExists = (icon: string): icon is _Icons => icon in _icons;

export const getIcon = async (icon: string): Promise<string | null> => {
	if (!iconExists(icon)) return null;
	if (icon in _cache)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return _cache[icon]!;
	else {
		const res = await fetch(`${_iconsUrl}/${icon}.svg`);
		if (!res.ok)
			return null;
		const val = await res.text();
		_cache[icon] = val;
		return val;
	}
};
