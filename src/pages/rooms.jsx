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
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}

	useEffect(() => {
		api.getRooms()
			.then((result) => {
				setRooms(result);
			})
			.catch(console.error);
	}, []);

	return (
		<div className={['view', styles['rooms']].join(' ')}>
			<header>Room</header>
			<main>
				{rooms.map((room) => (
					<Room key={room.id} {...room} />
				))}
			</main>
			<BottomBar selected={'room'} />
		</div>
	);
}

function Room({ id, name, description, startAvailableTime, endAvailableTime }) {
	return (
		<div className={styles['room']}>
			<Link to={`/rooms/${id}`}>
				<h2>{name}</h2>
				{description ? <h3>{description}</h3> : null}
				<span>{`${moment(startAvailableTime, 'HH:mm').format(
					'hh:mm a'
				)} - ${moment(endAvailableTime, 'HH:mm').format(
					'hh:mm a'
				)}`}</span>
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
	useEffect(()=> {
		api.getRoom(id)
		.then((result) => {
			setRoom(result);
		})
		.catch(console.error);
	}, [])

	if(!room) {
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
					<Time key={i} time={time} />
				))}
			</main>
		</div>
	);
}

function Time({ time }) {
	return (
		<div className={styles['time']}>
			<span
				onClick={() => {
					console.log(
						`I click the time: ${time}`
					);
				}}
			>
				{time}
			</span>
		</div>
	);
}
