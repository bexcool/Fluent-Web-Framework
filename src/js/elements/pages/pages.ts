
export const setActivePageIndex = (pageSwitcherId: string, index: number) => {
	const pageSwitcher = document.getElementById(pageSwitcherId);

	if (!pageSwitcher) return;
	if (pageSwitcher.hasAttribute("active-page")) {
		// Hide previous page
		const previousPage = pageSwitcher.getAttribute("active-page");
		if (previousPage)
			(pageSwitcher.children[+previousPage] as HTMLElement).style.display = "none";

		// Show current page
		pageSwitcher.setAttribute("active-page", index.toString());
		const activePage = pageSwitcher.children[index] as HTMLElement;
		activePage.style.display = "block";
		activePage.style.animation = "fluent-page-fade-up 0.3s ease-in-out";
	}
};
