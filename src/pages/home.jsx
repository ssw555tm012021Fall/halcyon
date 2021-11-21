import React, { useContext, useEffect, useState } from 'react';
import { Chrono } from 'react-chrono';

import { BottomBar } from '../components/BottomBar';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';
import styles from './home.module.css';
import moment from 'moment';

export default function Home() {
	const { isAuthenticated, activities, me, achievements } =
		useContext(AppContext);
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

	let dialog = null;
	if (me) {
		if (me.isDepressed === null) {
			dialog = (
				<DepressionQuestionnaire
					show={showDialog}
					onClose={() => {
						setShowDialog(false);
					}}
				/>
			);
		} else if (me.isDepressed) {
			dialog = (
				<EmployeeDepressed
					show={showDialog}
					onClose={() => {
						setShowDialog(false);
					}}
				/>
			);
		} else {
			dialog = (
				<Dialog
					show={showDialog}
					onClose={() => {
						setShowDialog(false);
					}}
				/>
			);
		}
	}

	return (
		<>
			<div className={'view'}>
				<header className={styles['header']}>
					<div></div>
					<div>Home</div>
					<div>{moodBtn}</div>
				</header>
				{achievements ? (
					<Achievements />
				) : (
					<main className={styles['content']} />
				)}
				<BottomBar selected={'home'} />
			</div>
			{dialog}
		</>
	);
}

function Dialog({ onClose, show }) {
	const { activities, me } = useContext(AppContext);
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
					<button
						onClick={() => {
							setInputEmotion('');
							setOutputEmotion('');
							onClose();
						}}
					>
						<div />
					</button>
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

function EmployeeDepressed({ onClose, show }) {
	const className = [styles['modal-container'], styles['depressed']];
	if (show) {
		className.push(styles['show']);
	}
	return (
		<section className={className.join(' ')}>
			<div>
				<div>
					<button
						onClick={() => {
							onClose();
						}}
					>
						<div />
					</button>
				</div>
				<div>
					<div>
						<p>Seek a Psychiatrist</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function DepressionQuestionnaire({ onClose, show }) {
	const { api, updateMe, me } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const questions = [
		{
			content: 'Do you feel tired no matter how much you sleep?',
		},
		{
			content: 'Are you capable of enjoying things right now?',
		},
		{
			content: 'Are you having thoughts of your own death?',
		},
	];
	const [data, setData] = useState([...questions].map(() => undefined));
	const className = [styles['modal-container'], styles['questionnaire']];
	if (show) {
		className.push(styles['show']);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		const isDepressed =
			data.filter((i) => i).length - data.filter((i) => !i).length > 0;
		setIsLoading(true);
		api.setDepression(isDepressed)
			.then(() => {
				setIsLoading(false);
				me.isDepressed = isDepressed;
				updateMe(me);
				onClose();
			})
			.catch((e) => {
				setIsLoading(false);
				alert(e.message);
			});
	};
	const onChange = (i, value) => {
		try {
			value = JSON.parse(`${value}`);
			data[i] = value;
			setData([...data]);
		} catch (e) {
			data[i] = undefined;
			setData([...data]);
		}
	};
	return (
		<section className={className.join(' ')}>
			<form id={'q-form'} onSubmit={onSubmit}>
				<nav>
					<button
						type="button"
						onClick={() => {
							setData([...[...questions].map(() => undefined)]);
							document.getElementById('q-form').reset();
							onClose();
						}}
					>
						<div />
					</button>
				</nav>
				<div>
					{questions.map((question, i) => {
						return (
							<div key={i}>
								<label>{question.content}</label>
								<span>
									<select
										onChange={(e) => {
											onChange(i, e.target.value);
										}}
										value={data[i]}
									>
										<option value={undefined}>
											Select
										</option>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</select>
								</span>
							</div>
						);
					})}
				</div>
				<footer>
					{isLoading ||
					[...data].filter((i) => i !== undefined).length !==
						questions.length ? (
						<button type={'button'} disabled>
							Send
						</button>
					) : (
						<button type={'submit'}>Send</button>
					)}
				</footer>
			</form>
		</section>
	);
}

function Achievements() {
	const { achievements } = useContext(AppContext);
	console.log(achievements);
	const byType = (item) => {
		const { type, date } = item;
		const title = moment(date).format('MMM Do');
		let cardTitle = '';
		if (type === 'goal') {
			switch (item.category) {
				case 'water':
					cardTitle = `Goal: Drink water`;
					break;
				case 'break':
					cardTitle = `Goal: Take a break`;
					break;
				case 'guided_meditation':
					cardTitle = `Goal: Meditate (Guided)`;
					break;
				case 'meditation':
					cardTitle = `Goal: Meditate`;
					break;
			}
		} else {
			cardTitle = `Award: ${item.title}`;
		}

		return {
			title,
			cardTitle,
		};
	};
	const items = achievements.map(byType);

	return (
		<main className={styles['content']}>
			<div>
				<Chrono
					cardWidth={200}
					cardHeight={120}
					mode="VERTICAL"
					items={items}
					useReadMore={false}
					theme={{
						primary: '#094568',
						secondary: '#45c0e9',
						cardBgColor: '#fff',
						cardForeColor: '#000',
						titleColor: '#fff',
					}}
				>
					{achievements.map((achievement, i) => {
						const { type, date } = achievement;
						let content = '';
						if (type === 'goal') {
							content = `${achievement.target} ${achievement.frequency}`;
						} else {
							if (achievement.description) {
								content = achievement.description;
							}
						}

						return (
							<div key={i} className={styles['chrono-item-content']}>
								<p>{content}</p>
								<small>{moment(date).format('LLLL')}</small>
							</div>
						);
					})}
				</Chrono>
			</div>
		</main>
	);
}
