import { CDN_URL, docElement } from "../../fluent";

export default () => {
	InitMenuExpanders();
	InitSelectableMenuItems();
	InitMenuIcons();
};

function InitMenuIcons() {
	// Set menu item's icon
	const menuItems = document.querySelectorAll(".fluent-menu-item, .fluent-menu-item-select, .fluent-menu-item-expander-header");

	menuItems.forEach(menuItem => {
		if (menuItem.hasAttribute("icon")) {
			const icon = document.createElement("img");
			icon.classList.add("fluent-menu-item-icon");
			icon.setAttribute("src", menuItem.getAttribute("icon") ?? `${CDN_URL}/bexcool.png`);
			menuItem.prepend(icon);
		} else {
			//menu_item.style.paddingLeft = "20px";
		}
	});
}

function InitSelectableMenuItems() {
	// Set selectable buttons active when clicked
	const menus = document.querySelectorAll(".fluent-menu-list");

	menus.forEach(menu => {
		const menuItems = menu.querySelectorAll(".fluent-menu-item-select");
		menuItems.forEach(menuItemSelect => {
			menuItemSelect.addEventListener("mousedown", (e) => {
				e.preventDefault();

				menuItemSelect.classList.add("press");
			});

			menuItemSelect.addEventListener("click", function (e) {
				if (!menuItemSelect.hasAttribute("selected")) {
					e.preventDefault();
					let i = 0, newItemIndex = 0, oldItemIndex = 0, oldExists = false;

					// Get new selected menu item
					menuItems.forEach(menuItem => {
						if (menuItem === menuItemSelect)
							newItemIndex = i;
						i++;
					});

					i = 0;

					menuItems.forEach(menuItemSelectOld => {
						if (menuItemSelectOld.hasAttribute("selected")) {
							oldExists = true;

							menuItemSelectOld.classList.remove("selected");
							menuItemSelectOld.removeAttribute("selected");

							oldItemIndex = i;

							const firstChild = menuItemSelectOld.firstElementChild as HTMLElement;
							// Animate accent colored div movement
							if (newItemIndex > oldItemIndex)
								firstChild.style.animation = "fluent-menu-item-select-down 0.3s ease-in";
							else
								firstChild.style.animation = "fluent-menu-item-select-up 0.3s ease-in";

							setTimeout(() => {
								firstChild.remove();
							}, 280);

						}

						i++;
					});

					i = 0;

					menuItemSelect.classList.add("selected");
					menuItemSelect.setAttribute("selected", "");

					if (oldExists) {
						const activeElement = document.createElement("div");

						activeElement.classList.add("fluent-menu-item-select-selected");
						//if (!menu_item_select.hasAttribute("icon")) active_element.style.marginLeft = "-20px";
						menuItemSelect.prepend(activeElement);
						activeElement.style.overflow = "hidden";

						setTimeout(() => {
							activeElement.style.opacity = "1";

							// Animate accent colored div movement
							if (newItemIndex > oldItemIndex)
								activeElement.style.animation = "fluent-menu-item-select-up-reverse 0.3s ease-out";
							else
								activeElement.style.animation = "fluent-menu-item-select-down-reverse 0.3s ease-out";
						}, 280);
					} else {
						const active_element = document.createElement("div");

						active_element.classList.add("fluent-menu-item-select-selected");
						//if (!menu_item_select.hasAttribute("icon")) active_element.style.marginLeft = "-20px";
						menuItemSelect.prepend(active_element);

						active_element.animate(
							[
								// keyframes
								{ transform: "scaleY(0)", opacity: "0" },
								{ transform: "scaleY(1)", opacity: "1" }
							],
							{
								// timing options
								duration: 90
							});
						active_element.style.opacity = "1";

					}
				}
			});

			if (menuItemSelect.hasAttribute("selected")) {
				menuItemSelect.classList.add("selected");

				const active_element = document.createElement("div");
				//if (!menu_item_select.hasAttribute("icon")) active_element.style.marginLeft = "-20px";
				active_element.classList.add("fluent-menu-item-select-selected");
				menuItemSelect.prepend(active_element);

				active_element.animate(
					[
						// keyframes
						{ transform: "scaleY(0)", opacity: "0" },
						{ transform: "scaleY(1)", opacity: "1" }
					],
					{
						// timing options
						duration: 90
					});

				active_element.style.opacity = "1";
			}
		});
	});
}

function InitMenuExpanders() {

	// Initialize expander header
	const expanders = document.querySelectorAll<HTMLElement>(".fluent-menu-item-expander-header");

	expanders.forEach(expander => {
		const expanderBody = expander.parentElement?.lastElementChild?.lastElementChild as HTMLElement;
		const expanderArrow = expander.lastElementChild?.firstElementChild as HTMLElement;

		expander.addEventListener("mousedown", (e) => {
			e.preventDefault();

			expander.classList.add("press");
		});

		// Bind expander open/close
		expander.addEventListener("click", (e) => {
			e.preventDefault();
			const lastChild = expander.parentElement?.lastElementChild as HTMLElement;
			lastChild.style.overflow = "hidden";
			expander.style.overflow = "hidden";
			lastChild.style.position = "relative";

			if (expanderBody.classList.contains("expanded")) {
				docElement.style.setProperty("--expander-expand-height", (expanderBody.scrollHeight) + "px");
				expanderBody.style.animation = "fluent-expander-expand-reverse 0.3s ease-out";

				setTimeout(function () {
					expanderBody.classList.remove("expanded");
				}, 290);

				// Rotate arrow
				setTimeout(() => expanderArrow.style.transform = "rotate(0deg)", 200);
			} else {
				expanderBody.classList.add("expanded");

				docElement.style.setProperty("--expander-expand-height", (expanderBody.scrollHeight ?? 0) + "px");
				expanderBody.style.animation = "fluent-expander-expand 0.15s ease-in";

				// Rotate arrow
				setTimeout(() => expanderArrow.style.transform = "rotate(180deg)", 150);
			}

			setTimeout(() => {
				lastChild.style.position = "static";
				lastChild.style.overflow = "visible";
				expander.style.overflow = "visible";
			}, 300);
		});
	});
}
