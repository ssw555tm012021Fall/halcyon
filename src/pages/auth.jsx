import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../services/AppContext';
import styles from './auth.module.css';

export function SignIn() {
	const { api } = useContext(AppContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await api.signIn({ email, password });
	};
	const isValidEmail = validateEmail(email);
	return (
		<div className={styles['view']}>
			<form onSubmit={onSubmit}>
				<picture>
					<img />
				</picture>
				<section>
					<input
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						placeholder="Email"
						type="email"
					/>
					<input
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						placeholder="Password"
						type="password"
					/>
					<p>
						Need an account? <Link to={'/signup'}>Sign Up</Link>
					</p>
				</section>
				<section>
					{isValidEmail && password.length ? (
						<button type={'submit'}>Submit</button>
					) : (
						<button type={'submit'} disabled>
							Submit
						</button>
					)}
				</section>
			</form>
			<div
				className={styles['gradient']}
				style={{
					animation: 'gradient 10s ease infinite',
				}}
			/>
		</div>
	);
}

export function SignUp() {
	const { api } = useContext(AppContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await api.signUp({ email, password });
	};
	const isValidEmail = validateEmail(email);
	return (
		<div className={styles['view']}>
			<form onSubmit={onSubmit}>
				<picture>
					<img />
				</picture>
				<section>
					<input
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						placeholder="Email"
						type="email"
					/>
					<input
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						placeholder="Password"
						type="password"
					/>
					<p>
						Have an account? <Link to={'/signin'}>Sign In</Link>
					</p>
				</section>
				<section>
					{isValidEmail && password.length ? (
						<button type={'submit'}>Submit</button>
					) : (
						<button type={'submit'} disabled>
							Submit
						</button>
					)}
				</section>
			</form>
			<div
				className={styles['gradient']}
				style={{
					animation: 'gradient 10s ease infinite',
				}}
			/>
		</div>
	);
}

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
