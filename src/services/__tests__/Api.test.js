const { Api } = require('../Api');
jest.setTimeout(30000);
const host = 'https://halcyon-next.vercel.app/api';
const credentials = {
	email: 'viyeta@gmail.com',
	password: 'password',
};

/*before(async () => {
	
    console.log(`Token`, token)
    jest.resetAllMocks();
});*/

test('Should login user', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	expect(token.authToken).toBeDefined();
});

test('Should get employee information', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	expect(token.authToken).toBeDefined();
	api.setToken(token.authToken);
	const me = await api.getMe();
	expect(me).toBeDefined();
});

test('Should get meditation rooms', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const rooms = await api.getRooms();
	expect(token).toBeDefined();
	expect(rooms.length).toBeGreaterThan(0);
});

test('Should get meditation room by id', async () => {
	const id = '700359396337395473';
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const room = await api.getRoom(id);
	expect(room).toBeDefined();
	expect(room.id).toBe(id);
});

test.skip('Should Book meditation room', async () => {
	const roomId = '700359396337395473';
	const time = '14:30';
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const success = await api.addReservation({
		roomId,
		time,
	});
	expect(success).toBe(true);
});

test.skip('Get reservation from employee', async () => {
	const roomId = '700359396337395473';
	const time = '14:30';
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const success = await api.addReservation({
		roomId,
		time,
	});
	expect(success).toBe(true);
	const reservation = await api.getReservation();
	expect(reservation).toBeDefined();
	expect(typeof reservation).toBe('object');
	expect(reservation.startTime).toBe(time);
});

test.skip('Should cancel a booked reservation', async () => {
	const roomId = '700359396337395473';
	const time = '14:30';
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	let success = await api.addReservation({
		roomId,
		time,
	});
	expect(success).toBe(true);
	success = await api.cancelReservation({roomId});
	expect(success).toBe(true);
});

test('Should get sounds library', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const sounds = await api.getSounds();
	expect(sounds).toBeDefined();
	expect(sounds.length).toBeGreaterThan(0);
});

test('Should get sounds library filter by type', async () => {
	const type = 'sound';
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const sounds = await api.getSoundsByType(type);
	expect(sounds).toBeDefined();
	for(const sound of sounds) {
		expect(sound.type).toBe(type);
	}
});

test('Should get sound by id', async () => {
	const id = '701843824305710865';
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const sound = await api.getSound(id);
	expect(sound).toBeDefined();
	expect(sound.id).toBe(id);
});

test('Should get employee reminders', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const reminders = await api.getReminders();
	expect(reminders).toBeDefined();
	expect(reminders.length).toBe(2);
	const me = await api.getMe();
	for(const reminder of reminders) {
		expect(reminder.employeeId).toBe(me.id);
	}
});

test.skip('Should update an employee reminder', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const data = {
		type: "water",
		interval: 1,
		startAt: "09:00",
		endAt: "09:15"
	}
	const me = await api.getMe();
	const reminder = await api.updateReminder(data);
	expect(reminder).toBeDefined();
	expect(reminder.employeeId).toBe(me.id);
	expect(reminder.type).toBe(data.type);
	expect(reminder.interval).toBe(data.interval);
	expect(reminder.startAt).toBe(data.startAt);
	expect(reminder.endAt).toBe(data.endAt);
});