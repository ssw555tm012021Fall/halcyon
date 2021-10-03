import React from 'react';
import styles from './music.module.css';
import {BottomBar} from '../components/BottomBar'
import { Link } from 'react-router-dom';

export default function Music() {
	return (
		<div className={['view', styles['music']].join(' ')}>
			<header>
				Music
			</header>
			<main>
				<Song />
				<Song />
				<Song />
				<Song />
				<Song />
			</main>
			<BottomBar selected={'music'}/>
		</div>
	);
}

function Song() {
	return <div className={styles['song']}>
		<Link to={'/'}>
		</Link>
	</div>
}