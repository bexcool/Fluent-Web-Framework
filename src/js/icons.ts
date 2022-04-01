import { CDN_URL } from "./fluent";

const icons = ["clipboard", "eye-closed", "eye-open"] as const;
type Icons = typeof icons[number];

const _iconsStore = new Map<Icons, string>();

export const getIcon = (icon: Icons): string => {
	return _iconsStore.get(icon) ?? "";
};

export default async () => {
	icons.forEach(async icon => {
		const res = await (await fetch(`${CDN_URL}/icons/${icon}.svg`)).text();
		_iconsStore.set(icon, res);
	});
};
