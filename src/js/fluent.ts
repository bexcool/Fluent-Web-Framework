import { config } from "./config";
import { capitalize } from "./util/index";
/* eslint-disable @typescript-eslint/no-explicit-any */

type InitCallback = () => void;
const initializeCallbacks: InitCallback[] = [];
let _Initialized = false;
export const isInitialized = () => _Initialized;
export const onInitialized = (cb: InitCallback) => {
	// Call it right away
	if (isInitialized())
		cb();
	// Wait
	else
		initializeCallbacks.push(cb);
};
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
	background: undefined,
	image: undefined,
} as any;

export const KEY_THEME = "Fluent.Theme";
export const KEY_MICA = "Fluent.Mica";
// Allows http:
export const CDN_URL = "//cdn.spej.eu/fwf";
const prefix = "Fluent_";


const makeGlobal = (val: any, name: string) => {
	(window as any)[name] = val;
	if (config.noPrefix)
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
