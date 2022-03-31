import { HandlerFn, Router } from "./lib";

export let _router: Router;

export default () => {
	_router = new Router();
};

export const routerNavigate = (path: string) => {
	_router.navigate(path);
	return true;
};

export const routerAddHandler = (path: string, fn: HandlerFn) => {
	_router.addHandler(path, fn);
	_router.reload();
	return true;
};

export const routerAddHandlers = (routes: { [path: string]: HandlerFn }) => {
	for (const path in routes)
		_router.addHandler(path, routes[path]);
	_router.reload();
	return true;
};
