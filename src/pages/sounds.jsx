import React, { useContext, Component, useState } from 'react';
import styles from './sounds.module.css';
import { BottomBar } from '../components/BottomBar';
import { Link } from 'react-router-dom';
import { BigPlayer } from '../components/Player';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';
import CircularSlider from '@fseehawer/react-circular-slider';

export default function Sounds() {
	const [isPlayerDisplayed, setIsPlayerDisplayed] = useState(true);
	const { isAuthenticated } = useContext(AppContext);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}
	return (
		<div className={['view', styles['music']].join(' ')}>
			<header>
				<button
					onClick={() => {
						setIsPlayerDisplayed(true);
					}}
				>
					Music
				</button>
			</header>
			<main>
				<Song />
			</main>
			<BottomBar selected={'music'} />
			<Player
				show={isPlayerDisplayed}
				onClose={() => {
					setIsPlayerDisplayed(false);
				}}
			/>
		</div>
	);
}

class Player extends Component {
	state = {
		isStarted: false,
		isPlaying: false,
		time: 5,
		remainingTime: 5,
		dataIndex: 5,
		times: [],
	};
	componentDidMount() {
		const times = [];
		for (let i = 0; i < 60; i++) {
			times.push(i);
		}
		this.setState({ times });
	}
	onClose = () => {
		this.props.onClose();
	};
	onStart = () => {
		const { time } = this.state;
		const remainingTime = time * 60;
		this.setState({
			remainingTime,
			isStarted: true,
		});
		console.log(`It started`);

		this.startInterval(remainingTime);
	};

	startInterval = (remainingTime) => {
		const interval = setInterval(() => {
			remainingTime -= 1;
			console.log(`Remaining time: ${remainingTime}`);
			if (remainingTime % 60 === 0) {
				this.setState({ dataIndex: remainingTime / 60 });
			}
			this.setState({ remainingTime });
			if (remainingTime === 0) {
				this.reset();
			}
		}, 1000);

		this.setState({ interval });
	};

	reset = () => {
		const { interval } = this.state;
		clearInterval(interval);
		this.setState({
			isPlaying: false,
			isStarted: false,
			remainingTime: 0,
			time: 0,
			dataIndex: 0,
		});
	};
	render() {
		const { show } = this.props;
		const { times, isStarted, dataIndex } = this.state;
		const classNames = [styles['player-container']];
		if (show) {
			classNames.push(styles['show']);
		}

		return (
			<div className={classNames.join(' ')}>
				<section className={styles['player']}>
					<div>
						<nav>
							<button
								className={styles['close']}
								onClick={this.onClose}
							>
								<div />
							</button>
						</nav>
						<main>
							<CircularSlider
								label="minutes"
								min={0}
								max={60}
								labelColor="#005a58"
								knobColor="#094568"
								knobDraggable={!isStarted}
								progressColorFrom="#45C0E9"
								progressColorTo="#0098BB"
								progressSize={24}
								trackColor="#eeeeee"
								trackSize={24}
								dataIndex={dataIndex}
								data={times} //...
								onChange={(value) => {
									if (!isStarted) {
										this.setState({
											time: value,
										});
									}
								}}
							/>
						</main>
						<footer>
							{isStarted ? (
								<button disabled>Start Meditating</button>
							) : (
								<button onClick={this.onStart}>Start</button>
							)}
						</footer>
					</div>
				</section>
			</div>
		);
	}
}

function Song() {
	return (
		<div className={styles['song']}>
			<Link to={'/music/1'}></Link>
		</div>
	);
}

export function SelectedSound() {
	const { isAuthenticated } = useContext(AppContext);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}
	return (
		<div className={styles['selected-song']}>
			<header>
				<div>
					<Link to={'/music'}>
						<div className={styles['back']}></div>
					</Link>
				</div>
				<div>Name</div>
				<div></div>
			</header>
			<main>
				<BigPlayer />
			</main>
		</div>
	);
}
