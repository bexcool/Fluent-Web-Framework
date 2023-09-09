import { splash } from "../../fluent";

export const showSplashScreen = (duration: number, fadeIn: boolean, image: string) => {
	document.body.style.overflow = "hidden";
	splash.image.src = image;
	splash.background.style.display = "flex";

	if (fadeIn) {
		setTimeout(() => {
			splash.background.style.opacity = "1";
		}, 10);
	}

	setTimeout(() => {
		splash.background.style.opacity = "0";
		setTimeout(() => {
			splash.background.style.display = "none";
			document.body.style.overflow = "auto";
		}, 200);
	}, duration);
};
