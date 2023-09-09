export default () => {
	const contextMenus = document.querySelectorAll<HTMLElement>(".fluent-context-menu-container");

	// Prevent click on context menu
	contextMenus.forEach(contextMenu => {
		contextMenu.addEventListener("click", (e) => {
			e.preventDefault();
		});
	});

	contextMenus.forEach(contextMenu => {
		const menuChild = contextMenu.querySelector<HTMLElement>(".fluent-context-menu ul") as HTMLElement;

		contextMenu.addEventListener("mouseenter", () => {
			const parent = menuChild.parentElement as HTMLElement;
			parent.style.width = menuChild?.scrollWidth + "px";
			parent.style.height = menuChild?.scrollHeight + "px";

			menuChild?.animate(
				[
					// keyframes
					{ transform: "translateY(-100px)", opacity: "1", easing: "ease-out" },
					{ transform: "translateY(0px)", opacity: "1", easing: "ease-in" }
				],
				{
					// timing options
					duration: 200
				});

			setTimeout(() => {
				menuChild?.animate(
					[
						// keyframes
						{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
						{ boxShadow: "0px 5px 13px 5px rgba(0, 0, 0, 0.1)" }
					],
					{
						// timing options
						duration: 150
					});
				menuChild.style.boxShadow = "0px 5px 13px 5px rgba(0, 0, 0, 0.1)";
			}, 200);
		});

		contextMenu.addEventListener("mouseleave", (e) => {
			// TODO: ???
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const menu_child = e.target?.querySelector(".fluent-context-menu ul");

			menu_child.style.boxShadow = "";
		});
	});
};
