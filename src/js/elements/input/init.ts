import { getIcon } from "../../icons";
import { attributesToString } from "../../util/html";

export default () => {
	// Input text
	const inputsText = document.querySelectorAll<HTMLInputElement>("input[type=\"text\"]");

	inputsText.forEach(inputText => {
		inputText.outerHTML = `<div class="fluent-textbox-container"><input ${attributesToString(inputText)}><button class="fluent-input-button">x</button></div>`;
	});

	const inputsTextNew = document.querySelectorAll<HTMLInputElement>("input[type=\"text\"]");

	inputsTextNew.forEach(inputText => {
		if (inputText.hasAttribute("clear_btn")) {
			const lastChild = inputText.parentElement?.lastElementChild as HTMLElement;
			lastChild.style.opacity = "1";
			lastChild.style.display = "inline";
		}

		inputText.parentElement?.lastElementChild?.addEventListener("click", () => {
			inputText.value = "";
			setTimeout(() => inputText.focus());
		});
	});

	// Input password
	const inputsPassword = document.querySelectorAll<HTMLInputElement>("input[type=\"password\"]");

	inputsPassword.forEach(inputPassword => {
		inputPassword.outerHTML = `<div class="fluent-textbox-container"><input ${attributesToString(inputPassword)}><a class="fluent-input-button" icon style="opacity: 0; display: none;">${getIcon("eye-closed")}</a></div>`;
	});

	const inputsPasswordNew = document.querySelectorAll<HTMLInputElement>("input[type=\"password\"]");

	inputsPasswordNew.forEach(inputPassword => {
		const button = inputPassword.parentElement?.lastElementChild as HTMLElement;

		if (inputPassword.hasAttribute("showpass_btn")) {
			button.style.opacity = "1";
			button.style.display = "inline";
		}

		if (inputPassword.hasAttribute("showpass")) {
			inputPassword.setAttribute("type", "text");
			button.innerHTML = getIcon("eye-open");
		}
		else {
			inputPassword.setAttribute("type", "password");
			button.innerHTML = getIcon("eye-closed");
		}

		button.addEventListener("click", () => {
			if (inputPassword.getAttribute("type") == "password" && !inputPassword.hasAttribute("showpass")) {
				inputPassword.setAttribute("type", "text");
				inputPassword.setAttribute("showpass", "");
				button.innerHTML = getIcon("eye-open");
			}
			else {
				inputPassword.setAttribute("type", "password");
				inputPassword.removeAttribute("showpass");
				button.innerHTML = getIcon("eye-closed");
			}
		});
	});
};
