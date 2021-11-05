import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';
import styles from './personality.module.css';

export default function Personality() {
	const { isAuthenticated, questions } = useContext(AppContext);
	const [personality, setPersonality] = useState(null);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}

	const onSubmit = (response) => {
		const personality = response.complete();
		personality.result = response.getData();
		setPersonality(personality);
	};
	return (
		<>
			{personality ? <Result personality={personality} /> : null}
			{questions.length && personality === null ? (
				<Questions onSubmit={onSubmit} questions={questions} />
			) : null}
		</>
	);
}

function Questions({ questions, onSubmit }) {
	const [response, setResponse] = useState(null);
	const [isCompleted, setIsCompleted] = useState(false);
	useEffect(() => {
		document.getElementById('personality-quiz').reset();
		setResponse(new Response(questions));
	}, []);
	const onAnswer = ({ index, value }) => {
		setIsCompleted(response.addResponse(index, value));
	};

	let buttonComponent = <button disabled>Send</button>;
	if (isCompleted) {
		buttonComponent = <button type={'submit'}>Send</button>;
	}
	return (
		<form
			id={'personality-quiz'}
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(response);
			}}
			className={['personality', styles['personality']].join(' ')}
		>
			<header>
				<div>
					<button onClick={()=> {
						window.location.href = '/settings'
					}}>
						<div />
					</button>
				</div>
				<div>Personality Test</div>
				<div></div>
			</header>
			<main className={styles['content']}>
				{questions.map((q) => (
					<Question key={q.id} question={q} onAnswer={onAnswer} />
				))}
			</main>
			<footer>{buttonComponent}</footer>
		</form>
	);
}

function Result({ personality }) {
	const { api, updateMe } = useContext(AppContext);
	const { title, code, description, percentage, site, result, type } =
		personality;
	return (
		<form
			id={'personality-quiz'}
			onSubmit={(e) => {
				e.preventDefault();
				api.setPersonality(code)
					.then(() => {
						return api.getMe();
					})
					.then((me) => {
						updateMe(me);
						window.location.href = '/';
					})
					.catch((e) => {
						alert(e.message);
					});
			}}
			className={[
				'personality',
				styles['personality'],
				styles['result'],
			].join(' ')}
		>
			<header style={{justifyContent: 'center'}}>
				<div>{title}</div>
			</header>
			<main className={styles['content']}>
				<section>
					<h3>Personality</h3>
					<div className={styles['center']}>
						<p>
							<a href={site} target={'_blank'}>
								{title}
							</a>
							<br />
						</p>
					</div>
				</section>
				<section>
					<h3>Code</h3>
					<div className={styles['center']}>
						<p>{code}</p>
					</div>
				</section>
				<section>
					<h3>Description</h3>
					<div className={styles['center']}>
						<p>{description}</p>
					</div>
				</section>
				<section>
					<h3>Percentage</h3>
					<div className={styles['center']}>
						<p>{percentage}</p>
					</div>
				</section>
				<section>
					<h3>Type</h3>
					<div className={styles['center']}>
						<p>{type}</p>
					</div>
				</section>
				<section className={styles['areas']}>
					<h3>Areas</h3>
					<div>
						<div className={styles['area']}>
							<span>Introvert</span>
							<div>
								<span>
									<span
										style={{
											background:
												result['i'].total >
												result['e'].total
													? '#2266bb'
													: null,
											width:
												result['i'].total >
												result['e'].total
													? parseInt(
															`${result['i'].percentage}`
													  )
													: null,
										}}
									>
										{result['i'].percentage}%
									</span>
								</span>
								<span>
									<span
										style={{
											background:
												result['e'].total >
												result['i'].total
													? '#ff6600'
													: null,
											width:
												result['e'].total >
												result['i'].total
													? parseInt(
															`${result['e'].percentage}`
													  )
													: null,
										}}
									>
										{result['e'].percentage}%
									</span>
								</span>
							</div>
							<span>Extrovert</span>
						</div>
						<div className={styles['area']}>
							<span>Intuitives</span>
							<div>
								<span>
									<span
										style={{
											background:
												result['n'].total >
												result['s'].total
													? '#ed1c24'
													: null,
											width:
												result['n'].total >
												result['s'].total
													? parseInt(
															`${result['n'].percentage}`
													  )
													: null,
										}}
									>
										{result['n'].percentage}%
									</span>
								</span>
								<span>
									<span
										style={{
											background:
												result['s'].total >
												result['n'].total
													? '#006837'
													: null,
											width:
												result['s'].total >
												result['n'].total
													? parseInt(
															`${result['s'].percentage}`
													  )
													: null,
										}}
									>
										{result['s'].percentage}%
									</span>
								</span>
							</div>
							<span>Sensors</span>
						</div>
						<div className={styles['area']}>
							<span>Thinkers</span>
							<div>
								<span>
									<span
										style={{
											background:
												result['t'].total >
												result['f'].total
													? '#33cc99'
													: null,
											width:
												result['t'].total >
												result['f'].total
													? parseInt(
															`${result['t'].percentage}`
													  )
													: null,
										}}
									>
										{result['t'].percentage}%
									</span>
								</span>
								<span>
									<span
										style={{
											background:
												result['f'].total >
												result['t'].total
													? '#ff3399'
													: null,
											width:
												result['f'].total >
												result['t'].total
													? parseInt(
															`${result['f'].percentage}`
													  )
													: null,
										}}
									>
										{result['f'].percentage}%
									</span>
								</span>
							</div>
							<span>Feelers</span>
						</div>
						<div className={styles['area']}>
							<span>Judgers</span>
							<div>
								<span>
									<span
										style={{
											background:
												result['j'].total >
												result['p'].total
													? '#f4ba4a'
													: null,
											width:
												result['j'].total >
												result['p'].total
													? parseInt(
															`${result['j'].percentage}`
													  )
													: null,
										}}
									>
										{result['j'].percentage}%
									</span>
								</span>
								<span>
									<span
										style={{
											background:
												result['p'].total >
												result['j'].total
													? '#662d91'
													: null,
											width:
												result['p'].total >
												result['j'].total
													? parseInt(
															`${result['p'].percentage}`
													  )
													: null,
										}}
									>
										{result['p'].percentage}%
									</span>
								</span>
							</div>
							<span>Perceivers</span>
						</div>
					</div>
				</section>
			</main>
			<footer>
				<button type={'submit'}>Save</button>
			</footer>
		</form>
	);
}

function Question({ question, onAnswer }) {
	let { id, options, content, index } = question;

	const onChange = (e) => {
		onAnswer({
			index,
			value: e.target.value,
		});
	};

	return (
		<div className={styles['question']} id={id}>
			<h3>{content}</h3>
			<div>
				{options.map((o) => (
					<Option key={o.id} option={o} onChange={onChange} />
				))}
			</div>
		</div>
	);
}

function Option({ option, onChange }) {
	const { id, questionId, content, value } = option;
	return (
		<span>
			<input
				type={'radio'}
				value={value}
				name={questionId}
				onChange={onChange}
				id={id}
				required
			/>
			<label htmlFor={id}>{content}</label>
		</span>
	);
}

export class Response {
	static personalities = {
		ISTJ: {
			title: 'The Logistician',
			percentage: '13.7%',
			type: 'Sentinels',
			code: 'ISTJ',
			description:
				'Practical and fact-minded individuals, whose reliability cannot be doubted',
			site: 'https://www.16personalities.com/istj-personality',
		},
		ISFJ: {
			title: 'The Defender',
			percentage: '12.7%',
			type: 'Sentinels',
			code: 'ISFJ',
			description:
				'Very dedicated and warm protectors, always ready to defend their loved ones.',
			site: 'https://www.16personalities.com/isfj-personality',
		},
		INFJ: {
			title: 'The Advocate',
			percentage: '1.7%',
			type: 'Diplomats',
			code: 'INFJ',
			description:
				'Quiet and mystical, yet very inspiring and tireless idealists',
			site: 'https://www.16personalities.com/infj-personality',
		},
		INTJ: {
			title: 'The Architect',
			percentage: '1.4%',
			code: 'INTJ',
			description:
				'Imaginative and strategic thinkers, with a plan for everything',
			type: 'Analysts',
			site: 'https://www.16personalities.com/intj-personality',
		},
		ISTP: {
			title: 'The Virtuoso',
			percentage: '6.4%',
			code: 'ISTP',
			type: 'Explorers',
			description:
				'Bold and practical experimenters, masters of all kind of tools',
			site: 'https://www.16personalities.com/istp-personality',
		},
		ISFP: {
			title: 'The Adventurer',
			percentage: '6.1%',
			code: 'ISFP',
			type: 'Explorers',
			description:
				'Flexible and charming artists, always ready to explore and experience something new',
			site: 'https://www.16personalities.com/isfp-personality',
		},
		INFP: {
			title: 'The Mediator',
			percentage: '3.2%',
			code: 'INFP',
			type: 'Diplomats',
			description:
				'Poetic, kind and altruistic people, always eager to help a good cause',
			site: 'https://www.16personalities.com/infp-personality',
		},
		INTP: {
			title: 'The Logician',
			percentage: '2.4%',
			code: 'INTP',
			type: 'Analysts',
			description:
				'Innovative inventors with an unquenchable thirst for knowledge',
			site: 'https://www.16personalities.com/intp-personality',
		},
		ESTP: {
			title: 'The Entrepreneur',
			percentage: '5.8%',
			code: 'ESTP',
			type: 'Explorers',
			description:
				'Smart, energetic and very perceptive people, who truly enjoy living on the edge',
			site: 'https://www.16personalities.com/estp-personality',
		},
		ESFP: {
			title: 'The Fun-Lover',
			percentage: '8.7%',
			code: 'ESFP',
			type: 'Explorers',
			description:
				'Spontaneous, energetic and enthusiastic people - life is never boring around them',
			site: 'https://www.16personalities.com/esfp-personality',
		},
		ENFP: {
			title: 'The Campaigner',
			percentage: '6.3%',
			code: 'ENFP',
			type: 'Diplomats',
			description:
				'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile',
			site: 'https://www.16personalities.com/enfp-personality',
		},
		ENTP: {
			title: 'The Debater',
			percentage: '2.8%',
			code: 'ENTP',
			type: 'Analysts',
			description:
				'Smart and curious thinkers who cannot resist an intellectual challenge',
			site: 'https://www.16personalities.com/entp-personality',
		},
		ESTJ: {
			title: 'The Executive',
			percentage: '10.4%',
			code: 'ESTJ',
			type: 'Sentinels',
			description:
				'Excellent administrators, unsurpassed at managing things - or people',
			site: 'https://www.16personalities.com/estj-personality',
		},
		ESFJ: {
			title: 'The Consul',
			percentage: '12.6%',
			code: 'ESFJ',
			type: 'Sentinels',
			description:
				'Extraordinarily caring, social and popular people, always eager to help',
			site: 'https://www.16personalities.com/esfj-personality',
		},
		ENFJ: {
			title: 'The Protagonist',
			percentage: '2.8%',
			code: 'ENFJ',
			type: 'Diplomats',
			description:
				'Charismatic and inspiring leaders, able to mesmerize their listeners',
			site: 'https://www.16personalities.com/enfj-personality',
		},
		ENTJ: {
			title: 'The Commander',
			percentage: '2.9%',
			code: 'ENTJ',
			type: 'Analysts',
			description:
				'Bold, imaginative and strong-willed leaders, always finding a way - or making one',
			site: 'https://www.16personalities.com/entj-personality',
		},
	};
	constructor(questions) {
		this._isComplete = false;
		this.answers = new Array(questions.length);
		this._personality = null;
		this._areas = {
			i: 0, // Introvert
			e: 0, // Extrovert
			//
			n: 0, // Intuitives
			s: 0, // Sensors
			//
			t: 0, // Thinkers
			f: 0, // Feelers
			//
			j: 0, // Judgers
			p: 0, // Perceivers
		};
	}

	addResponse = (index, value) => {
		this.answers[index] = value;
		const completed = this.answers.filter((i) => !!i).length;
		this._isComplete = completed === this.answers.length;
		return this._isComplete;
	};

	isComplete = () => {
		return this._isComplete;
	};

	complete = () => {
		if (this._isComplete) {
			this.calculatePersonality();
			return this.personality();
		}

		return null;
	};

	getData = () => {
		if (!this._isComplete) {
			return null;
		}

		const sums = {
			ie: this._areas['i'] + this._areas['e'],
			ns: this._areas['n'] + this._areas['s'],
			tf: this._areas['t'] + this._areas['f'],
			jp: this._areas['j'] + this._areas['p'],
		};
		return {
			i: {
				total: this._areas['i'],
				percentage: sums['ie']
					? ((this._areas['i'] / sums['ie']) * 100).toFixed(2)
					: 0,
			},
			e: {
				total: this._areas['e'],
				percentage: sums['ie']
					? ((this._areas['e'] / sums['ie']) * 100).toFixed(2)
					: 0,
			},
			n: {
				total: this._areas['n'],
				percentage: sums['ns']
					? ((this._areas['n'] / sums['ns']) * 100).toFixed(2)
					: 0,
			},
			s: {
				total: this._areas['s'],
				percentage: sums['ns']
					? ((this._areas['s'] / sums['ns']) * 100).toFixed(2)
					: 0,
			},
			t: {
				total: this._areas['t'],
				percentage: sums['tf']
					? ((this._areas['t'] / sums['tf']) * 100).toFixed(2)
					: 0,
			},
			f: {
				total: this._areas['f'],
				percentage: sums['tf']
					? ((this._areas['f'] / sums['tf']) * 100).toFixed(2)
					: 0,
			},
			j: {
				total: this._areas['j'],
				percentage: sums['jp']
					? ((this._areas['j'] / sums['jp']) * 100).toFixed(2)
					: 0,
			},
			p: {
				total: this._areas['p'],
				percentage: sums['jp']
					? ((this._areas['p'] / sums['jp']) * 100).toFixed(2)
					: 0,
			},
		};
	};

	personality = () => {
		if (this._personalityType) {
			return Response.personalities[this._personalityType];
		}
		return null;
	};

	areas = () => {
		return { ...this._areas };
	};

	calculatePersonality = () => {
		const areas = {
			i: 0, // Introvert
			e: 0, // Extrovert
			//
			n: 0, // Intuitives
			s: 0, // Sensors
			//
			t: 0, // Thinkers
			f: 0, // Feelers
			//
			j: 0, // Judgers
			p: 0, // Perceivers
		};
		for (const answer of this.answers) {
			areas[answer] += 1;
		}

		this._areas = { ...areas };

		let personality = [
			areas['i'] > areas['e'] ? 'I' : 'E',
			areas['n'] > areas['s'] ? 'N' : 'S',
			areas['f'] > areas['t'] ? 'F' : 'T',
			areas['j'] > areas['p'] ? 'J' : 'P',
		].join('');

		this._personalityType = personality;
	};
}
