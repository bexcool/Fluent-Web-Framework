import { config } from "../../config";
import { mRouter } from "../../modules";
import { setActivePageIndex } from "./pages";

export default async () => {
	const pageSwitchers = document.querySelectorAll("fluent-page-switcher");

	pageSwitchers.forEach(async pageSwitcher => {
		const useRouting = pageSwitcher.hasAttribute("use-routing");
		let routerActivePage = -1;
		// Register routes
		if (config.enableRouter && useRouting) {
			const { routerAddHandler, getHash } = await mRouter();

			const routedPages = pageSwitcher.querySelectorAll("fluent-page[routing]");

			routedPages.forEach((page, i) => {
				const pageSwitcherId = pageSwitcher.id;
				const route = page.getAttribute("routing") || `${encodeURI(pageSwitcherId)}/${i}`;

				routerAddHandler(route, () => {
					setActivePageIndex(pageSwitcherId, i, true, route);
				});

				if (getHash() === route)
					routerActivePage = i;
			});
		}

		// Show active page in router
		if (config.enableRouter && useRouting && routerActivePage !== -1) {
			pageSwitcher.setAttribute("active-page", routerActivePage.toString());

			const page = pageSwitcher.children[routerActivePage] as HTMLElement;
			page.style.display = "block";
			page.style.animation = "fluent-page-fade-up 0.3s ease-in-out";
		}
		// Show active page
		else if (pageSwitcher.hasAttribute("active-page")) {
			const activePage = pageSwitcher.getAttribute("active-page") ?? 0;
			(pageSwitcher.children[+activePage] as HTMLElement).style.display = "block";
		}
		// No active page, but has pages
		else if (pageSwitcher.children.length > 0) {
			const activePage = 0;
			pageSwitcher.setAttribute("active-page", activePage.toString());

			const page = pageSwitcher.children[activePage] as HTMLElement;
			page.style.display = "block";
			page.style.animation = "fluent-page-fade-up 0.3s ease-in-out";
		}
	});
};
