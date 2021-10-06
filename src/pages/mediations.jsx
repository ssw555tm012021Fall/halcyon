import React, { useContext, useEffect } from 'react';
import styles from './meditation.module.css';
import { BottomBar } from '../components/BottomBar';
import { Link } from 'react-router-dom';
import { BigPlayer } from '../components/Player';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';

export default function Meditations() {
	const { isAuthenticated } = useContext(AppContext);
	if(!isAuthenticated) {
		return <Redirect to='/signin'/>;
	}
	return (
		<div className={['view', styles['meditations']].join(' ')}>
			<header>Meditation</header>
			<main>
				<Meditation />
				<Meditation />
				<Meditation />
				<Meditation />
				<Meditation />
				<Meditation />
				<Meditation />
			</main>
			<BottomBar selected={'meditation'} />
		</div>
	);
}

function Meditation() {
	return (
		<div className={styles['meditation']}>
			<Link to={'/meditations/1'}></Link>
		</div>
	);
}

export function SelectedMeditation() {
	const { isAuthenticated } = useContext(AppContext);
	if(!isAuthenticated) {
		return <Redirect to='/signin'/>;
	}
	return (
		<div className={styles['selected-meditation']}>
			<header>
				<div>
					<Link to={'/meditations'}>
						<div className={styles['back']}></div>
					</Link>
				</div>
				<div>Name</div>
				<div></div>
			</header>
			<main>
				<BigPlayer />
			</main>
		</div>
	);
}
