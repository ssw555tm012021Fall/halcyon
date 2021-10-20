import React, { useContext, useEffect, useState } from 'react';
import styles from './meditation.module.css';
import { BottomBar } from '../components/BottomBar';
import { Link } from 'react-router-dom';
import { BigPlayer } from '../components/Player';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';

export default function Meditations() {
	const { isAuthenticated, api } = useContext(AppContext);
	const [isPlayerDisplayed, setIsPlayerDisplayed] = useState(false);
	const [meditations, setMeditations] = useState([]);
	const [meditation, setMeditation] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		api.getSoundsByType('guide')
			.then((meditations) => {
				setMeditations(meditations);
			})
			.catch((e) => alert(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}

	const onClick = (meditation) => {
		console.log(`Selected meditation`);
		console.log(meditation);
	};

	const mapMeditation = (meditation) => {
		return (
			<Meditation key={meditation.id} {...meditation} onClick={onClick} />
		);
	};

	return (
		<div className={['view', styles['meditations']].join(' ')}>
			<header>Meditation</header>
			<main>{meditations.map(mapMeditation)}</main>
			<BottomBar selected={'meditation'} />
		</div>
	);
}

function Meditation({ id, name, description, credit, length, url, onClick }) {
	return (
		<div
			className={styles['meditation']}
			onClick={() => {
				onClick({
					id,
					name,
					description,
					url,
					credit,
					length,
				});
			}}
		>
			<div id={id}>
				<h3>{name}</h3>
				<small>{credit}</small>
			</div>
		</div>
	);
}
