const ref = {
	// code: ['Código da entidade'],
	name: ['Nome da escola', 'text'],
	public_private: ['Pública ou privada', ['Todas', 'Privada', 'Pública']],
	type: ['Tipo', ['Todas', 'Privada', 'Federal', 'Estadual', 'Municipal']],
	address: {
		// city_code: ['Código do município'],
		city: ['Município'],
		location: ['Localização', ['Todas', 'Urbana', 'Rural']],
		// address_type: ['Tipo de logradouro'],
		zone: ['Zona', ['Todas', 'Centro', 'Norte', 'Leste', 'Sul', 'Oeste']],
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
		fundamental: ['Fundamental', 'yn'],
		medio: ['Médio', 'yn'],
	},
	avg: {
		enem: {
			quiz: ['Provas objetivas', 'avg'],
			essay: ['Redação', 'avg'],
		},
		students: ['Média de alunos por turma', 'avg'],
		hour_class: ['Média horas/aula diária', 'avg'],
		age_distortion_rate: ['%Taxa distorção idade-série', 'avg'],
		teacher_percent: ['%Docentes com curso superior', 'avg'],
		approval_rate: ['%Taxa de aprovação', 'avg'],
		reproval_rate: ['%Taxa de reprovação', 'avg'],
		abandon_rate: ['%Taxa de abandono', 'avg'],
		saeb: {
			ef5: {
				lp: ['Português', 'avg'],
				mt: ['Matemática', 'avg'],
			},
			ef9: {
				lp: ['Português', 'avg'],
				mt: ['Matemática', 'avg'],
			},
			em3: {
				lp: ['Português', 'avg'],
				mt: ['Matemática', 'avg'],
			},
		},
	},
	languages: { // Yes No
		english: ['Inglês', 'yn'],
		spanish: ['Espanhol', 'yn'],
		french: ['Francês', 'yn'],
	},
};

export const categs = {
	address: 'Endereço',
	utilities: 'Infraestrutura',
	school_type: 'Ensino',
	avg: 'Médias',
	languages: 'Idiomas',
};

export const avgRefs = {
	enem: 'Médias do Enem 2018',
	quiz: 'Prova objetiva',
	essay: 'Redação',
	students: 'Média de alunos por turma',
	hour_class: 'Média horas/aula diária',
	age_distortion_rate: '%Taxa distorção idade-série',
	teacher_percent: '%Docentes com curso superior',
	approval_rate: '%Taxa de aprovação',
	reproval_rate: '%Taxa de reprovação',
	abandon_rate: '%Taxa de abandono',
	saeb: 'Médias do Saeb',
	ef5: '5º ano - EF',
	ef9: '9º ano - EF',
	em3: '3º ano - EM',
	lp: 'Língua portuguesa',
	mt: 'Matemática',
	fundamental: 'Fundamental',
	medio: 'Médio',
};

export default ref;
