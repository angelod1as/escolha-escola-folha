export const upper = string => string
	.trim()
	.toLowerCase()
	.charAt(0)
	.toUpperCase()
	+ string
		.toLowerCase()
		.slice(1);

export const upperAll = (string) => {
	const exceptions = ['do', 'de', 'da', 'dos', 'des', 'das'];
	const newString = string.trim().split(' ');
	const ret = newString.map((str) => {
		if (exceptions.includes(str.toLowerCase())) {
			return str.toLowerCase();
		}
		return upper(str);
	});
	return ret.join(' ');
};
