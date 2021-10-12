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

test('Test login', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	expect(token.authToken).toBeDefined();
});

test('Get me', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	expect(token.authToken).toBeDefined();
	api.setToken(token.authToken);
	const me = await api.getMe();
	expect(me).toBeDefined();
});

test('Get meditation rooms', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const rooms = await api.getRooms();
	expect(token).toBeDefined();
	expect(rooms.length).toBeGreaterThan(0);
});

test('Get meditation room by id', async () => {
	const id = '700359396337395473';
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const room = await api.getRoom(id);
	expect(room).toBeDefined();
	expect(room.id).toBe(id);
});

test.skip('Book meditation room', async () => {
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

test.skip('Cancel a booked reservation', async () => {
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
