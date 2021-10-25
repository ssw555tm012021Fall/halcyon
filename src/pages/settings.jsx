import React, { useContext, useEffect, useState } from 'react';
import styles from './settings.module.css';
import { BottomBar } from '../components/BottomBar';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';

export default function Settings() {
	const { isAuthenticated } = useContext(AppContext);
	const [showDialog, setShowDialog] = useState(false);
	const [dialogType, setDialogType] = useState(null);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}
	return (
		<div className={'view'}>
			<header>Settings</header>
			<main className={styles['settings']}>
				<div>
					<NotificationOption />
					<NoticationDetails
						setDialogType={(type) => {
							setShowDialog(true);
							setDialogType(type);
						}}
					/>
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
				onClose={() => {
					setShowDialog(false);
				}}
			/>
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
					<span>System Notifications</span>
					<Toggle on={isChecked} onToggle={onToggle} />
				</div>
			</div>
		</div>
	);
}

function NoticationDetails({ setDialogType }) {
	return (
		<div
			className={styles['options']}
			style={{
				marginTop: 20,
			}}
		>
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

function Dialog({ show, type, onClose }) {
	if (type === 'water') {
		return <WaterDialog show={show} onClose={onClose} />;
	}

	return <BreakDialog show={show} onClose={onClose} />;
}

function WaterDialog({ show, onClose }) {
	const { cancelReminders, createReminders, api } = useContext(AppContext);
	const classNames = [styles['dialog-container']];
	const [reminder, setReminder] = useState(
		JSON.parse(localStorage.getItem(`reminder-water`))
	);

	const [isEnabled, setIsEnabled] = useState(reminder?.enabled);
	const [start, setStart] = useState(reminder?.start);
	const [end, setEnd] = useState(reminder?.end);
	const [interval, setInterval] = useState(reminder?.interval);
	if (show) {
		classNames.push(styles['show']);
	}

	useEffect(()=> {
		const r = JSON.parse(localStorage.getItem(`reminder-water`));
		setIsEnabled(r.enabled);
		setStart(r.start);
		setEnd(r.end);
		setInterval(r.interval);
		setReminder(r);
	}, [show])

	if (!reminder) {
		return null;
	}

	const onSubmit = (e) => {
		e.preventDefault();
		reminder.interval = parseInt(`${reminder.interval}`);
		const { start, end, interval } = reminder;
		api.updateReminder({
			type: 'water',
			interval,
			startAt: start,
			endAt: end,
		})
			.then(() => {
				localStorage.setItem(
					`reminder-water`,
					JSON.stringify(reminder)
				);

				if (reminder.enabled) {
					createReminders({
						type: 'water',
						start,
						end,
						interval,
					});
				} else {
					cancelReminders('water');
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

						<div className={styles['title']}>Water</div>
						<div></div>
					</nav>
					<main>
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
													setStart(e.target.value);
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
													setInterval(e.target.value);
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
					</main>
					<footer>
						<button type={'submit'}>Save</button>
					</footer>
				</form>
			</section>
		</div>
	);
}

function BreakDialog({ show, onClose }) {
	const { cancelReminders, createReminders, api } = useContext(AppContext);
	const classNames = [styles['dialog-container']];
	const [reminder, setReminder] = useState(
		JSON.parse(localStorage.getItem(`reminder-break`))
	);

	const [isEnabled, setIsEnabled] = useState(reminder?.enabled);
	const [start, setStart] = useState(reminder?.start);
	const [end, setEnd] = useState(reminder?.end);
	const [interval, setInterval] = useState(reminder?.interval);

	if (show) {
		classNames.push(styles['show']);
	}
	useEffect(()=> {
		const r = JSON.parse(localStorage.getItem(`reminder-break`));
		setIsEnabled(r.enabled);
		setStart(r.start);
		setEnd(r.end);
		setInterval(r.interval);
		setReminder(r);
	}, [show])

	if (!reminder) {
		return null;
	}

	const onSubmit = (e) => {
		e.preventDefault();
		reminder.interval = parseInt(`${reminder.interval}`);
		const { start, end, interval } = reminder;
		api.updateReminder({
			type: 'break',
			interval,
			startAt: start,
			endAt: end,
		})
			.then((r) => {
				localStorage.setItem(
					`reminder-break`,
					JSON.stringify(reminder)
				);
				if (reminder.enabled) {
					createReminders({
						type: 'break',
						start,
						end,
						interval,
					});
				} else {
					cancelReminders('break');
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

						<div className={styles['title']}>Break</div>
						<div></div>
					</nav>
					<main>
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
													setStart(e.target.value);
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
													setInterval(e.target.value);
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
					</main>
					<footer>
						<button type={'submit'}>Save</button>
					</footer>
				</form>
			</section>
		</div>
	);
}
