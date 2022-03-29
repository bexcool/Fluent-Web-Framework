/* eslint-disable @typescript-eslint/no-explicit-any */
let _Initialized = false;
export const isInitialized = () => {
	return _Initialized;
};
export const setInitialized = (v: boolean) => {
	_Initialized = v;
};

// TOOD: Make this const, but without undefined values
export let splash: {
	background: HTMLDivElement;
	image: HTMLImageElement;
};

export const KEY_THEME = "Fluent.Theme";
export const KEY_MICA = "Fluent.Mica";
// Allows http:
export const CDN_URL = "//cdn.spej.eu/fwf";

// To keep compatibility with the vanilla js Fluent Framework,
// Makes window more polluted
const noPrefix = (window as any)?.FLUENT_NO_PREFIX ?? false;
const prefix = "Fluent_";

const makeGlobal = (val: any, name: string) => {
	console.log("globalized", name, val);
	(window as any)[name] = val;
	if (noPrefix)
		(window as any)[name.replace(prefix, "")] = val;
};

// For exposing consts (maybe variables)
export const FluentDefine = <T>(val: T, name: string, namespace = false) => {
	if (namespace)
		name = `${prefix}${name}`;
	makeGlobal(val, name);
};

// For exposing functions
// eslint-disable-next-line @typescript-eslint/ban-types
export const FluentExpose = (fn: Function, namespace = false, name: string = fn.name) => {
	if (namespace)
		name = `${prefix}${name}`;
	makeGlobal(fn, name);
};
