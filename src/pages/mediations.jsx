import React, { useContext, useEffect, useState, Component } from 'react';
import styles from './meditation.module.css';
import { BottomBar } from '../components/BottomBar';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';

export default function Meditations() {
	const { isAuthenticated, api } = useContext(AppContext);
	const [isPlayerDisplayed, setIsPlayerDisplayed] = useState(false);
	const [meditations, setMeditations] = useState([]);
	const [meditation, setMeditation] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		api.getSoundsByType('guide')
			.then((meditations) => {
				setMeditations(meditations);
			})
			.catch((e) => alert(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}

	const onClick = (meditation) => {
		setMeditation(meditation);
		setIsPlayerDisplayed(true);
	};

	const mapMeditation = (meditation) => {
		return (
			<Meditation key={meditation.id} {...meditation} onClick={onClick} />
		);
	};

	let component = <div>Loading</div>;
	if (!isLoading) {
		component = meditations.map(mapMeditation);
	}

	return (
		<div className={['view', styles['meditations']].join(' ')}>
			<header>Meditation</header>
			<main>{component}</main>
			<BottomBar selected={'meditation'} />
			<Player
				meditation={meditation}
				show={isPlayerDisplayed}
				onClose={() => {
					setIsPlayerDisplayed(false);
				}}
			/>
		</div>
	);
}

function Meditation({ id, name, description, credit, length, url, onClick }) {
	return (
		<div
			className={styles['meditation']}
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
			<div id={id}>
				<h3>{name}</h3>
				<small>{credit}</small>
			</div>
		</div>
	);
}

class Player extends Component {
	static contextType = AppContext;
	timeInterval = 1000;
	state = {
		isStarted: false,
		isPlaying: false,
		progress: 0,
		sound: null,
		interval: null,
	};

	componentDidUpdate(prevProps) {
		if (!prevProps.show && this.props.show) {
			this.onLoad();
		}
	}

	onLoad = () => {
		if (!this.props.meditation) {
			return;
		}

		const { url, name, description, credit } = this.props.meditation;

		const audioUrl = url;
		const sound = new Howl({
			src: [audioUrl],
			volume: 0.7,
			html5: true,
			loop: false,
			onload: () => {
				this.setState({
					name,
					description,
					credit,
					sound,
					isStarted: false,
					isPlaying: false,
				});
			},
			onloaderror: () => {
				alert(`Could not load: ${audioUrl}`);
			},
			onend: () => {
				this.onFinish();
			},
		});
	};

	onClose = () => {
		const { sound, interval } = this.state;
		if (sound) {
			sound.stop();
		}
		try {
			if (interval) {
				clearInterval(interval);
			}
		} catch (e) {
			console.error(e);
		}

		this.setState({
			isStarted: false,
			isPlaying: false,
			sound: null,
			progress: 0,
		});
		this.props.onClose();
	};

	onStart = () => {
		const { sound } = this.state;
		if (!sound) {
			return;
		}
		this.setState({
			isStarted: true,
			isPlaying: true,
		});
		sound.play();
		this.startInterval();
	};

	startInterval = () => {
		const { sound } = this.state;
		if (this.props.show) {
			const interval = setInterval(() => {
				if (!sound) {
					return;
				}
				const progress = (sound.seek() / sound.duration()) * 100;
				this.setState({
					progress,
				});
			}, this.timeInterval);

			this.setState({ interval });
		}
	};

	onFinish = () => {
		const { api } = this.context;
		api.sendEvent({
			state: 'completed',
			category: 'guided_meditation',
		})
			.then(() => {
				console.log(`I send the event: completed guided_meditation`);
			})
			.catch(console.error)
			.finally(() => {
				this.onClose();
				alert('Meditation completed');
			});
	};

	reset = () => {
		const { interval, sound } = this.state;
		if (interval) {
			clearInterval(interval);
		}

		if (sound) {
			sound.stop();
		}

		this.setState({
			isPlaying: false,
			isStarted: false,
			sound: null,
			progress: 0,
		});
	};

	onCancel = () => {
		const { api } = this.context;
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Are you sure you want to cancel the meditation?')) {
			api.sendEvent({
				state: 'cancel',
				category: 'guided_meditation',
			})
				.then(() => {
					console.log(`I send the event: cancel guided_meditation`);
				})
				.catch(console.error)
				.finally(() => {
					this.onClose();
				});
		}
	};

	onPause = () => {
		const { interval, sound } = this.state;
		clearInterval(interval);
		sound.pause();
		this.setState({ isPlaying: false });
	};

	onResume = () => {
		let { sound } = this.state;
		if (!sound) {
			return;
		}
		sound.play();
		const interval = setInterval(() => {
			if (!sound) {
				return;
			}
			const progress = (sound.seek() / sound.duration()) * 100;
			this.setState({
				progress,
			});
		}, this.timeInterval);

		this.setState({ interval, isPlaying: true });
	};

	render() {
		const { show } = this.props;
		const { progress, sound, name, credit, isPlaying, isStarted } =
			this.state;
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
			<div>
				<img />
				<ProgressBar progress={progress} />

				<ProgressBarTimes
					current={sound.seek()}
					pending={sound.duration() - sound.seek()}
				/>

				<h3>{name}</h3>
				<small>{credit}</small>
			</div>
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
						<main>{component}</main>
						{sound ? actions : null}
					</div>
				</section>
			</div>
		);
	}
}

function ProgressBar({ progress }) {
	return (
		<div className={styles['progress-bar']}>
			<div></div>
			<div
				style={{
					width: `${progress}%`,
				}}
			></div>
		</div>
	);
}

function ProgressBarTimes({ current, pending }) {
	return (
		<div className={styles['progress-bar-times']}>
			<span>{secondsToTime(current)}</span>
			<span>-{secondsToTime(pending)}</span>
		</div>
	);
}

function secondsToTime(e) {
	var h = Math.floor(e / 3600)
			.toString()
			.padStart(2, '0'),
		m = Math.floor((e % 3600) / 60)
			.toString()
			.padStart(2, '0'),
		s = Math.floor(e % 60)
			.toString()
			.padStart(2, '0');

	return m + ':' + s;
	355;
}
