import React from 'react';
import { Link } from 'react-router-dom';
import styles from './auth.module.css';

export function SignIn() {
    return (
        <div className={styles['view']}>
            <form>
                <picture>
                    <img />
                </picture>
                <section>
                    <input placeholder="Email" type="email" />
                    <input placeholder="Password" type="password" />
                    <p>Need an account? <Link to={'/signup'}>Sign Up</Link></p>
                </section>
                <section>
                    <button>Submit</button>
                </section>
            </form>
            <div className={styles['gradient']} style={{
                animation: 'gradient 10s ease infinite'
            }}/>
        </div>
    );
}

export function SignUp() {
    return (
        <div className={styles['view']}>
            <form>
                <picture>
                    <img />
                </picture>
                <section>
                    <input placeholder="Email" type="email" />
                    <input placeholder="Password" type="password" />
                    <p>Have an account? <Link to={'/signin'}>Sign In</Link></p>
                </section>
                <section>
                    <button>Submit</button>
                </section>
            </form>
            <div className={styles['gradient']} style={{
                animation: 'gradient 10s ease infinite'
            }}/>
        </div>
    );
}
