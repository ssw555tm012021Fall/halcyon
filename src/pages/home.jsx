import React, { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/BottomBar';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';
import styles from './home.module.css';

export default function Home() {
	const { isAuthenticated, activities } = useContext(AppContext);
	const [showDialog, setShowDialog] = useState(false);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}
	const onActivityClick = () => {
		setShowDialog(true);
	};

	let moodBtn = null;
	if (activities.length) {
		moodBtn = (
			<button className={styles['mood']} onClick={onActivityClick}>
				<div />
			</button>
		);
	}

	return (
		<>
			<div className={'view'}>
				<header className={styles['header']}>
					<div></div>
					<div>Home</div>
					<div>{moodBtn}</div>
				</header>
				<main className={styles['content']}>
					Pending home implimentation
				</main>
				<BottomBar selected={'home'} />
			</div>
			<Dialog show={showDialog} onClose={() => {
				setShowDialog(false);
			}} />
		</>
	);
}

function Dialog({ onClose, show }) {
	const { activities } = useContext(AppContext);
	const [inputEmotion, setInputEmotion] = useState('');
	const [outputEmotion, setOutputEmotion] = useState('');

	const inputEmotions = Array.from(
		new Set(activities.map((a) => a.inputEmotion))
	);

	let outputEmotions = [];

	useEffect(() => {
		setOutputEmotion('');
		if (inputEmotion) {
			outputEmotions = Array.from(
				new Set(
					activities
						.filter((a) => a.inputEmotion === inputEmotion)
						.map((a) => a.outputEmotion)
				)
			);
		}
	}, [inputEmotion]);

	const onInputEmotionChange = (e) => {
		setInputEmotion(e.target.value);
	};

	const onOutputEmotionChange = (e) => {
		setOutputEmotion(e.target.value);
	};

	if (inputEmotion) {
		outputEmotions = Array.from(
			new Set(
				activities
					.filter((a) => a.inputEmotion === inputEmotion)
					.map((a) => a.outputEmotion)
			)
		);
	}

	let resultComponent = null;
	if (inputEmotion && !outputEmotions.length) {
		resultComponent = (
			<div>We do not have activities for that emotion yet</div>
		);
	} else if (inputEmotion && outputEmotion) {
		const possibleActivities = activities.filter(
			(a) =>
				a.inputEmotion === inputEmotion &&
				a.outputEmotion === outputEmotion
		);
		const activity =
			possibleActivities[
				Math.floor(Math.random() * possibleActivities.length)
			];
		if (activity?.activity) {
			resultComponent = <div>{activity.activity}</div>;
		}
	}
	let content = null;
	const className = [styles['modal-container']];
	if (show) {
		className.push(styles['show']);
		content = (
			<div>
				<div>
					<button onClick={() => {
						setInputEmotion('');
						setOutputEmotion('');
						onClose();
					}}><div/></button>
				</div>
				<div>
					<div>
						<div>
							<label>
								Which emotion are you feeling right now?
							</label>
							<select
								name={'input-emotion'}
								onChange={onInputEmotionChange}
								value={inputEmotion}
							>
								<option value={''}>Select</option>
								{inputEmotions.map((e) => {
									return (
										<option key={e} value={e}>
											{e}
										</option>
									);
								})}
							</select>
						</div>
						{outputEmotions.length ? (
							<div>
								<label>How do you want to feel?</label>
								<select
									name={'output-emotion'}
									onChange={onOutputEmotionChange}
									value={outputEmotion}
								>
									<option value={''}>Select</option>
									{outputEmotions.map((e) => {
										return (
											<option key={e} value={e}>
												{e}
											</option>
										);
									})}
								</select>
							</div>
						) : null}
					</div>
				</div>
				{resultComponent ? (
					<div className={styles['result']}>{resultComponent}</div>
				) : null}
			</div>
		);
	}
	return <section className={className.join(' ')}>{content}</section>;
}
