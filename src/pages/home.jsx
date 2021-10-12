import React, { useContext } from 'react';
import { BottomBar } from '../components/BottomBar';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';
import styles from './home.module.css';

export default function Home() {
	const { isAuthenticated } = useContext(AppContext);
	if(!isAuthenticated) {
		return <Redirect to='/signin'/>;
	}
	return (
		<div className={'view'}>
			<header className={'header'}>Home</header>
			<main className={styles['content']}>
				Pending home implimentation
			</main>
			<BottomBar selected={'home'} />
		</div>
	);
}
