const filter = (data, filters) => {
	// LIMITANDO
	const list = data.filter((school) => {
		const shallow = {};

		const loop = (lSchool) => {
			Object.keys(lSchool).forEach((lProp) => {
				if (typeof lSchool[lProp] === 'string' || typeof lSchool[lProp] === 'number') {
					shallow[lProp] = lSchool[lProp];
				} else {
					loop(lSchool[lProp]);
				}
			});
		};

		// Creating shallow object;
		loop(school);

		const filtered = Object
			.keys(filters)
			.map((fil) => {
				if (filters[fil] === '' || +filters[fil] === 0) {
					return true;
				}
				if (fil === 'zone' && +filters[fil] === 1) {
					return true;
				}
				if (fil === 'name') {
					return shallow[fil].toLowerCase().includes(filters[fil].toLowerCase());
				}
				return +filters[fil] === +shallow[fil];
			});
		// if ANY false === false
		return !filtered.some(e => e === false);
	});
	return list;
};

export default filter;
