import { capitalize } from "./util/index";
/* eslint-disable @typescript-eslint/no-explicit-any */

type InitCallback = () => void;
export const initializeCallbacks: InitCallback[] = [];
let _Initialized = false;
export const isInitialized = () => _Initialized;
export const onInitialized = (cb: InitCallback) => initializeCallbacks.push(cb);
export const setInitialized = () => {
	// Only call once
	if (!isInitialized()) {
		_Initialized = true;
		initializeCallbacks.forEach(cb => cb());
	}
};

export const docElement = document.documentElement;
export const splash: {
	background: HTMLDivElement;
	image: HTMLImageElement;
} = {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	background: undefined,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	image: undefined
};

export const KEY_THEME = "Fluent.Theme";
export const KEY_MICA = "Fluent.Mica";
// Allows http:
export const CDN_URL = "//cdn.spej.eu/fwf";

// Config
const config = (window as any)?.FLUENT;
// TODO: Use an external syntax highlight library that would get loaded if this is true
export const enableCode = config?.enableCode ?? false;
// To keep compatibility with the vanilla js Fluent Framework,
// Makes window more polluted
const noPrefix = config?.noPrefix ?? false;
const prefix = "Fluent_";


const makeGlobal = (val: any, name: string) => {
	console.log("globalized", name, val);
	(window as any)[name] = val;
	if (noPrefix)
		(window as any)[capitalize(name.replace(prefix, ""))] = val;
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
