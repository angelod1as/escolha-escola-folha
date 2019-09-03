export const upper = (string) => {
	if (typeof string === 'string') {
		return string
			.trim()
			.toLowerCase()
			.charAt(0)
			.toUpperCase()
	+ string
		.toLowerCase()
		.slice(1);
	} return 'null';
};


export const upperAll = (string) => {
	const exceptions = ['do', 'de', 'da', 'dos', 'des', 'das', 'e'];
	const newString = string.trim().split(' ');
	const ret = newString.map((str) => {
		if (exceptions.includes(str.toLowerCase())) {
			return typeof str === 'string' ? str.toLowerCase() : '';
		}
		return upper(str);
	});
	return ret.join(' ');
};
