// This is basically a temporary file until the framework itself implements public types
// so docs can use Fluent functions and Typescript¨
export { };

declare global {
	type InitializeCallback = () => void;
	declare function Fluent_onReady(callback: InitializeCallback): void;
	declare function Fluent_onInitialized(callback: InitializeCallback): void;
	declare function Fluent_showSplashScreen(duration: number, fadeIn: boolean, image: string): void;
	declare const Fluent_CDN_URL: string;
	declare function Fluent_routerNavigate(route: string): void;
	declare function Fluent_capitalize(s: string): string;
	declare const Fluent_themes: { [theme: string]: string };
	declare function Fluent_onThemeChanged(callback: (theme: string) => void, fire: boolean): void;
	declare const Fluent_icons: { [icon: string]: string };
	declare function Fluent_iconExists(icon: string): boolean;

	// Docs specific types
	interface Window {
		navigate: {
			_securenav(route: string): void;
			[route: string]: unknown;
		};
		_PS_ID: string;
		getIconNamePretty: (icon: string) => string;
	}
}
