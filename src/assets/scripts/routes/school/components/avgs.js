import React from 'react';
import uuid from 'uuid/v1';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ref, avgRefs } from '../../../components/refs';
import AvgBar from './avg-bar';

const Legend = styled.div`
	display: flex;
`;

const LegendWithBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	div {
		width: 15px;
		height: 15px;
		margin-right: 5px;
	}
	&:first-child {
		margin-right: 15px;
	}
`;

const Upper = styled(LegendWithBox)`
	div {
		background-color: ${p => p.theme.color.color};
	}
`;
const Lower = styled(LegendWithBox)`
	div {
		background-color: ${p => p.theme.color.gray};
	}
`;

const Avgs = ({ data, city }) => {
	const { avg } = city;

	/*
		avg: {
		enem: {
			quiz: ['ENEM 2018 provas objetivas', 'avg'],
			essay: ['ENEM 2018 redação', 'avg'],
		},
		fundamental: {
			students: ['Média de alunos por turma (ensino fundamental)', 'avg'],
			hour_class: ['Média horas/aula diária (ensino fundamental)', 'avg'],
			age_distortion_rate: ['%Taxa distorção idade-série (ensino fundamental)', 'avg'],
			teacher_percent: ['%Docentes com curso superior (ensino fundamental)', 'avg'],
			approval_rate: ['%Taxa de aprovação (ensino fundamental)', 'avg'],
			reproval_rate: ['%Taxa de reprovação (ensino fundamental)', 'avg'],
			abandon_rate: ['%Taxa de abandono (ensino fundamental)', 'avg'],
		},
		medio: {
			students: ['Média de alunos por turma (ensino médio)', 'avg'],
			hour_class: ['Média horas/aula diária (ensino médio)', 'avg'],
			age_distortion_rate: ['%Taxa distorção idade-série (ensino médio)', 'avg'],
			teacher_percent: ['%Docentes com curso superior (ensino médio)', 'avg'],
			approval_rate: ['%Taxa de aprovação (ensino médio)', 'avg'],
			reproval_rate: ['%Taxa de reprovação (ensino médio)', 'avg'],
			abandon_rate: ['%Taxa de abandono (ensino médio)', 'avg'],
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
	*/

	//	enem
	//		essay
	//		quiz
	//	Fund/Medio
	//		abandon
	//		age
	//		approval
	//		hour
	//		reproval
	//		stydents
	//		teacher
	//	saeb
	//		Saeb 2017 (média - 5º ano -português)
	// 		Saeb 2017 (média - 5º ano -matemática)
	// 		Saeb 2017 (média - 9º ano -português)
	// 		Saeb 2017 (média - 9º ano -matemática)
	// 		Saeb 2017 (média - 3º ano do médio -português)
	// 		Saeb 2017 (média - 3º ano do médio - matemática)

	const valid = Object
		.keys(data)
		.map(first => [first, Object
			.keys(data[first])
			.filter(second => data[first][second] !== '')])
		.filter(each => each[1].length > 0);

	console.log(valid);

	// const outer = Object.keys(data).map((first) => {
	// 	const schoolCateg = data[first];
	// 	const cityCateg = avg[first];

	// 	const inner = Object.keys(schoolCateg)
	// 		.filter((second) => {
	// 			const schoolSub = schoolCateg[second];
	// 			return schoolSub !== '';
	// 		})
	// 		.map((second) => {
	// 			const schoolSub = schoolCateg[second];
	// 			const citySub = cityCateg[second];
	// 			let mainRef = ref.avg[first][second][0];
	// 			const percent = mainRef.includes('%');

	// 			if (percent) {
	// 				mainRef = mainRef.replace('%', '');
	// 			}

	// 			return (
	// 				<div key={uuid()}>
	// 					<h5>{mainRef}</h5>
	// 					<AvgBar
	// 						percent={percent}
	// 						school={Math.round(schoolSub * 100) / 100}
	// 						avg={parseFloat(Math.round(citySub * 100) / 100)}
	// 					/>
	// 				</div>
	// 			);
	// 		});

	// 	if (inner.length > 0) {
	// 		return (
	// 			<div key={uuid()}>
	// 				<h4>{avgRefs[first]}</h4>
	// 				<div>{inner}</div>
	// 			</div>

	// 		);
	// 	}
	// 	return null;
	// });

	if (valid.length > 0) {
		return (
			<div key={uuid()}>
				<h3>Médias</h3>
				<Legend>
					<Upper>
						<div />
						<p>Média da escola</p>
					</Upper>
					<Lower>
						<div />
						<p>Média da cidade</p>
					</Lower>
				</Legend>
				{valid.map(each => (
					<div>
						<h3>{avgRefs[each[0]]}</h3>
					</div>
				))}
			</div>
		);
	}
	return null;
};

Avgs.propTypes = {
	city: PropTypes.shape().isRequired,
	data: PropTypes.shape().isRequired,
};

export default Avgs;
