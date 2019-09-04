import { connect } from 'react-redux';
import List from './list';
import { fetchSchool } from '../../../../redux/actions';
import slugfy from '../../../../utils/slugfy';

const mapDispatchToProps = {
	fetchSchool,
};
const mapStateToProps = ({
	listSchools: { schoolList },
	filterList,
	nameFilter,
}) => {
	const filters = [];

	Object
		.keys(filterList)
		.forEach((key) => {
			if (Array.isArray(filterList[key])) {
				return filterList[key].map(each => Object
					.keys(each)
					.forEach((eachKey) => {
						if (each[eachKey][1]) {
							filters.push(eachKey);
						}
						return null;
					}));
			}
			return Object
				.keys(filterList[key])
				.forEach((each) => {
					if (filterList[key][each][1]) {
						filters.push(each);
					}
					return null;
				});
		});

	if (nameFilter !== '') {
		filters.push('name');
	}

	const schools = Object
		.keys(schoolList)
		.filter((each) => {
			if (filters.length <= 0) {
				return true;
			}
			const fin = include => filters.includes(include);
			const school = schoolList[each];
			const res = [];
			// Name
			if (fin('name')) res.push(slugfy(school.name).includes(slugfy(nameFilter)));
			// section 1
			if (fin('fundamental')) res.push(school.school_type.fundamental === 2);
			if (fin('medio')) res.push(school.school_type.medio === 2);
			// section 2
			if (fin('private')) res.push(school.public_private === 2);
			if (fin('public')) res.push(school.public_private === 1);
			// section 3
			if (fin('urban')) res.push(school.address.location === 1);
			if (fin('rural')) res.push(school.address.location === 2);
			// infra
			if (fin('pne_dep')) res.push(school.utilities.pne_dep === 2);
			if (fin('library')) res.push(school.utilities.library === 2);
			if (fin('science_lab')) res.push(school.utilities.science_lab === 2);
			if (fin('computer_lab')) res.push(school.utilities.computer_lab === 2);
			if (fin('sports_court')) res.push(school.utilities.sports_court === 2);
			// languages
			if (fin('spanish')) res.push(school.languages.spanish === 2);
			if (fin('french')) res.push(school.languages.french === 2);
			if (fin('english')) res.push(school.languages.english === 2);
			return !res.includes(false);
		})
		.map(each => [each, schoolList[each]]);

	return ({
		schools,
		filters,
	});
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(List);
