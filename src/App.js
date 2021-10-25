import React, { Component } from 'react';
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
		isNotificationSupported: !!(
			window.Notification ||
			window.webkitNotifications ||
			navigator.mozNotification
		)
	};

	componentDidMount() {
		const { api } = this.state;
		if (localStorage.getItem('token')) {
			api.setToken(localStorage.getItem('token'));
			this.getMe(api)
				.then((me) => {
					this.setState({ me });
					return this.prepareReminders();
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

	prepareReminders = async () => {
		if (!localStorage.getItem('reminder-water')) {
			localStorage.setItem(
				'reminder-water',
				JSON.stringify({
					enabled: true,
				})
			);
		}
		if (!localStorage.getItem('reminder-break')) {
			localStorage.setItem(
				'reminder-break',
				JSON.stringify({
					enabled: true,
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

			console.log(`Cache ${type}`, cachedReminder);

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

	createReminders = async ({ type, start, end, interval }) => {
		let { reminders, api, isNotificationSupported } = this.state;
		reminders = this.cancelReminders(type);
		const now = moment().format('HH:mm');
		const startTimeMoment = moment(now, 'HH:mm');
		let times = this.getTimeInRage(start, end, interval);
		times = times.filter(
			(time) => {
				return moment(time, 'HH:mm').isAfter(
					moment(now, 'HH:mm'),
					'minute'
				);
			}
		);

		if(!times.length) {
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
					const notification = new Notification('Reminder', {
						body,
						vibrate: true,
					});
					notification.onclick = () => {
						
						if (confirm(body)) {
							api.sendEvent({
								state: 'completed',
								category,
							}).then(()=> {
								console.log(`Complete the event of type: ${type}`)
							}).catch(console.error)
						} else {
							api.sendEvent({
								state: 'cancel',
								category,
							}).then(()=> {
								console.log(`Cancel the event of type: ${type}`)
							}).catch(console.error)
						}
					};
					return;
				}

				if (confirm(body)) {
					api.sendEvent({
						state: 'completed',
						category,
					}).then(()=> {
						console.log(`Complete the event of type: ${type}`)
					}).catch(console.error)
				} else {
					api.sendEvent({
						state: 'cancel',
						category,
					}).then(()=> {
						console.log(`Cancel the event of type: ${type}`)
					}).catch(console.error)
				}
			}, duration * 1000);

			reminders.push({
				type,
				timeout,
				time
			});
		}

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
		if(!this.state.reminders.length) {
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

	render() {
		const { api, me, isNotificationSupported } = this.state;
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
			</AppContext.Provider>
		);
	}
}