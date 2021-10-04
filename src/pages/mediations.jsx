import React from 'react';
import styles from './meditation.module.css';
import { BottomBar } from '../components/BottomBar';
import { Link } from 'react-router-dom';
import { BigPlayer } from '../components/Player';

export default function Meditations() {
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
