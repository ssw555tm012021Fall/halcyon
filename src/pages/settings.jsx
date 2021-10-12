import React, { useContext, useEffect } from 'react';
import styles from './home.module.css';
import { BottomBar } from '../components/BottomBar';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';

export default function Settings() {
	const { isAuthenticated } = useContext(AppContext);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}
	return (
		<div className={'view'}>
			<header>Settings</header>
			<main
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<button
					onClick={() => {
						localStorage.removeItem('token');
						window.location = '/';
					}}
				>
					Log out
				</button>
			</main>
			<BottomBar selected={'settings'} />
		</div>
	);
}
