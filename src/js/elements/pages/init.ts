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
			pageSwitcher.setAttribute("active-page", "0");

			const activePage = pageSwitcher.children[0] as HTMLElement;
			activePage.style.display = "block";
			activePage.style.animation = "fluent-page-fade-up 0.3s ease-in-out";
		}
	});
};
