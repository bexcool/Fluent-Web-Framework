import { config } from "../../config";

export const setActivePageIndex = (pageSwitcherId: string, index: number, routing = false, route?: string) => {
	const pageSwitcher = document.getElementById(pageSwitcherId);

	if (!pageSwitcher) return;
	if (pageSwitcher.hasAttribute("active-page")) {
		// Hide previous page
		const previousPage = pageSwitcher.getAttribute("active-page");
		if (previousPage)
			(pageSwitcher.children[+previousPage] as HTMLElement).style.display = "none";

		if (routing && !config.enableRouter)
			console.error("Cannot setActivePageIndex with routing but router being disabled");
		else if (routing && config.enableRouter) {
			import("../../router/index").then(r => {
				const { routerAddHandler, routerNavigate, _router } = r;
				route = route ?? `${encodeURI(pageSwitcherId)}/${index}`;
				routerNavigate(route);
				if (!_router.map.has(route))
					routerAddHandler(route, () => {
						setActivePageIndex(pageSwitcherId, index, true, route);
					});
			});
		}
		// Show current page
		pageSwitcher.setAttribute("active-page", index.toString());
		const page = pageSwitcher.children[index] as HTMLElement;
		page.style.display = "block";
		page.style.animation = "fluent-page-fade-up 0.3s ease-in-out";
	}
};
