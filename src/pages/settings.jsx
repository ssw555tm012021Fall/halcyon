import React, { useContext, useEffect, useState } from 'react';
import styles from './settings.module.css';
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
			<main className={styles['settings']}>
				<div>
					<NotificationOption />
					<NoticationDetails />
					<button
						className={styles['logout']}
						onClick={() => {
							/*localStorage.removeItem('token');
							window.location = '/';*/
						}}
					>
						Log out
					</button>
				</div>
			</main>
			<BottomBar selected={'settings'} />
		</div>
	);
}

function NotificationOption() {
	const [isChecked, setIsChecked] = useState(
		Notification?.permission === 'granted'
	);
	const onToggle = (e) => {
		const value = e.target.checked;
		if (value) {
			Notification.requestPermission().then(function (permission) {
				if (permission === 'granted') {
					setIsChecked(true);
				} else {
					setIsChecked(false);
				}
			});
		} else {
			if (Notification?.permission === 'granted') {
				setIsChecked(true);
			} else {
				setIsChecked(false);
			}
		}
	};
	return (
		<div className={styles['options']}>
			<div className={styles['option']}>
				<div>
					<span>Notifications </span>
					<Toggle on={isChecked} onToggle={onToggle} />
				</div>
			</div>
		</div>
	);
}

function NoticationDetails() {
	return (
		<div className={styles['options']} style={{
			marginTop: 20
		}}>
			<div className={styles['option']}>
				<div>
					<span>Water </span>
					<span>details</span>
				</div>
			</div>
			<div className={styles['option']}>
				<div>
					<span>Break </span>
					<span>details</span>
				</div>
			</div>
		</div>
	);
}

function Toggle({ on, onToggle }) {
	return (
		<label className={styles['switch']}>
			<input type="checkbox" checked={on} onChange={onToggle} />
			<span
				className={[styles['slider'], styles['round']].join(' ')}
			></span>
		</label>
	);
}
