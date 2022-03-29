export const copyToClipboard = (string: string) => {
	navigator.clipboard.writeText(string);
};
