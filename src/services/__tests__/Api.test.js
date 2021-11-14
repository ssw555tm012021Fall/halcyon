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

test.skip('Should book meditation room', async () => {
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
	};
	const me = await api.getMe();
	const reminder = await api.updateReminder(data);
	expect(reminder).toBeDefined();
	expect(reminder.employeeId).toBe(me.id);
	expect(reminder.type).toBe(data.type);
	expect(reminder.interval).toBe(data.interval);
	expect(reminder.startAt).toBe(data.startAt);
	expect(reminder.endAt).toBe(data.endAt);
});

test.skip('Should add an event', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const category = 'water';
	const state = 'completed';
	const event = await api.sendEvent({
		category,
		state
	});
	expect(event).toBeDefined();
	expect(event.category).toBe(category);
	expect(event.state).toBe(state);
});

test.skip('Should get a list of all the goals', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const me = await api.getMe();
	const goals = await api.getGoals();
	expect(goals).toBeDefined();
	for(const goal of goals) {
		expect(goal.employeeId).toBe(me.id);
	}
});

test.skip('Should get a goal by its id', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const id = '705228672139624449';
	const goal = await api.getGoal(id);
	expect(goal).toBeDefined();
	expect(goal.id).toBe(id);
});

test.skip('Should add a new goal', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const target = 5;
	const category = 'water';
	const frequency = 'daily';
	const goal = await api.addGoal({
		target,
		category,
		frequency
	});
	expect(goal).toBeDefined();
	expect(goal.target).toBe(target);
	expect(goal.category).toBe(category);
	expect(goal.frequency).toBe(frequency);
});

test.skip('Should update an existing goal', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const id = '705228672139624449';
	const target = 5;
	const frequency = 'yearly';
	const goal = await api.updateGoal({
		id,
		target,
		frequency
	});
	expect(goal).toBeDefined();
	expect(goal.id).toBe(id);
	expect(goal.target).toBe(target);
	expect(goal.frequency).toBe(frequency);
});

test.skip('Should delete an existing goal', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const id = '705499069443047425';
	const response = await api.deleteGoal(id);
	expect(response).toBeDefined();
	expect(response).toBe(id);
});

test('Should get mood activities', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const activities = await api.getMoodActivities();
	expect(activities).toBeDefined();
	for(const activity of activities) {
		expect(activity.inputEmotion).toBeDefined();
		expect(activity.outputEmotion).toBeDefined();
		expect(activity.activity).toBeDefined();
	}
});

test('Should get the personality questions', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const questions = await api.getPersonalityQuestions();
	expect(questions).toBeDefined();
	expect(questions.length).toBeGreaterThan(0);
	for(const question of questions) {
		expect(question.content).toBeDefined();
		expect(question.options).toBeDefined();
		expect(question.options.length).toBe(2);
		for(const option of question.options) {
			expect(option.content).toBeDefined();
			expect(option.value).toBeDefined();
			expect(option.value.length).toBe(1);
		}
	}
});

test('Should get goals achievements', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const goals = await api.getGoalsAchievements();
	expect(goals).toBeDefined();
});

test('Should get awards achievements', async () => {
	const api = new Api(host);
	const token = await api.signIn(credentials);
	api.setToken(token.authToken);
	const awards = await api.getAwardsAchivements();
	expect(awards).toBeDefined();
	expect(awards.length).toBeGreaterThan(0);
	for(const award of awards) {
		expect(award.title).toBeDefined();
		expect(award.category).toBeDefined();
		expect(award.frequency).toBeDefined();
	}
});