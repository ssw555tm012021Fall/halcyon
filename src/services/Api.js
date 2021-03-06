import * as axios from 'axios';
import moment from 'moment';

export class Api {
	token = '';
	timezone = '';
	constructor(host) {
		this.host = host;
	}

	setToken = (token) => {
		this.token = token;
	};

	signUp = async ({ email, password }) => {
		const url = `${this.host}/auth/register`;
		try {
			const { data } = await axios.post(url, {
				email,
				password,
			});
			return {
				success: true,
			};
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	signIn = async ({ email, password }) => {
		const url = `${this.host}/auth/login`;
		try {
			const { data } = await axios.post(url, {
				email,
				password,
			});
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	getMe = async () => {
		const url = `${this.host}/me`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`,
				},
			});

			let { employee } = data;
			return employee;
		} catch (e) {
			if (e.response?.data?.message) {
				if(e.response?.data.message === 'Expired token') {
					localStorage.removeItem('token');
					window.location = '/';
				}
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};
	// Rooms
	getRooms = async () => {
		const url = `${this.host}/rooms`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`,
					'x-time-zone': this.timezone,
				},
			});

			let { rooms } = data;
			if (rooms) {
				const now = moment(new Date());
				rooms = rooms.map((room) => {
					room.availableTimes = room.availableTimes.filter((time) => {
						const timeMoment = moment(time, 'HH:mm');
						return timeMoment.isAfter(now);
					});
					return room;
				});
			}
			return rooms;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	getRoom = async (id) => {
		const url = `${this.host}/rooms/${id}`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`,
					'x-time-zone': this.timezone,
				},
			});
			const { room } = data;
			const now = moment(new Date());
			if (room && room.availableTimes) {
				room.availableTimes = room.availableTimes.filter((time) => {
					const timeMoment = moment(time, 'HH:mm');
					return timeMoment.isAfter(now);
				});
			}
			return room;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};
	addReservation = async ({ roomId, time }) => {
		const url = `${this.host}/rooms/${roomId}/book`;
		const now = moment(new Date());
		const timeMoment = moment(time, 'HH:mm');
		if (!timeMoment.isAfter(now)) {
			throw new Error(`That's not a valid time`);
		}

		try {
			const { data } = await axios.post(
				url,
				{
					time,
				},
				{
					headers: {
						authorization: `Bearer ${this.token}`,
						'x-time-zone': this.timezone,
					},
				}
			);
			const { status } = data;
			return status === 'success';
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};
	updateReservation = async ({ roomId, time }) => {
		const url = `${this.host}/rooms/${roomId}/update`;
		const now = moment(new Date());
		const timeMoment = moment(time, 'HH:mm');
		if (!timeMoment.isAfter(now)) {
			throw new Error(`That's not a valid time`);
		}

		try {
			const { data } = await axios.post(
				url,
				{
					time,
				},
				{
					headers: {
						authorization: `Bearer ${this.token}`,
						'x-time-zone': this.timezone,
					},
				}
			);
			const { status } = data;
			return status === 'success';
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};
	getReservation = async () => {
		const url = `${this.host}/reservation`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`,
					'x-time-zone': this.timezone,
				},
			});
			const { reservation } = data;
			if (reservation) {
				const now = moment(new Date());
				const startMoment = moment(reservation.startTime, 'HH:mm');
				if (now.isAfter(startMoment)) {
					return null;
				}
			}
			return reservation;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};
	cancelReservation = async ({ roomId }) => {
		const url = `${this.host}/rooms/${roomId}/cancel`;

		try {
			const { data } = await axios.post(
				url,
				{},
				{
					headers: {
						authorization: `Bearer ${this.token}`,
						'x-time-zone': this.timezone,
					},
				}
			);
			const { status } = data;
			return status === 'success';
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	// Sounds
	getSounds = async () => {
		const url = `${this.host}/sounds`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`,
				},
			});

			return data?.sounds;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	getSoundsByType = async (type) => {
		const url = `${this.host}/sounds`;
		try {
			const { data } = await axios.get(url, {
				params: { type },
				headers: {
					authorization: `Bearer ${this.token}`,
				},
			});

			return data?.sounds;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	getSound = async (id) => {
		const url = `${this.host}/sounds/${id}`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`,
				},
			});

			return data?.sound;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	getReminders = async () => {
		const url = `${this.host}/reminders`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`,
				},
			});

			return data?.reminders;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	updateReminder = async ({type, interval, startAt, endAt}) => {
		const url = `${this.host}/reminders`;
		const body = {
			type,
			interval,
			startAt,
			endAt
		};
		try {
			const { data } = await axios.put(url, body, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { reminder } = data;
			return reminder;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	// Events
	sendEvent = async ({ state, category }) => {
		const url = `${this.host}/events`;

		const body = {
			state,
			category,
		};

		try {
			const { data } = await axios.post(url, body, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { event } = data;
			return event;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	// Goals
	getGoals = async () => {
		const url = `${this.host}/goals`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { goals } = data;
			return goals;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	getGoal = async (id) => {
		const url = `${this.host}/goals/${id}`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { goal } = data;
			return goal;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	addGoal = async ({target, category, frequency}) => {
		const url = `${this.host}/goals`;
		const body = {
			target,
			category,
			frequency
		};
		try {
			const { data } = await axios.post(url, body, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { goal } = data;
			return goal;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	updateGoal = async ({id, target, frequency}) => {
		const url = `${this.host}/goals/${id}`;
		const body = {
			target,
			frequency
		};
		try {
			const { data } = await axios.put(url, body, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { goal } = data;
			return goal;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	deleteGoal = async (id) => {
		const url = `${this.host}/goals/${id}`;
		try {
			const { data } = await axios.delete(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { id } = data;
			return id;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	getMoodActivities = async () => {
		const url = `${this.host}/moods/activities`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { activities } = data;
			return activities;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	getPersonalityQuestions = async () => {
		const url = `${this.host}/personality/questions`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { questions } = data;
			return questions;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	setPersonality = async (personality) => {
		const url = `${this.host}/me/personality`;
		const body = {
			personality
		};
		try {
			const { data } = await axios.put(url, body, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { personality } = data;
			return personality;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	setDepression = async (isDepressed) => {
		const url = `${this.host}/me/depression`;
		const body = {
			isDepressed
		};
		try {
			const { data } = await axios.put(url, body, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { isDepressed } = data;
			return isDepressed;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	getGoalsAchievements = async () => {
		const url = `${this.host}/achievements/goals`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { goals } = data;
			return goals;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	getAwardsAchivements = async () => {
		const url = `${this.host}/achievements/awards`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { awards } = data;
			return awards;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	generateAuthenticationOptions = async ({email, password}) => {
		const url = `${this.host}/webauthn/generate-authentication-options`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Basic ${btoa(`${email}:${password}`)}`
				},
			});
			const { options } = data;
			return options;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	generateRegistrationOptions = async () => {
		const url = `${this.host}/webauthn/generate-registration-options`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { options } = data;
			return options;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	verifyAuthentication = async ({email, password, assestation}) => {
		const url = `${this.host}/webauthn/verify-authentication`;
		try {
			const { data } = await axios.post(url, assestation, {
				headers: {
					authorization: `Basic ${btoa(`${email}:${password}`)}`
				},
			});
			const { authToken, expiredAt } = data;
			return {
				authToken,
				expiredAt,
			};
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	verifyRegistration = async ({attestation}) => {
		const url = `${this.host}/webauthn/verify-registration`;
		try {
			const { data } = await axios.post(url, attestation, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { verified } = data;
			return {
				verified,
			};
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	setMFA = async ({isEnabled}) => {
		const url = `${this.host}/me/mfa`;
		const body = {
			isMFAEnabled: isEnabled 
		};
		try {
			const { data } = await axios.put(url, body, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { isEnabled } = data;
			return isEnabled;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	getAuthenticators = async () => {
		const url = `${this.host}/authenticators`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { authenticators } = data;
			return authenticators;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	updateAuthenticator = async ({id, isEnabled}) => {
		const url = `${this.host}/authenticators/${id}`;
		const body = {
			isEnabled
		};
		try {
			const { data } = await axios.put(url, body, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { isEnabled } = data;
			return isEnabled;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	deleteAuthenticator = async ({id}) => {
		console.log(`Id to : ${id}`)
		const url = `${this.host}/authenticators/${id}`;
		try {
			const { data } = await axios.delete(url, {
				headers: {
					authorization: `Bearer ${this.token}`
				},
			});
			const { status } = data;
			return status === 'success';
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}
}
