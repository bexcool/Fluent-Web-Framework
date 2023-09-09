interface Config {
	// To keep compatibility with the vanilla js Fluent Framework,
	// Makes window more polluted
	noPrefix: boolean;
	enableCode: boolean;
	enableRouter: boolean;
	enableIcons: boolean;
}

const defaultConfig = Object.freeze(<Config>{
	noPrefix: false,
	enableCode: false,
	enableRouter: false,
	enableIcons: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const config: Config = { ...defaultConfig, ...(window as any)?.FLUENT };
