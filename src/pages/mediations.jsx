import React from 'react';
import styles from './meditation.module.css';
import {BottomBar} from '../components/BottomBar'
import { Link } from 'react-router-dom';

export default function Meditations() {
	return (
		<div className={['view', styles['meditations']].join(' ')}>
			<header>
				Meditation
			</header>
			<main>
				<Meditation/>
				<Meditation/>
				<Meditation/>
				<Meditation/>
				<Meditation/>
				<Meditation/>
				<Meditation/>
			</main>
			<BottomBar selected={'meditation'}/>
		</div>
	);
}

function Meditation() {
	return <div className={styles['meditation']}>
		<Link to={'/'}>
		</Link>
	</div>
}