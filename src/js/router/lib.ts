// Source: https://github.com/jgallen23/routie
// Modified (a lot)

type Path = string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Params = any;
type Keys = { name: string; optional: boolean; }[];
export type HandlerFn = (args: Params) => void;

const pathToRegexp = (path: Path | RegExp | Path[], keys: Keys, sensitive: boolean, strict: boolean) => {
	if (path instanceof RegExp) return path;
	if (path instanceof Array) path = "(" + path.join("|") + ")";
	if (!path) path = "";
	if (strict) path += "/?";
	path = path
		.replace(/\/\(/g, "(?:/")
		.replace(/\+/g, "__plus__")
		.replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
			keys.push({ name: key, optional: !!optional });
			slash = slash || "";
			return "" + (optional ? "" : slash) + "(?:" + (optional ? slash : "") + (format || "") + (capture || (format && "([^/.]+?)" || "([^/]+?)")) + ")" + (optional || "");
		})
		.replace(/([/.])/g, "\\$1")
		.replace(/__plus__/g, "(.+)")
		.replace(/\*/g, "(.*)");
	return new RegExp("^" + path + "$", sensitive ? "" : "i");
};

export const getHash = () => {
	const hash = window.location.hash;
	if (hash.startsWith("#/"))
		return hash.substring(2);
	else
		return hash.substring(1);
};

class Route {
	constructor(
		public path: Path,
		public name: string
	) {
	}

	keys: Keys = [];
	fns: HandlerFn[] = [];
	params: Params = {};
	regex: RegExp = pathToRegexp(this.path, this.keys, false, false);

	addHandler(fn: HandlerFn) {
		this.fns.push(fn);
	}

	removeHandler(fn: HandlerFn) {
		for (let i = 0, c = this.fns.length; i < c; i++) {
			const f = this.fns[i];
			if (fn == f) {
				this.fns.splice(i, 1);
				return;
			}
		}
	}

	run(params: Params) {
		for (let i = 0, c = this.fns.length; i < c; i++) {
			console.log(this.fns[i](params), params);
		}
	}

	match(path: Path, params: Params) {
		const m = this.regex.exec(path);
		if (!m) return false;

		for (let i = 1, len = m.length; i < len; ++i) {
			const key = this.keys[i - 1];
			const val = ("string" == typeof m[i]) ? decodeURIComponent(m[i]) : m[i];

			if (key) {
				this.params[key.name] = val;
			}
			params.push(val);
		}

		return true;
	}

	toURL(params: Params) {
		let path = this.path;
		for (const param in params) {
			path = path.replace("/:" + param, "/" + params[param]);
		}
		path = path.replace(/\/:.*\?/g, "/").replace(/\?/g, "");
		if (path.indexOf(":") != -1) {
			throw new Error(`missing parameters for url: ${path}`);
		}
		return path;
	}

}

export class Router {

	constructor(
		private w = window
	) {
		this.addListener();
	}

	routes: Route[] = [];
	map = new Map<string, Route>();

	lookup(name: Path, obj: object) {
		for (let i = 0; i < this.routes.length; i++) {
			const route = this.routes[i];
			if (route.name == name) {
				return route.toURL(obj);
			}
		}
	}

	remove(path: string, fn: HandlerFn) {
		const route = this.map.get(path);
		if (!route)
			return;
		route.removeHandler(fn);
	}

	removeAll() {
		this.map.clear();
		this.routes = [];
	}

	navigate(path: Path, options: { silent?: boolean; } = {}) {
		const silent = options.silent ?? false;

		if (silent) {
			this.removeListener();
		}
		setTimeout(() => {
			if (!path.startsWith("/"))
				path = `/${path}`;
			this.w.location.hash = path;
			if (silent) {
				setTimeout(() => {
					this.addListener();
				}, 1);
			}
		}, 1);
	}

	checkRoute(hash: string, route: Route) {
		const params: Params[] = [];
		if (route.match(hash, params)) {
			route.run(params);
			return true;
		}
		return false;
	}

	reload() {
		const hash = getHash();
		for (let i = 0; i < this.routes.length; i++) {
			const route = this.routes[i];
			if (this.checkRoute(hash, route)) {
				return;
			}
		}
	}

	addHandler(path: Path, fn: HandlerFn) {
		const s = path.split(" ");
		const name = (s.length == 2) ? s[0] : encodeURI(path);
		path = (s.length == 2) ? s[1] : s[0];

		if (!this.map.has(path)) {
			this.map.set(path, new Route(path, name));
			// We just set it, so it will be there
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.routes.push(this.map.get(path)!);
		}
		this.map.get(path)?.addHandler(fn);
	}

	addListener() {
		window.addEventListener("hashchange", this.reload, false);
	}

	removeListener() {
		window.removeEventListener("hashchange", this.reload);
	}
}
