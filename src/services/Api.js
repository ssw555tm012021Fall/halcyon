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
			const { authToken, expiredAt } = data;
			return {
				authToken,
				expiredAt
			};
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
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	};

	getRooms = async () => {
		const url = `${this.host}/rooms`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`,
					'x-time-zone': this.timezone
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
					'x-time-zone': this.timezone
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

	addReservation = async ({roomId, time}) => {
		const url = `${this.host}/rooms/${roomId}/book`;
		const now = moment(new Date());
		const timeMoment = moment(time, 'HH:mm');
		if(!timeMoment.isAfter(now)) {
			throw new Error(`That's not a valid time`)
		}
		
		try {
			const { data } = await axios.post(url, {
				time,
			}, {
				headers: {
					authorization: `Bearer ${this.token}`,
					'x-time-zone': this.timezone
				},
			});
			const {status} = data;
			return status === 'success';
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	updateReservation = async ({roomId, time}) => {
		const url = `${this.host}/rooms/${roomId}/update`;
		const now = moment(new Date());
		const timeMoment = moment(time, 'HH:mm');
		if(!timeMoment.isAfter(now)) {
			throw new Error(`That's not a valid time`)
		}
		
		try {
			const { data } = await axios.post(url, {
				time,
			}, {
				headers: {
					authorization: `Bearer ${this.token}`,
					'x-time-zone': this.timezone
				},
			});
			const {status} = data;
			return status === 'success';
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}

	getReservation = async () => {
		const url = `${this.host}/reservation`;
		try {
			const { data } = await axios.get(url, {
				headers: {
					authorization: `Bearer ${this.token}`,
					'x-time-zone': this.timezone
				},
			});
			const { reservation } = data;
			if(reservation) {
				const now = moment(new Date());
				const startMoment = moment(reservation.startTime, 'HH:mm');
				if(now.isAfter(startMoment)) {
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
	}

	cancelReservation = async ({roomId}) => {
		const url = `${this.host}/rooms/${roomId}/cancel`;
		
		try {
			const { data } = await axios.post(url, {}, {
				headers: {
					authorization: `Bearer ${this.token}`,
					'x-time-zone': this.timezone
				},
			});
			const {status} = data;
			return status === 'success';
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}

			throw new Error(e.message);
		}
	}
}
