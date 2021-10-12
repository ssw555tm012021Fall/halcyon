import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import styles from './rooms.module.css';
import { BottomBar } from '../components/BottomBar';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';
export default function Rooms() {
	const { isAuthenticated, api } = useContext(AppContext);
	const [rooms, setRooms] = useState([]);
	const [reservation, setReservation] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}

	useEffect(() => {
		setIsLoading(true);
		api.getReservation()
			.then((result) => {
				setReservation(result);
				return api.getRooms();
			})
			.then((result) => {
				setRooms(result);
				setIsLoading(false);
			})
			.catch((e) => {
				console.error(e);
				setIsLoading(false);
			});
	}, []);

	let component = <Loading />;
	if (!isLoading) {
		component = rooms
			.filter((room) => !!room.availableTimes.length)
			.map((room) => <Room key={room.id} {...room} />);
		if (reservation) {
			component = <Reservation {...reservation} />;
		}
	}

	const classes = ['view', styles['rooms']];
	if (reservation) {
		classes.push(styles['reservation-container']);
	}

	return (
		<div className={classes.join(' ')}>
			<header>Room</header>
			<main>{component}</main>
			<BottomBar selected={'room'} />
		</div>
	);
}

function Room({
	id,
	name,
	description,
	timeInterval,
	startAvailableTime,
	endAvailableTime,
}) {
	return (
		<div className={styles['room']}>
			<Link to={`/rooms/${id}`}>
				<div>
					<h2>{name}</h2>
					{description ? <h3>{description}</h3> : null}
					<h4>
						<strong>Interval:</strong> {timeInterval} min
					</h4>
					<span>{`${moment(startAvailableTime, 'HH:mm').format(
						'hh:mm a'
					)} - ${moment(endAvailableTime, 'HH:mm').format(
						'hh:mm a'
					)}`}</span>
				</div>
				<picture></picture>
			</Link>
		</div>
	);
}

export function SelectedRoom() {
	const { id } = useParams();
	const { isAuthenticated, api } = useContext(AppContext);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}
	const [room, setRoom] = useState(null);
	useEffect(() => {
		api.getRoom(id)
			.then((result) => {
				setRoom(result);
			})
			.catch(console.error);
	}, []);

	if (!room) {
		return null;
	}
	const { name, availableTimes } = room;
	return (
		<div className={styles['selected-room']}>
			<header>
				<div>
					<Link to={'/rooms'}>
						<div className={styles['back']}></div>
					</Link>
				</div>
				<div>{name}</div>
				<div></div>
			</header>
			<main>
				{availableTimes.map((time, i) => (
					<Time key={i} time={time} roomId={room.id} />
				))}
			</main>
		</div>
	);
}

function Time({ time, roomId }) {
	const { api } = useContext(AppContext);
	const message = `Are you sure you want to create a reservation to: ${moment(
		time,
		'HH:mm'
	).format('hh:mm A')}`;
	const onClick = () => {
		if (confirm(message)) {
			api.addReservation({ roomId, time })
				.then(() => {
					window.location = '/rooms';
				})
				.catch(alert);
		}
	};
	return (
		<div className={styles['time']}>
			<span onClick={onClick}>{time}</span>
		</div>
	);
}

function Loading() {
	return <div className={styles['loading']}>Loading</div>;
}

function Reservation({ id, date, startTime, endTime, meditationRoomId }) {
	const { api, me } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);
	const [room, setRoom] = useState(null);
	const [mode, setMode] = useState('reservation');
	useEffect(() => {
		setIsLoading(true);
		api.getRoom(meditationRoomId)
			.then((result) => {
				setRoom(result);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	if (isLoading) {
		return <Loading />;
	}
	const onCancelClick = () => {
		if (confirm('Are you sure you want to cancel the reservation?')) {
			api.cancelReservation({ roomId: meditationRoomId })
				.then(() => {
					window.location = '/rooms';
				})
				.catch(alert);
		}
	};
	let component = (
		<section>
			<h4>{room.name}</h4>
			<p>{room.description}</p>

			<small> {moment(date).format('MMMM Do YYYY')}</small>
			<small>
				{`${moment(startTime, 'HH:mm').format('hh:mm a')} - ${moment(
					endTime,
					'HH:mm'
				).format('hh:mm a')}`}
			</small>
			<footer>
				<button
					className={styles['cancel-btn']}
					onClick={onCancelClick}
				>
					Cancel
				</button>
				{room.availableTimes.length ? (
					<button
						className={styles['update-btn']}
						onClick={() => {
							setMode('dates');
						}}
					>
						Change
					</button>
				) : null}
			</footer>
		</section>
	);
	const onChangeDate = (time) => {
		const message = `Are you sure you want to change your reservation to: ${moment(
			time,
			'HH:mm'
		).format('hh:mm A')}`;
		if (confirm(message)) {
			api.updateReservation({ roomId: meditationRoomId, time })
				.then(() => {
					window.location = '/rooms';
				})
				.catch(alert);
		}
	};
	console.log(room.availableTimes);
	if (mode === 'dates') {
		component = (
			<section className={styles['dates']}>
				<nav>
					<button
						onClick={() => {
							setMode('reservation');
						}}
					>{`< Back`}</button>
				</nav>
				<div className={styles['times']}>
					{room.availableTimes.map((time) => {
						return (
							<div key={time}>
								<span
									onClick={() => {
										onChangeDate(time);
									}}
								>
									{moment(time, 'HH:mm').format('hh:mm A')}
								</span>
							</div>
						);
					})}
				</div>
			</section>
		);
	}
	return (
		<div className={styles['reservation']}>
			<h2>Hello {me.firstName}</h2>
			<h3>Next Appointment</h3>
			{component}
		</div>
	);
}
