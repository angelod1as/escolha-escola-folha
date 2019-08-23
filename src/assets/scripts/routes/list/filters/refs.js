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
		fundamental: {
			students: ['Média de alunos / turma (ensino fundamental)', 'avg'],
			hour_class: ['Média horas/aula diária (ensino fundamental)', 'avg'],
			age_distortion_rate: ['Taxa distorção idade-série (ensino fundamental)', 'avg'],
			teacher_percent: ['% de docentes com curso superior (ensino fundamental)', 'avg'],
			approval_rate: ['Taxa de aprovação (ensino fundamental)', 'avg'],
			reproval_rate: ['Taxa de reprovação (ensino fundamental)', 'avg'],
			abandon_rate: ['Taxa de abandono (ensino fundamental)', 'avg'],
		},
		medio: {
			students: ['Média de alunos / turma (ensino médio)', 'avg'],
			hour_class: ['Média horas/aula diária (ensino médio)', 'avg'],
			age_distortion_rate: ['Taxa distorção idade-série (ensino médio)', 'avg'],
			teacher_percent: ['% de docentes com curso superior (ensino médio)', 'avg'],
			approval_rate: ['Taxa de aprovação (ensino médio)', 'avg'],
			reproval_rate: ['Taxa de reprovação (ensino médio)', 'avg'],
			abandon_rate: ['Taxa de abandono (ensino médio)', 'avg'],
		},
		saeb: {
			avg_saeb_2017_5EF_lp: ['Saeb 2017 (média - 5º ano -português)', 'avg'],
			avg_saeb_2017_5EF_mt: ['Saeb 2017 (média - 5º ano -matemática)', 'avg'],
			avg_saeb_2017_9EF_lp: ['Saeb 2017 (média - 9º ano -português)', 'avg'],
			avg_saeb_2017_9EF_mt: ['Saeb 2017 (média - 9º ano -matemática)', 'avg'],
			avg_saeb_2017_3EM_lp: ['Saeb 2017 (média - 3º ano do médio -português)', 'avg'],
			avg_saeb_2017_3EM_mt: ['Saeb 2017 (média - 3º ano do médio - matemática)', 'avg'],
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
