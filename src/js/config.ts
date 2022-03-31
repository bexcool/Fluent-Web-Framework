interface Config {
	// To keep compatibility with the vanilla js Fluent Framework,
	// Makes window more polluted
	noPrefix: boolean;
	// TODO: Use an external syntax highlight library that would get loaded if this is true
	enableCode: boolean;
	enableRouter: boolean;
}

const defaultConfig = Object.freeze(<Config>{
	noPrefix: false,
	enableCode: false,
	enableRouter: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const config: Config = { ...defaultConfig, ...(window as any)?.FLUENT };
