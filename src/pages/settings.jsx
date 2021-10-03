import React from 'react';
import styles from './home.module.css';
import {BottomBar} from '../components/BottomBar'

export default function Settings() {
	return (
		<div className={'view'}>
			<header>
				Settings
			</header>
			<main>Settings</main>
			<BottomBar selected={'settings'}/>
		</div>
	);
}
