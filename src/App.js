import React, { Component, useContext } from 'react';
import moment from 'moment';
import styles from './app.module.css';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { AppContext } from './services/AppContext';

import Home from './pages/home';
import Rooms, { SelectedRoom } from './pages/rooms';
import Sound from './pages/sounds';
import Meditations from './pages/mediations';
import Settings from './pages/settings';

import { SignIn, SignUp } from './pages/auth';
import { Api } from './services/Api';
const host = 'https://halcyon-next.vercel.app/api';

export class App extends Component {
	state = {
		api: new Api(host),
		reminders: [],
		goals: null,
		isNotificationSupported: !!(
			window.Notification ||
			window.webkitNotifications ||
			navigator.mozNotification
		),
		notification: null,
	};

	componentDidMount() {
		const { api } = this.state;
		if (localStorage.getItem('token')) {
			api.setToken(localStorage.getItem('token'));
			this.getMe(api)
				.then((me) => {
					this.setState({ me });
					return this.loadReminders();
				})
				.then(() => {
					return this.loadGoals();
				})
				.then(() => {
					console.log(`Load successfully`);
				})
				.catch(console.error);
		}
	}

	validateToken = () => {
		if (!localStorage.getItem('token')) {
			window.location = '/signin';
		}
	};

	getMe = async (api) => {
		return await api.getMe();
	};

	loadReminders = async () => {
		if (!localStorage.getItem('reminder-water')) {
			localStorage.setItem(
				'reminder-water',
				JSON.stringify({
					enabled: false,
				})
			);
		}
		if (!localStorage.getItem('reminder-break')) {
			localStorage.setItem(
				'reminder-break',
				JSON.stringify({
					enabled: false,
				})
			);
		}
		const { api } = this.state;
		const reminders = await api.getReminders();
		for (const reminder of reminders) {
			const { startAt, endAt, type, interval } = reminder;
			let cachedReminder = JSON.parse(
				localStorage.getItem(`reminder-${type}`)
			);
			cachedReminder = {
				...cachedReminder,
				...{
					type,
					start: startAt,
					end: endAt,
					interval,
				},
			};

			localStorage.setItem(
				`reminder-${type}`,
				JSON.stringify(cachedReminder)
			);

			if (cachedReminder.enabled) {
				await this.createReminders({
					type,
					start: startAt,
					end: endAt,
					interval,
				});
			}
		}
	};

	loadGoals = async () => {
		const { api } = this.state;
		const goals = await api.getGoals();
		this.setState({
			goals,
		});
	};

	addGoal = (goal) => {
		const { goals } = this.state;
		goals.push(goal);
		this.setState({ goals });
	};

	updateGoal = (goal) => {
		const { goals } = this.state;
		this.setState({
			goals: goals.map((g) => (`${goal.id}` === `${g.id}` ? goal : g)),
		});
	};

	deleteGoal = (id) => {
		const { goals } = this.state;
		this.setState({
			goals: goals.filter((g) => `${id}` !== `${g.id}`),
		});
	};

	onCancelNotification = (category) => {
		const { api } = this.state;
		api.sendEvent({
			state: 'cancel',
			category,
		})
			.then(() => {
				console.log(`Cancel the event of type: ${category}`);
			})
			.catch(console.error)
			.finally(() => {
				this.setState({ notification: null });
			});
	};

	onCompleteNotification = (category) => {
		const { api } = this.state;
		api.sendEvent({
			state: 'completed',
			category,
		})
			.then(() => {
				console.log(`Complete the event of type: ${category}`);
			})
			.catch(console.error)
			.finally(() => {
				this.setState({ notification: null });
			});
	};

	createReminders = async ({ type, start, end, interval }) => {
		let { reminders, isNotificationSupported } = this.state;
		reminders = this.cancelReminders(type);
		const now = moment().format('HH:mm');
		const startTimeMoment = moment(now, 'HH:mm');
		let times = this.getTimeInRage(start, end, interval);
		times = times.filter((time) => {
			return moment(time, 'HH:mm').isAfter(
				moment(now, 'HH:mm'),
				'minute'
			);
		});

		if (!times.length) {
			return;
		}

		for (const time of times) {
			const duration = moment
				.duration(moment(time, 'HH:mm').diff(startTimeMoment))
				.asSeconds();
			const timeout = setTimeout(() => {
				let body =
					type === 'water'
						? 'Did you drink water?'
						: 'Did you take a break?';
				const category = type;
				if (
					isNotificationSupported &&
					Notification?.permission === 'granted'
				) {
					const title = `Reminder: ${category}`;
					const notification = new Notification(title, {
						body,
						vibrate: true,
						requireInteraction: true,
					});
					notification.onclick = () => {
						console.log(`I click notification`);
						this.setState({
							notification: {
								type,
								message: body,
							},
						});
						notification.close();
					};
					notification.onshow = () => {
						console.log(`The notification was showed`);
					};
					return;
				}

				this.setState({
					notification: {
						type,
						message: body,
					},
				});
			}, duration * 1000);

			reminders.push({
				type,
				timeout,
				time,
			});
		}

		console.log(`Reminders`, reminders);

		this.setState({ reminders });
	};

	getTimeInRage = (start, end, interval) => {
		let startTimeMoment = moment(start, 'HH:mm');
		const endTimeMoment = moment(end, 'HH:mm');

		const times = [];
		while (
			endTimeMoment.isAfter(startTimeMoment) &&
			moment.duration(endTimeMoment.diff(startTimeMoment)).asMinutes()
		) {
			const slotTime = startTimeMoment.format('HH:mm');
			times.push(slotTime);
			startTimeMoment = startTimeMoment.add(interval, 'm');
		}

		times.push(endTimeMoment.format('HH:mm'));

		return times;
	};

	cancelReminders = (type) => {
		const reminders = [];
		if (!this.state.reminders.length) {
			this.setState({ reminders });
			return reminders;
		}

		for (const reminder of this.state.reminders) {
			const { timeout } = reminder;
			if (reminder.type === type) {
				clearTimeout(timeout);
				continue;
			}

			reminders.push(reminder);
		}

		this.setState({ reminders });
		return reminders;
	};

	componentWillUnmount() {
		const { reminders } = this.state;
		for (const reminder of reminders) {
			const { timeout } = reminder;
			clearTimeout(timeout);
		}
	}

	render() {
		const { api, me, isNotificationSupported, notification, goals } =
			this.state;
		return (
			<AppContext.Provider
				value={{
					api,
					me,
					isNotificationSupported,
					validateToken: this.validateToken,
					isAuthenticated: localStorage.getItem('token'),
					createReminders: this.createReminders,
					cancelReminders: this.cancelReminders,
					loadGoals: this.loadGoals,
					goals,
					addGoal: this.addGoal,
					updateGoal: this.updateGoal,
					deleteGoal: this.deleteGoal
				}}
			>
				<main className={styles['app']}>
					<Router>
						<Switch>
							<Route exact path="/rooms" component={Rooms} />
							<Route
								exact
								path="/rooms/:id"
								component={SelectedRoom}
							/>
							<Route exact path="/sounds" component={Sound} />
							<Route
								exact
								path="/meditations"
								component={Meditations}
							/>
							<Route
								exact
								path="/settings"
								component={Settings}
							/>
							<Route exact path="/signup" component={SignUp} />
							<Route exact path="/signin" component={SignIn} />
							<Route exact path="/" component={Home} />
							<Redirect to="/" />
						</Switch>
					</Router>
				</main>
				<AppNotification
					data={notification}
					onComplete={this.onCompleteNotification}
					onCancel={this.onCancelNotification}
				/>
			</AppContext.Provider>
		);
	}
}

function AppNotification({ data, onComplete, onCancel }) {
	let show = !!data;
	const classNames = [styles['notification-container']];
	if (show) {
		classNames.push(styles['show']);
	}

	let type, message;
	if (data) {
		type = data.type;
		message = data.message;
	}

	return (
		<div className={classNames.join(' ')}>
			<div className={styles['notification']}>
				<div>
					<h2>{type}</h2>
					<p>{message}</p>
				</div>
				<section>
					<button
						onClick={() => {
							if (type) {
								onCancel(type);
							}
						}}
					>
						Cancel
					</button>
					<button
						onClick={() => {
							if (type) {
								onComplete(type);
							}
						}}
					>
						Confirm
					</button>
				</section>
			</div>
		</div>
	);
}
