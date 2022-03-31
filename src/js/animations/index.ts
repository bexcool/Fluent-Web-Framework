export default () => {
	setTimeout(() => {
		const contextMenus = document.querySelectorAll(".fluent-context-menu-container");
		console.log(contextMenus.length);
		contextMenus.forEach(contextMenu => {
			const menuChild = contextMenu.querySelector(".fluent-context-menu ul") as HTMLElement;
			contextMenu.addEventListener("mouseenter", () => {
				const parent = menuChild?.parentElement as HTMLElement;
				parent.style.width = menuChild.scrollWidth + "px";
				parent.style.height = menuChild.scrollHeight + "px";
				menuChild.animate(
					[
						{ transform: "translateY(-100px)", opacity: "1", easing: "ease-out" },
						{ transform: "translateY(0px)", opacity: "1", easing: "ease-in" },
					],
					{ duration: 200 }
				);
				setTimeout(() => {
					menuChild.animate(
						[
							{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
							{ boxShadow: "0px 5px 13px 5px rgba(0, 0, 0, 0.1)" },
						],
						{ duration: 150 }
					);
					menuChild.style.boxShadow = "0px 5px 13px 5px rgba(0, 0, 0, 0.1)";
				}, 200);
			});
			contextMenu.addEventListener("mouseleave", e => {
				// TODO: ???
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const menu_child = e.target?.querySelector(".fluent-context-menu ul");
				menu_child.style.boxShadow = "";
			});
		});
	}, 50);
};
