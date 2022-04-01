export function showFlyout(element: HTMLElement, string: string, delay: number) {
	const flyout = document.createElement("div");
	const viewportOffset = element.getBoundingClientRect();
	let closedFlyout = false;

	document.body.appendChild(flyout);
	flyout.classList.add("fluent-flyout");

	const text = document.createElement("p");
	text.style.margin = "0";
	text.innerHTML = string;

	flyout.appendChild(text);
	flyout.style.top = element.offsetTop - flyout.offsetHeight - 10 + "px";
	flyout.style.left = (element.offsetWidth / 2 - flyout.offsetWidth / 2) + viewportOffset.x + "px";

	flyout.animate(
		[
			// keyframes
			{ top: `${flyout.offsetTop + 5}px`, opacity: "0" },
			{ top: `${flyout.offsetTop}px`, opacity: "1" }
		],
		{
			// timing options
			duration: 80
		});

	// Close flyout
	setTimeout(() => {
		document.addEventListener("click", (e) => {
			// TODO: ???
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (e.target?.offsetParent !== flyout) {
				closedFlyout = true;

				flyout.animate(
					[
						// keyframes
						{ opacity: "1" },
						{ opacity: "0" }
					],
					{
						// timing options
						duration: 50
					});
				flyout.style.opacity = "0";

				setTimeout(() => {
					flyout.remove();
				}, 50);
			}
		});
	}, 80);

	setTimeout(() => {
		if (!closedFlyout) {
			closedFlyout = true;

			flyout.animate(
				[
					// keyframes
					{ opacity: "1" },
					{ opacity: "0" }
				],
				{
					// timing options
					duration: 50
				});
			flyout.style.opacity = "0";

			setTimeout(() => {
				flyout.remove();
			}, 50);
		}
	}, delay);
}
