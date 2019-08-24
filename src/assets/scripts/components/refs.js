export const ref = {
	// code: ['Código da entidade'],
	name: ['Nome da escola', 'text'],
	public_private: ['Pública ou privada', ['Todas', 'Privada', 'Pública']],
	type: ['Tipo', ['Todas', 'Federal', 'Estadual', 'Municipal']],
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
		fundamental: ['Ensino fundamental', 'yn'],
		medio: ['Ensino médio', 'yn'],
	},
	avg: {
		enem: {
			quiz: ['ENEM 2018 provas objetivas', 'avg'],
			essay: ['ENEM 2018 redação', 'avg'],
		},
		students: {
			fundamental: ['Média de alunos por turma', 'avg'],
			medio: ['Média de alunos por turma', 'avg'],
		},
		hour_class: {
			fundamental: ['Média horas/aula diária', 'avg'],
			medio: ['Média horas/aula diária', 'avg'],
		},
		age_distortion_rate: {
			fundamental: ['%Taxa distorção idade-série', 'avg'],
			medio: ['%Taxa distorção idade-série', 'avg'],
		},
		teacher_percent: {
			fundamental: ['%Docentes com curso superior', 'avg'],
			medio: ['%Docentes com curso superior', 'avg'],
		},
		approval_rate: {
			fundamental: ['%Taxa de aprovação', 'avg'],
			medio: ['%Taxa de aprovação', 'avg'],
		},
		reproval_rate: {
			fundamental: ['%Taxa de reprovação', 'avg'],
			medio: ['%Taxa de reprovação', 'avg'],
		},
		abandon_rate: {
			fundamental: ['%Taxa de abandono', 'avg'],
			medio: ['%Taxa de abandono (ensino médio)', 'avg'],
		},
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
		english: ['Disciplina de inglês', 'yn'],
		spanish: ['Disciplina de espanhol', 'yn'],
		french: ['Disciplina de francês', 'yn'],
	},
};

export const categs = {
	address: 'Endereço',
	utilities: 'Adicionais',
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
	ef5: '5º ano do Ensino Fundamental',
	ef9: '9º ano do Ensino Fundamental',
	em3: '3º ano do Ensino Médio',
	lp: 'Língua portuguesa',
	mt: 'Matemática',
	fundamental: 'Fundamental',
	medio: 'Médio',
};
