import { config } from "../../config";

export default () => {
	const pageSwitchers = document.querySelectorAll("fluent-page-switcher");
	pageSwitchers.forEach(pageSwitcher => {
		// Show active page
		if (pageSwitcher.hasAttribute("active-page")) {
			const activePage = pageSwitcher.getAttribute("active-page") ?? 0;
			(pageSwitcher.children[+activePage] as HTMLElement).style.display = "block";
		}
		// No active page, but has pages
		else if (pageSwitcher.children.length > 0) {
			let activePage = 0;
			if (config.enableRouter) {
				activePage = 1;
			}
			pageSwitcher.setAttribute("active-page", activePage.toString());

			const page = pageSwitcher.children[activePage] as HTMLElement;
			page.style.display = "block";
			page.style.animation = "fluent-page-fade-up 0.3s ease-in-out";
		}
	});
};
