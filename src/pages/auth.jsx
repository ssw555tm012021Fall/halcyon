import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AppContext } from '../services/AppContext';
import styles from './auth.module.css';

export function SignIn() {
	const { api, isAuthenticated } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	if(isAuthenticated) {
		return <Redirect to='/'/>
	}
	const onSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const token = await api.signIn({ email, password });
			if (token) {
				localStorage.setItem('token', token.authToken);
				localStorage.setItem('expiredAt', token.expiredAt);
				window.location = '/';
			} else {
				alert('Something happened please try again');
			}
		} catch (e) {
			alert(e.message);
		} finally {
			setIsLoading(false);
		}
	};
	const isValidEmail = validateEmail(email);
	const hideSignUp = true;
	return (
		<div className={styles['view']}>
			<form onSubmit={onSubmit}>
				<picture>
					<img src="/images/logo.png"/>
				</picture>
				<section>
					<input
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						placeholder="Email"
						type="email"
						required
					/>
					<input
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						placeholder="Password"
						type="password"
						required
					/>
					{hideSignUp ? null : <p>
						Need an account? <Link to={'/signup'}>Sign Up</Link>
					</p>}
				</section>
				<section>
					{isValidEmail && password.length && !isLoading ? (
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
	const { api, isAuthenticated } = useContext(AppContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await api.signUp({ email, password });
	};
	const isValidEmail = validateEmail(email);

	if(isAuthenticated) {
		return <Redirect to='/'/>
	}
	
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
						required
					/>
					<input
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						placeholder="Password"
						type="password"
						required
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
