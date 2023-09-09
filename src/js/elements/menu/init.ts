import { config } from "../../config";
import { docElement } from "../../fluent";
import { mIcons, mRouter } from "../../modules";

export default async () => {
	await InitMenuExpanders();
	await InitSelectableMenuItems();
	InitMenuIcons();
};

async function InitMenuIcons() {
	// Set menu item's icon
	const menuItems = document.querySelectorAll(".fluent-menu-item, .fluent-menu-item-select, .fluent-menu-item-expander-header");

	menuItems.forEach(async menuItem => {
		if (menuItem.hasAttribute("icon")) {
			const iconVal = menuItem.getAttribute("icon");
			if (!iconVal) return;
			// Icon names don't have dots
			if (config.enableIcons && !iconVal.includes(".")) {
				// Fluent icon
				const { getIcon } = await mIcons();
				const val = await getIcon(iconVal);
				if (val) {
					const icon = new DOMParser().parseFromString(val, "image/svg+xml").documentElement;
					icon.classList.add("fluent-menu-item-icon");
					menuItem.prepend(icon);
					return;
				}
				// Unknown icon, process it as image
			}

			// Image icon
			const icon = document.createElement("img");
			icon.classList.add("fluent-menu-item-icon");
			icon.setAttribute("src", iconVal);
			menuItem.prepend(icon);
		} else {
			//menu_item.style.paddingLeft = "20px";
		}
	});
}

async function InitSelectableMenuItems() {
	// TODO: Tidy up this code
	// Set selectable buttons active when clicked
	const menus = document.querySelectorAll(".fluent-menu-list");

	menus.forEach(async menu => {
		const menuItems = menu.querySelectorAll(".fluent-menu-item-select");

		const useRouting = menu.hasAttribute("experimental-use-routing");

		if (config.enableRouter && useRouting) {
			const { getHash } = await mRouter();

			menuItems.forEach(menuItemSelect => {
				const click = menuItemSelect.getAttribute("onclick");
				if (click) {
					// TODO: Won't really work being this simple
					const args = /([\w.]+),([\d.]+),(true|false),([\w.]+)/.exec(click);
					const id = args?.[0] ?? "", index = args?.[1] ?? 0, routing = args?.[2] ?? false, _route = args?.[3];
					if (!routing)
						return;
					const route = _route || `${encodeURI(id)}/${index}`;

					// TODO: This will break if it has a selected attr set in html
					if (getHash() === route) {
						menuItemSelect.setAttribute("selected", "");

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

					// Not needed
					// routerAddHandler(route, () => {
					// menuItemSelect.setAttribute("selected", "");
					// });
				}
			});
		}

		menuItems.forEach(menuItemSelect => {
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

			menuItemSelect.addEventListener("mousedown", (e) => {
				e.preventDefault();

				menuItemSelect.classList.add("press");
			});

			menuItemSelect.addEventListener("click", (e) => {
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
