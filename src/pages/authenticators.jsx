import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../services/AppContext';
import { Redirect } from 'react-router';
import { startRegistration } from '@simplewebauthn/browser';
import styles from './authenticators.module.css';

export default function Authenticators() {
	const { isAuthenticated, me, api } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const [authenticators, setAuthenticators] = useState([]);
	const [selection, setSelection] = useState([]);
	if (!isAuthenticated) {
		return <Redirect to="/signin" />;
	}

	const getAuthenticators = async () => {
		const auths = await api.getAuthenticators();
		setAuthenticators(auths);
	};

	const onSelect = ({ index, isChecked }) => {
		const selectionSet = new Set(selection);
		if (isChecked) {
			if (!selectionSet.has(index)) {
				selectionSet.add(index);
			}
		} else {
			if (selectionSet.has(index)) {
				selectionSet.delete(index);
			}
		}

		setSelection(Array.from(selectionSet).sort());
	};

	useEffect(() => {
		if (me) {
			getAuthenticators()
				.then(() => {
					console.log(`Load authenticators`);
				})
				.catch(alert);
		}
	}, [me]);

	if (!me) {
		return null;
	}

	let buttonComponent = <button disabled={isLoading}> Add </button>;
	if (selection.length) {
		buttonComponent = (
			<button
				disabled={isLoading}
				style={{
					background: 'rgb(255, 59, 48)',
					border: '1px solid rgb(255, 59, 48)',
				}}
			>
				{' '}
				Delete{' '}
			</button>
		);
	}

	let onSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		if (selection.length) {
			try {
				const promises = [];
				for (const index of selection) {
					const authenticator = authenticators[index];
					promises.push(
						api.deleteAuthenticator({
							id: authenticator.id,
						})
					);
				}

				await Promise.all(promises);
				await getAuthenticators();
				setSelection([]);
			} catch (e) {
				console.error(e);
				alert(e.message);
			} finally {
				setIsLoading(false);
			}

			return;
		}

		try {
			const options = await api.generateRegistrationOptions();
			const attestation = await startRegistration(options);
			const verified = await api.verifyRegistration({ attestation });
			if (verified) {
				await getAuthenticators();
				alert('Key saved successfully');
			}
		} catch (e) {
			console.error(e);
			alert(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	let content = null;
	if (authenticators.length) {
		content = (
			<ul>
				{authenticators.map((authenticator, i) => {
					const { id } = authenticator;
					return (
						<Authenticator
							onSelect={onSelect}
							index={i}
							key={id}
							{...authenticator}
						/>
					);
				})}
			</ul>
		);
	}
	return (
		<form
			onSubmit={onSubmit}
			className={['authenticators', styles['authenticators']].join(' ')}
		>
			<header>
				<div>
					<button
						onClick={() => {
							window.location.href = '/settings';
						}}
					>
						<div />
					</button>
				</div>
				<div>Authenticators</div>
				<div></div>
			</header>
			<main className={styles['content']}>{content}</main>
			<footer>{buttonComponent}</footer>
		</form>
	);
}

function Authenticator({ id, index, onSelect, redactedPublicKey, isEnabled }) {
	const { api } = useContext(AppContext);
	const [isChecked, setIsChecked] = useState(false);
	const [enabled, setEnabled] = useState(isEnabled);
	const onToggle = (e) => {
		let isChecked = e.target.checked;
		if (isChecked) {
			api.updateAuthenticator({ id, isEnabled: isChecked })
				.then(() => {
					setEnabled(true);
				})
				.catch(alert);
		} else {
			api.updateAuthenticator({ id, isEnabled: isChecked })
				.then(() => {
					setEnabled(false);
				})
				.catch(alert);
		}
	};
	return (
		<li id={id}>
			<div>
				<input
					type={'checkbox'}
					checked={isChecked}
					onChange={(e) => {
						let isChecked = e.target.checked;
						if (isChecked) {
							onSelect({ index, isChecked: true });
							setIsChecked(true);
						} else {
							onSelect({ index, isChecked: false });
							setIsChecked(false);
						}
					}}
				/>
			</div>
			<div>
				<span>{redactedPublicKey}</span>
			</div>

			<div>
				<Toggle on={enabled} onToggle={onToggle} />
			</div>
		</li>
	);
}

function Toggle({ on, onToggle, isDisabled }) {
	return (
		<label className={styles['switch']}>
			<input
				type="checkbox"
				checked={on}
				onChange={onToggle}
				disabled={isDisabled}
			/>
			<span
				className={[styles['slider'], styles['round']].join(' ')}
			></span>
		</label>
	);
}
