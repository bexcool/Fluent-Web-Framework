import initButtons from "../elements/button/init";
import { default as initCode, default as initElements } from "../elements/code/init";
import initContextMenus from "../elements/context-menu/init";
import initExpanders from "../elements/expander/init";
import initInputs from "../elements/input/init";
import initLabels from "../elements/label/init";
import initMenus from "../elements/menu/init";
import initPages from "../elements/pages/init";
import { setInitialized, splash } from "../fluent";
import initTheme from "../theme/init";

export default () => {
	splash.background = document.createElement("div");
	splash.background.id = "fluent-splash-screen";
	splash.background.classList.add("fluent-loading-background");
	document.body.prepend(splash.background);

	splash.image = document.createElement("img");
	splash.image.classList.add("fluent-loading-icon");
	splash.background.prepend(splash.image);
	splash.background.style.display = "none";

	setTimeout(() => {
		initTheme();
		initExpanders();
		initElements();
		initMenus();
		initPages();
		initCode();
		initInputs();
		initLabels();
		initButtons();
		initContextMenus();

		//#region Remove focus from elements when clicked
		const buttons = document.querySelectorAll<HTMLButtonElement>("button, a.fluent-menu-item");
		const links = document.querySelectorAll("a");
		const expanders = document.querySelectorAll(".fluent-expander-header");
		const menuItemExpanders = document.querySelectorAll(".fluent-menu-item-expander-header");
		const menuItemsSelect = document.querySelectorAll(".fluent-menu-item-select");

		buttons.forEach(btn => {
			btn.addEventListener("click", () => {
				buttons.forEach(b => b.blur());
			});
		});

		links.forEach(link => {
			link.addEventListener("click", () => {
				links.forEach(l => l.blur());
			});
		});

		document.addEventListener("click", () => {
			expanders.forEach(e => {
				if (e.classList.contains("press")) {
					e.classList.remove("press");
				}
			});

			menuItemExpanders.forEach(e => {
				if (e.classList.contains("press")) {
					e.classList.remove("press");
				}
			});

			menuItemsSelect.forEach(e => {
				if (e.classList.contains("press")) {
					e.classList.remove("press");
				}
			});
		});
		//#endregion

		//#region Init sliders
		const sliders = document.querySelectorAll<HTMLInputElement>("input[type=\"range\"]");
		sliders.forEach(slider => {
			slider.style.setProperty("--value", slider.value);
			slider.style.setProperty("--min", slider.min == "" ? "0" : slider.min);
			slider.style.setProperty("--max", slider.max == "" ? "100" : slider.max);
			slider.addEventListener("input", () => {
				slider.style.setProperty("--value", slider.value);
			});
		});

		//#endregion

		// ********************
		// Show custom context menu
		// ********************
		if (document.getElementById("fluent-context-menu-standalone") != null) {
			const contextMenuStandalone = document.getElementById("fluent-context-menu-standalone") as HTMLElement;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const bodyElem = document.querySelector("body")!;

			bodyElem.addEventListener("contextmenu", (e) => {
				e.preventDefault();

				const {
					left: scopeOffsetX,
					top: scopeOffsetY,
				} = bodyElem.getBoundingClientRect();

				const scopeX = e.pageX - scopeOffsetX;
				const scopeY = e.pageY - scopeOffsetY;

				// ? check if the element will go out of bounds
				const outOfBoundsOnX = scopeX + contextMenuStandalone.clientWidth > bodyElem.clientWidth;
				const outOfBoundsOnY = scopeY + contextMenuStandalone.clientHeight > bodyElem.clientHeight;

				let normalizedX = e.pageX;
				let normalizedY = e.pageY;

				// ? normalzie on X
				if (outOfBoundsOnX) {
					normalizedX = scopeOffsetX + bodyElem.clientWidth - contextMenuStandalone.clientWidth;
				}

				// ? normalize on Y
				if (outOfBoundsOnY) {
					normalizedY = scopeOffsetY + bodyElem.clientHeight - contextMenuStandalone.clientHeight;
				}

				contextMenuStandalone.style.top = normalizedY + "px";
				contextMenuStandalone.style.left = normalizedX + "px";

				contextMenuStandalone.classList.add("visible");

				contextMenuStandalone.animate(
					[
						// keyframes
						{ transform: "translateY(-20px)", opacity: "0" },
						{ transform: "translateY(0px)", opacity: "1" }
					],
					{
						// timing options
						duration: 90
					});
			});

			// Close custom context menu
			document.addEventListener("click", (e) => {
				// TODO: ???
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (e.target.offsetParent != contextMenuStandalone) {
					contextMenuStandalone.classList.remove("visible");
				}
			});
		}

		//#region Custom menu for input text
		// ********************
		// Custom menu for input text
		// ********************
		if (document.getElementById("fluent-context-menu-standalone-text") != null) {
			const contextMenuStandaloneText = document.getElementById("fluent-context-menu-standalone-text") as HTMLElement;
			const inputText = document.querySelectorAll<HTMLInputElement>("input[type=\"text\"]");
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const bodyElem = document.querySelector("body")!;

			inputText.forEach(contextMenu => {
				contextMenu.addEventListener("contextmenu", (e) => {
					e.preventDefault();

					const {
						left: scopeOffsetX,
						top: scopeOffsetY,
					} = bodyElem.getBoundingClientRect();

					const scopeX = e.pageX - scopeOffsetX;
					const scopeY = e.pageY - scopeOffsetY;

					// ? check if the element will go out of bounds
					const outOfBoundsOnX = scopeX + contextMenuStandaloneText.clientWidth > bodyElem.clientWidth;

					const outOfBoundsOnY = scopeY + contextMenuStandaloneText.clientHeight > bodyElem.clientHeight;

					let normalizedX = e.pageX;
					let normalizedY = e.pageY;

					// ? normalzie on X
					if (outOfBoundsOnX) {
						normalizedX = scopeOffsetX + bodyElem.clientWidth - contextMenuStandaloneText.clientWidth;
					}

					// ? normalize on Y
					if (outOfBoundsOnY) {
						normalizedY = scopeOffsetY + bodyElem.clientHeight - contextMenuStandaloneText.clientHeight;
					}

					contextMenuStandaloneText.style.top = normalizedY + "px";
					contextMenuStandaloneText.style.left = normalizedX + "px";

					contextMenuStandaloneText.classList.add("visible");

					contextMenuStandaloneText.animate(
						[
							// keyframes
							{ transform: "translateY(-20px)", opacity: "0" },
							{ transform: "translateY(0px)", opacity: "1" }
						],
						{
							// timing options
							duration: 90
						});
				});
			});

			// Close custom context menu
			document.addEventListener("click", (e) => {
				// TODO: ???
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (e.target.offsetParent != contextMenuStandaloneText) {
					contextMenuStandaloneText?.classList.remove("visible");
				}
			});
		}
		//#endregion

		setInitialized();
	}, 100);
};
