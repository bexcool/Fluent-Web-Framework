import { config } from "../../config";
import { mRouter } from "../../modules";

export const setActivePageIndex = async (pageSwitcherId: string, index: number, routing = false, route?: string) => {
	const pageSwitcher = document.getElementById(pageSwitcherId);

	if (!pageSwitcher) return;
	if (pageSwitcher.hasAttribute("active-page")) {
		// Hide previous page
		const previousPage = pageSwitcher.getAttribute("active-page");
		if (previousPage)
			(pageSwitcher.children[+previousPage] as HTMLElement).style.display = "none";

		if (!routing) {
			showCurrentPage(pageSwitcher, index);
		} else if (!config.enableRouter) {
			throw new Error("Cannot use setActivePageIndex with 'routing' but router being disabled");
		} else { // routing and router are enabled
			const { routerAddHandler, routerNavigate, getHash, _router } = await mRouter();

			route = route ?? `${encodeURI(pageSwitcherId)}/${index}`;
			// Register the route so we can go back, if not already registered
			if (!_router.map.has(route))
				routerAddHandler(route, () => {
					setActivePageIndex(pageSwitcherId, index, true, route);
				});
			// Navigate if not already done
			if (getHash() !== route)
				routerNavigate(route);

			showCurrentPage(pageSwitcher, index);
		}
	}
};

const showCurrentPage = (pageSwitcher: HTMLElement, index: number) => {
	pageSwitcher.setAttribute("active-page", index.toString());
	const page = pageSwitcher.children[index] as HTMLElement;
	page.style.display = "block";
	page.style.animation = "fluent-page-fade-up 0.3s ease-in-out";
};
