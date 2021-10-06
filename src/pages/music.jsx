import React, { useContext } from 'react';
import styles from './music.module.css';
import { BottomBar } from '../components/BottomBar';
import { Link } from 'react-router-dom';
import { BigPlayer } from '../components/Player';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';

export default function Music() {
	const { isAuthenticated } = useContext(AppContext);
	if(!isAuthenticated) {
		return <Redirect to='/signin'/>;
	}
	return (
		<div className={['view', styles['music']].join(' ')}>
			<header>Music</header>
			<main>
				<Song />
				<Song />
				<Song />
				<Song />
				<Song />
			</main>
			<BottomBar selected={'music'} />
		</div>
	);
}

function Song() {
	return (
		<div className={styles['song']}>
			<Link to={'/music/1'}></Link>
		</div>
	);
}

export function SelectedSong() {
	const { isAuthenticated } = useContext(AppContext);
	if(!isAuthenticated) {
		return <Redirect to='/signin'/>;
	}
	return (
		<div className={styles['selected-song']}>
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
	);
}
