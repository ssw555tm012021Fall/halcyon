import React, { useContext, Component, useState, useEffect } from 'react';
import styles from './sounds.module.css';
import { BottomBar } from '../components/BottomBar';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';
import CircularSlider from '@fseehawer/react-circular-slider';
import { Howl } from 'howler';

export default function Sounds() {
	const { isAuthenticated, api } = useContext(AppContext);
	const [isPlayerDisplayed, setIsPlayerDisplayed] = useState(false);
	const [sounds, setSounds] = useState([]);
	const [sound, setSound] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		api.getSoundsByType('sound')
			.then((sounds) => {
				setSounds(sounds);
			})
			.catch((e) => alert(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}

	const mapSound = (sound) => {
		return (
			<Sound
				key={sound.id}
				{...sound}
				onClick={(sound) => {
					setSound(sound);
					setIsPlayerDisplayed(true);
				}}
			/>
		);
	};

	return (
		<div className={['view', styles['music']].join(' ')}>
			<header>Sounds</header>
			<main>
				{isLoading
					? 'Loading'
					: sounds.length
					? sounds.map(mapSound)
					: 'No sound found'}
			</main>
			<BottomBar selected={'music'} />
			<Player
				sound={sound}
				show={isPlayerDisplayed}
				onClose={() => {
					setIsPlayerDisplayed(false);
				}}
			/>
		</div>
	);
}

class Player extends Component {
	timeInterval = 1000;

	state = {
		isStarted: false,
		isPlaying: false,
		time: 5,
		remainingTime: 5,
		dataIndex: 5,
		times: [],
		sound: null,
	};
	componentDidMount() {}

	componentDidUpdate(prevProps) {
		if (!prevProps.show && this.props.show) {
			console.log(`Props`);
			console.log(this.props);
			this.onLoad();
		}
	}

	onLoad = () => {
		if (!this.props.sound) {
			return;
		}

		const { url, name, description } = this.props.sound;

		const audioUrl = url;
		const sound = new Howl({
			src: [audioUrl],
			volume: 0.7,
			html5: true,
			loop: true,
			onload: () => {
				const totalDuration = (sound.duration() * 1000) | 0;
				console.info(`Total of duration: ${totalDuration}ms`);
				const times = [];
				for (let i = 0; i < 60; i++) {
					times.push(i);
				}
				this.setState({
					times,
					sound,
					isStarted: false,
					name,
					description,
					isPlaying: false,
					time: 5,
					remainingTime: 5,
					dataIndex: 5,
				});
			},
			onloaderror: () => {
				alert(`Could not load: ${audioUrl}`);
			},
		});
	};
	onClose = () => {
		const { sound, interval } = this.state;
		if (sound) {
			sound.stop();
		}
		try {
			clearInterval(interval);
		} catch (e) {
			console.error(e);
		}

		this.setState({
			isStarted: false,
			isPlaying: false,
			time: 5,
			remainingTime: 5,
			dataIndex: 5,
			sound: null,
		});
		this.props.onClose();
	};
	onStart = () => {
		const { time, sound } = this.state;
		const remainingTime = time * 60;
		this.setState({
			remainingTime,
			isStarted: true,
			isPlaying: true,
		});
		sound.play();
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
				this.onFinish();
			}
		}, this.timeInterval);

		this.setState({ interval });
	};

	onFinish = () => {
		this.onClose();
		alert('Meditation completed');
	};

	reset = () => {
		const { interval, sound } = this.state;
		clearInterval(interval);
		if (sound) {
			sound.stop();
		}
		this.setState({
			isPlaying: false,
			isStarted: false,
			remainingTime: 0,
			time: 0,
			dataIndex: 0,
			sound: null,
		});
	};

	onCancel = () => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Are you sure you want to cancel the meditation?')) {
			this.onClose();
		}
	};

	onPause = () => {
		const { interval, sound } = this.state;
		clearInterval(interval);
		sound.pause();
		this.setState({ isPlaying: false });
	};

	onResume = () => {
		let { sound, remainingTime } = this.state;
		sound.play();
		const interval = setInterval(() => {
			remainingTime -= 1;
			console.log(`Remaining time: ${remainingTime}`);
			if (remainingTime % 60 === 0) {
				this.setState({ dataIndex: remainingTime / 60 });
			}
			this.setState({ remainingTime });
			if (remainingTime === 0) {
				this.onFinish();
			}
		}, this.timeInterval);
		this.setState({ interval, isPlaying: true });
	};
	render() {
		const { show } = this.props;
		const {
			times,
			isStarted,
			dataIndex,
			isPlaying,
			sound,
			name,
			description,
		} = this.state;
		const classNames = [styles['player-container']];
		if (show) {
			classNames.push(styles['show']);
		}

		let actions = (
			<footer>
				<button onClick={this.onStart}>Start</button>
			</footer>
		);

		if (isStarted) {
			actions = (
				<footer>
					<button
						className={styles['cancel']}
						onClick={this.onCancel}
					>
						Cancel
					</button>
					{isPlaying ? (
						<button
							className={styles['pause']}
							onClick={this.onPause}
						>
							Pause
						</button>
					) : (
						<button
							className={styles['resume']}
							onClick={this.onResume}
						>
							Resume
						</button>
					)}
				</footer>
			);
		}

		const component = sound ? (
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
		) : null;

		return (
			<div className={classNames.join(' ')}>
				<section className={styles['player']}>
					<div>
						<nav>
							{!isPlaying ? (
								<button
									className={styles['close']}
									onClick={this.onClose}
								>
									<div />
								</button>
							) : null}
						</nav>
						<main>
							{sound ? (
								<div>
									{name ? <h2>{name}</h2> : null}
									{component}
									{description ? (
										<small>{description}</small>
									) : null}
								</div>
							) : null}
						</main>
						{sound ? actions : null}
					</div>
				</section>
			</div>
		);
	}
}

function Sound({ id, name, description, url, credit, length, onClick }) {
	return (
		<div
			className={styles['sound']}
			onClick={() => {
				onClick({
					id,
					name,
					description,
					url,
					credit,
					length,
				});
			}}
		>
			<div id={id}>{name}</div>
		</div>
	);
}
