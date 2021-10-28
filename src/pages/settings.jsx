import React, { useContext, useEffect, useState } from 'react';
import styles from './settings.module.css';
import { BottomBar } from '../components/BottomBar';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';

export default function Settings() {
	const { isAuthenticated, goals } = useContext(AppContext);
	const [showDialog, setShowDialog] = useState(false);
	const [dialogType, setDialogType] = useState(null);
	const [dialogCategory, setDialogCategory] = useState(null);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}
	return (
		<div className={'view'}>
			<header>Settings</header>
			<main className={styles['settings']}>
				<div>
					<SystemNotificationOption />
					<ReminderOptions
						setDialogType={(type) => {
							setShowDialog(true);
							setDialogType(type);
							setDialogCategory('reminder');
						}}
					/>
					{goals ? <GoalOptions
						setDialogType={(type) => {
							setShowDialog(true);
							setDialogType(type);
							setDialogCategory('goal');
						}}
					/> : null}
					<button
						className={styles['logout']}
						onClick={() => {
							localStorage.removeItem('token');
							window.location = '/';
						}}
					>
						Log out
					</button>
				</div>
			</main>
			<BottomBar selected={'settings'} />
			<Dialog
				show={showDialog}
				type={dialogType}
				category={dialogCategory}
				onClose={() => {
					setShowDialog(false);
				}}
			/>
		</div>
	);
}

function SystemNotificationOption() {
	const { isNotificationSupported } = useContext(AppContext);
	const [isChecked, setIsChecked] = useState(
		isNotificationSupported && Notification?.permission === 'granted'
	);
	if (!isNotificationSupported) {
		return null;
	}
	if (isNotificationSupported && Notification?.permission === 'denied') {
		return null;
	}
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
		<section className={styles['options-container']}>
			<div className={styles['options']}>
				<div className={styles['option']}>
					<div>
						<span>System Notifications</span>
						<Toggle on={isChecked} onToggle={onToggle} />
					</div>
				</div>
			</div>
		</section>
	);
}

function ReminderOptions({ setDialogType }) {
	return (
		<section className={styles['options-container']}>
			<div className={styles['title']}>
				<h4>Reminders</h4>
			</div>
			<div className={styles['options']}>
				<div
					className={styles['option']}
					onClick={() => {
						setDialogType('water');
					}}
				>
					<div>
						<span>Water </span>
						<div>
							<div className={styles['chevron-right']}></div>
						</div>
					</div>
				</div>
				<div
					className={styles['option']}
					onClick={() => {
						setDialogType('break');
					}}
				>
					<div>
						<span>Break </span>
						<div>
							<div className={styles['chevron-right']}></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function GoalOptions({ setDialogType }) {
	return (
		<section className={styles['options-container']}>
			<div className={styles['title']}>
				<h4>Goals</h4>
			</div>
			<div className={styles['options']}>
				<div
					className={styles['option']}
					onClick={() => {
						setDialogType('water');
					}}
				>
					<div>
						<span>Water </span>
						<div>
							<div className={styles['chevron-right']}></div>
						</div>
					</div>
				</div>
				<div
					className={styles['option']}
					onClick={() => {
						setDialogType('break');
					}}
				>
					<div>
						<span>Break </span>
						<div>
							<div className={styles['chevron-right']}></div>
						</div>
					</div>
				</div>
				<div
					className={styles['option']}
					onClick={() => {
						setDialogType('guided_meditation');
					}}
				>
					<div>
						<span>Guided Meditation</span>
						<div>
							<div className={styles['chevron-right']}></div>
						</div>
					</div>
				</div>
				<div
					className={styles['option']}
					onClick={() => {
						setDialogType('meditation');
					}}
				>
					<div>
						<span>Unguided Meditation</span>
						<div>
							<div className={styles['chevron-right']}></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function Dialog({ show, type, onClose, category }) {
	switch (category) {
		case 'reminder':
			return <ReminderDialog show={show} onClose={onClose} type={type} />;
		case 'goal':
			return <GoalDialog show={show} onClose={onClose} type={type} />;
		default:
			return null;
	}
}

function ReminderDialog({ show, onClose, type }) {
	if (!type) {
		return null;
	}
	const { cancelReminders, createReminders, api } = useContext(AppContext);
	const classNames = [styles['dialog-container']];
	const [reminder, setReminder] = useState(
		JSON.parse(localStorage.getItem(`reminder-${type}`))
	);

	const [isEnabled, setIsEnabled] = useState(reminder?.enabled);
	const [start, setStart] = useState(reminder?.start);
	const [end, setEnd] = useState(reminder?.end);
	const [interval, setInterval] = useState(reminder?.interval);
	if (show) {
		classNames.push(styles['show']);
	}

	useEffect(() => {
		const r = JSON.parse(localStorage.getItem(`reminder-${type}`));
		if (r) {
			setIsEnabled(r.enabled);
			setStart(r.start);
			setEnd(r.end);
			setInterval(r.interval);
			setReminder(r);
		}
	}, [show]);

	if (!reminder) {
		return null;
	}

	const onSubmit = (e) => {
		e.preventDefault();
		reminder.interval = parseInt(`${reminder.interval}`);
		const { start, end, interval } = reminder;
		api.updateReminder({
			type,
			interval,
			startAt: start,
			endAt: end,
		})
			.then(() => {
				localStorage.setItem(
					`reminder-${type}`,
					JSON.stringify(reminder)
				);

				if (reminder.enabled) {
					createReminders({
						type,
						start,
						end,
						interval,
					});
				} else {
					cancelReminders(type);
				}
				onClose();
			})
			.catch((e) => alert(e.message));
	};

	return (
		<div className={classNames.join(' ')}>
			<section className={styles['dialog']}>
				<form onSubmit={onSubmit}>
					<nav>
						<div>
							<button
								type={'button'}
								className={styles['close']}
								onClick={onClose}
							>
								<div />
							</button>
						</div>

						<div className={styles['title']}>
							{type.toUpperCase()}
						</div>
						<div></div>
					</nav>
					<main>
						<section className={styles['options-container']}>
							<div
								className={styles['options']}
								style={{
									marginTop: 20,
								}}
							>
								<div className={styles['option']}>
									<div>
										<span>Enabled </span>
										<Toggle
											on={isEnabled}
											onToggle={() => {
												reminder.enabled = !isEnabled;
												setReminder(reminder);
												setIsEnabled(!isEnabled);
											}}
										/>
									</div>
								</div>
								<div className={styles['option']}>
									<div>
										<span>Start</span>
										<div>
											{isEnabled ? (
												<input
													required
													type={'time'}
													value={start}
													onChange={(e) => {
														reminder.start =
															e.target.value;
														setStart(
															e.target.value
														);
														setReminder(reminder);
													}}
												/>
											) : (
												<input
													type={'time'}
													value={start}
													disabled
												/>
											)}
										</div>
									</div>
								</div>
								<div className={styles['option']}>
									<div>
										<span>End</span>
										<div>
											{isEnabled ? (
												<input
													required
													type={'time'}
													value={end}
													onChange={(e) => {
														reminder.end =
															e.target.value;
														setEnd(e.target.value);
														setReminder(reminder);
													}}
												/>
											) : (
												<input
													type={'time'}
													value={end}
													disabled
												/>
											)}
										</div>
									</div>
								</div>
								<div className={styles['option']}>
									<div>
										<span>Interval</span>
										<div>
											{isEnabled ? (
												<input
													required
													type={'number'}
													value={interval}
													onChange={(e) => {
														reminder.interval =
															e.target.value;
														setInterval(
															e.target.value
														);
														setReminder(reminder);
													}}
												/>
											) : (
												<input
													type={'number'}
													value={interval}
													disabled
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						</section>
					</main>
					<footer>
						<button type={'submit'}>Save</button>
					</footer>
				</form>
			</section>
		</div>
	);
}

function GoalDialog({ show, onClose, type }) {
	if (!type) {
		return null;
	}
	let { goals } = useContext(AppContext);
	const [stage, setStage] = useState('all');
	goals = goals.filter((goal) => goal.category === type);
	const frequencies = new Set(['daily', 'weekly', 'monthly', 'yearly']);
	for (const goal of goals) {
		if (frequencies.has(goal.frequency)) {
			frequencies.delete(goal.frequency);
		}
	}

	const classNames = [styles['dialog-container']];

	if (show) {
		classNames.push(styles['show']);
	}

	let component;

	switch (stage) {
		case 'all':
			component = (
				<GoalDisplayStage
					onClose={onClose}
					type={type}
					goals={goals}
					frequencies={Array.from(frequencies)}
					onGoalClick={(goal) => {
						console.log(goal);
					}}
				/>
			);
			break;
		default:
			component = null;
	}

	return (
		<div className={classNames.join(' ')}>
			<section className={styles['dialog']}>{component}</section>
		</div>
	);
}

function GoalDisplayStage({ onClose, type, goals, onGoalClick, frequencies }) {
	console.log(`Frequencies`, frequencies)
	return (
		<div className={styles['goal-stage-display']}>
			<nav>
				<div>
					<button
						type={'button'}
						className={styles['close']}
						onClick={onClose}
					>
						<div />
					</button>
				</div>

				<div className={styles['title']}>{type.toUpperCase()} GOALS</div>
				<div></div>
			</nav>
			<main>
				<section className={styles['options-container']}>
					<div
						className={styles['options']}
						style={{
							marginTop: 20,
						}}
					>
						{goals.map((goal) => {
							return (
								<div
									key={goal.frequency}
									className={styles['option']}
									onClick={() => {
										onGoalClick(goal);
									}}
								>
									<div>
										<span>{goal.target} times {goal.frequency}</span>
										<div>
											<div
												className={
													styles['chevron-right']
												}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			</main>
			{frequencies.length ? <footer>
				<button onClick={() => {
					console.log(`I add a new goal`)
				}}>
					<img className={styles['add-btn']} />
				</button>
			</footer> : null}
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
