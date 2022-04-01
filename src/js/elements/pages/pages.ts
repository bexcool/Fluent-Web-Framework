import { config } from "../../config";

export const setActivePageIndex = (pageSwitcherId: string, index: number, routing = false, route?: string) => {
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
			console.error("Cannot setActivePageIndex with routing but router being disabled");
		} else { // routing and router are enabled
			import("../../router/index").then(r => {
				const { routerAddHandler, routerNavigate, getHash, _router } = r;
				route = route ?? `${encodeURI(pageSwitcherId)}/${index}`;
				// Register the route if not already registered
				if (!_router.map.has(route))
					routerAddHandler(route, () => {
						setActivePageIndex(pageSwitcherId, index, true, route);
						console.log(route);
					});
				// Navigate if not already done
				if (getHash() !== route)
					routerNavigate(route);

				showCurrentPage(pageSwitcher, index);
			});
		}
	}
};

const showCurrentPage = (pageSwitcher: HTMLElement, index: number) => {
	pageSwitcher.setAttribute("active-page", index.toString());
	const page = pageSwitcher.children[index] as HTMLElement;
	page.style.display = "block";
	page.style.animation = "fluent-page-fade-up 0.3s ease-in-out";
};
