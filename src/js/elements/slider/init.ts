export default () => {
	const sliders = document.querySelectorAll<HTMLInputElement>("input[type=\"range\"]");
	sliders.forEach(slider => {
		slider.style.setProperty("--value", slider.value);
		slider.style.setProperty("--min", slider.min == "" ? "0" : slider.min);
		slider.style.setProperty("--max", slider.max == "" ? "100" : slider.max);
		slider.addEventListener("input", () => {
			slider.style.setProperty("--value", slider.value);
		});
	});
};
