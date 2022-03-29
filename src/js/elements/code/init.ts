/* eslint-disable */
// @ts-nocheck

export default () => {
	const doc = document.documentElement;

	// Code
	for (const code of document.querySelectorAll("code")) {
		code.outerHTML = "<div class=\"fluent-code-container\">" +
			"<div style=\"display: inline-block; margin: 0.225em 0;\"><code " +
			AttributesToString(code) +
			" style=\"" + code.style.cssText + "\">" +
			code.innerHTML +
			"</code></div>" +
			"<button class=\"fluent-code-copy-button\" >" +
			"<svg class=\"fluent-svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\">" +
			"<path class=\"fluent-svg-path\" d=\"M8 2C6.89543 2 6 2.89543 6 4V14C6 15.1046 6.89543 16 8 16H14C15.1046 16 16 15.1046 16 14V4C16 2.89543 15.1046 2 14 2H8ZM7 4C7 3.44772 7.44772 3 8 3H14C14.5523 3 15 3.44772 15 4V14C15 14.5523 14.5523 15 14 15H8C7.44772 15 7 14.5523 7 14V4ZM4 6.00001C4 5.25973 4.4022 4.61339 5 4.26758V14.5C5 15.8807 6.11929 17 7.5 17H13.7324C13.3866 17.5978 12.7403 18 12 18H7.5C5.567 18 4 16.433 4 14.5V6.00001Z\" fill=\"#212121\"/>" +
			"</svg>" +
			"</button>" +
			"</div>";
	}

	for (const code of document.querySelectorAll("code")) {
		code.parentElement.parentElement.children[1].addEventListener("click", () => {
			CopyToClipboard(DecodeHtml(code.innerHTML).replace(/<\/?span[^>]*>/g, "").replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, " "));


			ShowFlyout(code.parentElement.parentElement.children[1], "Code copied!", 1000);
		});

		if (code.hasAttribute("sh")) CodeSyntaxHigh(code, code.getAttribute("sh").toLowerCase());
	}

	// Button attributes
	const buttons = document.querySelectorAll("button");

	for (const button of buttons) {
		// Set styles
		if (button.hasAttribute("accent")) {
			button.outerHTML = "<button style=\"" + button.style.cssText + "\" class=\"fluent-button-accent\" accent>" +
				button.innerHTML +
				"</button>";
		}
		else if (button.hasAttribute("hyperlink")) {
			button.outerHTML = "<button style=\"" + button.style.cssText + "\" class=\"fluent-hyperlink-button-accent\" hyperlink>" +
				button.innerHTML +
				"</button>";
		}

		// Get URL attribute
		if (button.hasAttribute("url")) {
			button.addEventListener("click", () => {
				window.open(button.getAttribute("url"), "_self");
			});
		}
		else if (button.hasAttribute("urlnew")) {
			button.addEventListener("click", () => {
				window.open(button.getAttribute("urlnew"));
			});
		}
	}

	// Input text
	const inputs_text = document.querySelectorAll("input[type=\"text\"]");

	for (const input_text of inputs_text) {
		input_text.outerHTML = "<div class=\"fluent-textbox-container\">" +
			"<input " + AttributesToString(input_text) + " >" +
			"<button class=\"fluent-clear-text-input-button\">x</button>" +
			"</div>";
	}

	const inputs_text_new = document.querySelectorAll("input[type=\"text\"]");

	for (const input_text of inputs_text_new) {
		if (input_text.hasAttribute("clear_btn")) {
			input_text.parentElement.lastElementChild.style.opacity = "1";
			input_text.parentElement.lastElementChild.style.display = "inline";
		}

		input_text.parentElement.lastElementChild.addEventListener("click", () => {
			input_text.value = "";
			setTimeout(() => input_text.focus());
		});
	}

	// Input password
	const inputs_password = document.querySelectorAll("input[type=\"password\"]");

	for (const input_password of inputs_password) {
		input_password.outerHTML = "<div class=\"fluent-textbox-container\">" +
			"<input " + AttributesToString(input_password) + " >" +
			"<a class=\"fluent-show-password-input\" style=\"opacity: 0; display: none;\"><svg style=\"margin-top: 0.425em;\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"xmlns=\"http://www.w3.org/2000/svg\"><path class=\"fluent-svg-path\" d=\"M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z\" fill=\"#212121\"/></svg></a>" +
			"</div>";
	}

	const inputs_password_new = document.querySelectorAll("input[type=\"password\"]");

	for (const input_password of inputs_password_new) {
		const button = input_password.parentElement.lastElementChild;

		if (input_password.hasAttribute("showpass_btn")) {
			button.style.opacity = "1";
			button.style.display = "inline";
		}

		if (input_password.hasAttribute("showpass")) {
			input_password.setAttribute("type", "text");
			button.innerHTML = "<svg style=\"margin-top: 0.425em;\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path class=\"fluent-svg-path\" d=\"M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM9.98953 8C11.9225 8 13.4895 9.567 13.4895 11.5C13.4895 13.433 11.9225 15 9.98953 15C8.05653 15 6.48953 13.433 6.48953 11.5C6.48953 9.567 8.05653 8 9.98953 8Z\" fill=\"#212121\"/></svg>";
		}
		else {
			input_password.setAttribute("type", "password");
			button.innerHTML = "<svg style=\"margin-top: 0.425em;\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"xmlns=\"http://www.w3.org/2000/svg\"><path class=\"fluent-svg-path\" d=\"M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z\" fill=\"#212121\"/></svg>";
		}

		button.addEventListener("click", () => {
			if (input_password.getAttribute("type") == "password" && !input_password.hasAttribute("showpass")) {
				input_password.setAttribute("type", "text");
				input_password.setAttribute("showpass", "");
				button.innerHTML = "<svg style=\"margin-top: 0.425em;\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path class=\"fluent-svg-path\" d=\"M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM9.98953 8C11.9225 8 13.4895 9.567 13.4895 11.5C13.4895 13.433 11.9225 15 9.98953 15C8.05653 15 6.48953 13.433 6.48953 11.5C6.48953 9.567 8.05653 8 9.98953 8Z\" fill=\"#212121\"/></svg>";
			}
			else {
				input_password.setAttribute("type", "password");
				input_password.removeAttribute("showpass", "");
				button.innerHTML = "<svg style=\"margin-top: 0.425em;\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"xmlns=\"http://www.w3.org/2000/svg\"><path class=\"fluent-svg-path\" d=\"M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z\" fill=\"#212121\"/></svg>";
			}
		});
	}

	// Set menu item's icon
	const menu_items = document.querySelectorAll(".fluent-menu-item, .fluent-menu-item-select, .fluent-menu-item-expander-header");

	for (const menu_item of menu_items) {
		if (menu_item.hasAttribute("icon")) {
			var icon = document.createElement("img");
			icon.classList.add("fluent-menu-item-icon");
			icon.setAttribute("src", menu_item.getAttribute("icon"));
			menu_item.prepend(icon);
		} else {
			//menu_item.style.paddingLeft = "20px";
		}
	}

	// Prevent click on context menu
	const context_menus = document.querySelectorAll(".fluent-context-menu-container");

	for (const context_menu of context_menus) {
		context_menu.addEventListener("click", (e) => {
			e.preventDefault();
		});
	}

	// Initialize context menus
	for (const context_menu of context_menus) {
		const menu_child = context_menu.querySelector(".fluent-context-menu ul");

		context_menu.addEventListener("mouseenter", function (e) {
			menu_child.parentElement.style.width = menu_child.scrollWidth + "px";
			menu_child.parentElement.style.height = menu_child.scrollHeight + "px";

			menu_child.animate(
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
				menu_child.animate(
					[
						// keyframes
						{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
						{ boxShadow: "0px 5px 13px 5px rgba(0, 0, 0, 0.1)" }
					],
					{
						// timing options
						duration: 150
					});
				menu_child.style.boxShadow = "0px 5px 13px 5px rgba(0, 0, 0, 0.1)";
			}, 200);
		});

		context_menu.addEventListener("mouseleave", function (e) {
			const menu_child = e.target.querySelector(".fluent-context-menu ul");

			menu_child.style.boxShadow = "";
		});
	}

	// Initialize Mica effect
	const mica = document.createElement("div");
	mica.classList.add("fluent-mica-effect");
	document.body.appendChild(mica);

	// Initialize labels
	const labels = document.querySelectorAll(".fluent-label");

	for (const label of labels) {
		if (label.hasAttribute("consolas")) {
			label.style.fontFamily = "Consolas, monaco, monospace";
		}

		if (label.hasAttribute("color")) {
			let color = label.getAttribute("color").includes("#") ? label.getAttribute("color") : colorNameToHex(label.getAttribute("color"));
			label.style.backgroundColor = addAlpha(pSBC(0.05, color), 0.2);
			label.style.borderColor = pSBC(-0.9, addAlpha(color, 0.9));
			label.style.color = label.style.backgroundColor.includes("#") ? getVisibleTextColor(hexToRgbA(label.style.backgroundColor)) : getVisibleTextColor(label.style.backgroundColor);
		}
	}
}