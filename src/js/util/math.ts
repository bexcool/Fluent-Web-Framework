export const clamp = (num: number, min: number, max: number) => {
	return Math.min(Math.max(num, min), max);
};

export const uniqueRand = () => {
	const date = Date.now();
	const num = Math.random();
	return Math.floor(date * num);
};
