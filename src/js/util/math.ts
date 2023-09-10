export const clamp = (num: number, min: number, max: number) => {
	return Math.min(Math.max(num, min), max);
};

// Intended to be used for random element ids, where no duplicates can exist
export const uniqueRand = (): string => {
	if ("randomUUID" in crypto) {
		return crypto.randomUUID();
	}

	const date = (performance || Date).now();
	const num = Math.random();
	return (date * num).toString(16);
};
