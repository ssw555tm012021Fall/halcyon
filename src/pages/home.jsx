import React, { useContext } from 'react';
import { BottomBar } from '../components/BottomBar';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';

export default function Home() {
	const { isAuthenticated } = useContext(AppContext);
	if(!isAuthenticated) {
		return <Redirect to='/signin'/>;
	}
	return (
		<div className={'view'}>
			<header className={'header'}>Home</header>
			<main className={'content'}>Home</main>
			<BottomBar selected={'home'} />
		</div>
	);
}
