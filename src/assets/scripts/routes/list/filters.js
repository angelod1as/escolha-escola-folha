import React from 'react';
import uuid from 'uuid/v1';

const Filters = ({ nameFilter }) => {
	// TODO
	// UPDATE THIS STATE
	// PASS STATE BACKWARDS


	const ref = {
		// code: ['Código da entidade'],
		name: ['Nome da escola', 'text'],
		public: ['Pública ou privada', ['Pública', 'Privada']],
		type: ['Tipo', ['Privada', 'Federal', 'Estadual', 'Municipal']],
		address: {
			// city_code: ['Código do município'],
			city: ['Município'],
			location: ['Localização', ['Urbana', 'Rural']],
			// address_type: ['Tipo de logradouro'],
			zone: ['Zona', ['Centro', 'Norte', 'Leste', 'Sul', 'Oeste']],
		},
		utilities: { // Yes No
			computer_lab: ['Laboratório de informática', 'yn'],
			science_lab: ['Laboratório de ciências', 'yn'],
			sports_court: ['Quadra de esportes', 'yn'],
			library: ['Biblioteca', 'yn'],
			pne_dep: ['Dependências acessíveis para pessoas com necessidades especiais', 'yn'],
			internet: ['Internet', 'yn'],
		},
		school_type: {
			fundamental: ['Ensino fundamental', 'yn'],
			medio: ['Ensino médio', 'yn'],
		},
		// avg: {
		// 	enem: {
		// 		quiz: ['ENEM 2018 provas objetivas', 'avg'],
		// 		essay: ['ENEM 2018 redação', 'avg'],
		// 	},
		// 	fundamental: {
		// 		students: ['Média de alunos / turma (ensino fundamental)', 'avg'],
		// 		hour_class: ['Média horas/aula diária (ensino fundamental)', 'avg'],
		// 		age_distortion_rate: ['Taxa distorção idade-série (ensino fundamental)', 'avg'],
		// 		teacher_percent: ['% de docentes com curso superior (ensino fundamental)', 'avg'],
		// 		approval_rate: ['Taxa de aprovação (ensino fundamental)', 'avg'],
		// 		reproval_rate: ['Taxa de reprovação (ensino fundamental)', 'avg'],
		// 		abandon_rate: ['Taxa de abandono (ensino fundamental)', 'avg'],
		// 	},
		// 	medio: {
		// 		students: ['Média de alunos / turma (ensino médio)', 'avg'],
		// 		hour_class: ['Média horas/aula diária (ensino médio)', 'avg'],
		// 		age_distortion_rate: ['Taxa distorção idade-série (ensino médio)', 'avg'],
		// 		teacher_percent: ['% de docentes com curso superior (ensino médio)', 'avg'],
		// 		approval_rate: ['Taxa de aprovação (ensino médio)', 'avg'],
		// 		reproval_rate: ['Taxa de reprovação (ensino médio)', 'avg'],
		// 		abandon_rate: ['Taxa de abandono (ensino médio)', 'avg'],
		// 	},
		// 	saeb: {
		// 		avg_saeb_2017_5EF_lp: ['Saeb 2017 (média - 5º ano -português)', 'avg'],
		// 		avg_saeb_2017_5EF_mt: ['Saeb 2017 (média - 5º ano -matemática)', 'avg'],
		// 		avg_saeb_2017_9EF_lp: ['Saeb 2017 (média - 9º ano -português)', 'avg'],
		// 		avg_saeb_2017_9EF_mt: ['Saeb 2017 (média - 9º ano -matemática)', 'avg'],
		// 		avg_saeb_2017_3EM_lp: ['Saeb 2017 (média - 3º ano do médio -português)', 'avg'],
		// 		avg_saeb_2017_3EM_mt: ['Saeb 2017 (média - 3º ano do médio - matemática)', 'avg'],
		// 	},
		// },
		languages: { // Yes No
			english: ['Disciplina de ingles', 'yn'],
			spanish: ['Disciplina de espanhol', 'yn'],
			french: ['Disciplina de frances', 'yn'],
		},
	};

	const categs = {
		address: 'Endereço',
		utilities: 'Adicionais',
		school_type: 'Ensino',
		avg: 'Médias',
		languages: 'Idiomas',
	};

	const filterType = (arr, category) => {
		if (arr[1] === 'text') {
			return (
				<div key={uuid()}>
					<h2>{arr[0]}</h2>
					<input id="name" type="text" onChange={e => nameFilter(e.target.value)} />
				</div>
			);
		}
		if (arr[1] === 'yn') {
			return (
				<div key={uuid()}>
					<h2>{arr[0]}</h2>
					<input type="checkbox" name={category} id={category} />
				</div>
			);
		}
		if (Array.isArray(arr[1])) {
			const final = arr[1].map(each => <option key={uuid()} value={each}>{each}</option>);
			return (
				<div key={uuid()}>
					<h2>{arr[0]}</h2>
					<select name={category} id={category}>
						{final}
					</select>
				</div>
			);
		}
		return null;
	};

	const goToArray = (obj, category) => {
		if (Array.isArray(obj)) {
			return filterType(obj, category);
		}
		return (
			<div key={uuid()}>
				<h2>{categs[category]}</h2>
				{Object.keys(obj).map(each => goToArray(obj[each], each))}
			</div>
		);
	};

	const filters = Object.keys(ref).map(category => goToArray(ref[category], category));

	return (
		<form onSubmit={(e) => { e.preventDefault(); }}>
			<h2>Filtros</h2>
			{filters}
		</form>
	);
};

export default Filters;
