import React from 'react';
import styles from './music.module.css';
import {BottomBar} from '../components/BottomBar'
import { Link } from 'react-router-dom';
import { BigPlayer } from '../components/Player';

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
		<Link to={'/music/1'}>
		</Link>
	</div>
}

export function SelectedSong() {
	return <div className={styles['selected-song']}>
		<header>
			<div>
				<Link to={'/music'}>
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
}