import * as axios from 'axios';
import moment from 'moment';

export class Api {
	token = '';
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
			const { auth_token } = data;
			return auth_token;
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
				},
			});
			const { reservation } = data;
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
