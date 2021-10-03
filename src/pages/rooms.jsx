import React from 'react';
import styles from './rooms.module.css';
import { BottomBar } from '../components/BottomBar'
import { Link, useParams } from 'react-router-dom';
const rooms = [
	{
		id: 1,
		name: 'Room 1',
		description: 'description room 1',
		startTime: '9:00AM',
		endTime: '7:00PM',
	},
	{
		id: 2,
		name: 'Room 2',
		description: 'description room 3',
		startTime: '9:00AM',
		endTime: '7:00PM',
	},
	{
		id: 3,
		name: 'Room 3',
		description: 'description room 3',
		startTime: '9:00AM',
		endTime: '7:00PM',
	},
	{
		id: 4,
		name: 'Room 4',
		description: 'description room 4',
		startTime: '9:00AM',
		endTime: '7:00PM',
	}
];
export default function Rooms() {
	return (
		<div className={['view', styles['rooms']].join(' ')}>
			<header>
				Room
			</header>
			<main>
				{rooms.map((room, i) => <Room key={i} {...room} />)}
			</main>
			<BottomBar selected={'room'} />
		</div>
	);
}

function Room({ id, name, description, startTime, endTime }) {
	return <div className={styles['room']}>
		<Link to={`/rooms/${id}`}>
			<h2>{name}</h2>
			{description ? <h3>{description}</h3> : null}
			<span>{`${startTime} - ${endTime}`}</span>
		</Link>
	</div>
}

export function SelectedRoom() {
	const { id } = useParams();
	const times = [{
		id: 1,
		time: '9:00AM',
	}, {
		id: 2,
		time: '9:30AM',
	}, {
		id: 3,
		time: '10:00AM',
	}, {
		id: 4,
		time: '10:30AM',
	}]
	const { name } = rooms.filter(r => `${r.id}` === `${id}`)[0];
	return <div className={styles['selected-room']}>
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
			{times.map((time, i) => <Time {...time} />)}
		</main>
	</div>
}

function Time({ id, time }) {
	return <div className={styles['time']}>
		<span onClick={() => {
			console.log(`I click the time with id: ${id} and the time: ${time}`)
		}}>
			{time}
		</span>
	</div>
}