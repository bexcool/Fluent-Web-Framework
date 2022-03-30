import { docElement } from "../../fluent";

export default () => {
	// Initialize expander header
	const expanders = document.querySelectorAll<HTMLElement>(".fluent-expander-header");

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

				setTimeout(() => {
					expanderArrow.style.transform = "rotate(0deg)";
				}, 200);

				setTimeout(function () {
					expanderBody.classList.remove("expanded");

					expander.style.cssText = "border-radius: 4px 4px 4px 4px;";
				}, 280);
			}
			else {
				expanderBody.classList.add("expanded");

				docElement.style.setProperty("--expander-expand-height", (expanderBody.scrollHeight) + "px");
				expanderBody.style.animation = "fluent-expander-expand 0.15s ease-in";

				expander.style.cssText = "border-radius: 4px 4px 0px 0px;";

				setTimeout(() => expanderArrow.style.transform = "rotate(180deg)", 150);
			}

			setTimeout(() => {
				const lastChild = expander.parentElement?.lastElementChild as HTMLElement;
				lastChild.style.overflow = "visible";
				expander.style.overflow = "visible";
				lastChild.style.position = "static";
			}, 300);
		});
	});
};
