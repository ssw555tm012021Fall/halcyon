import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BottomBar.module.css';
export function BottomBar({ selected }) {
    return <nav className={styles['bottom-bar'] + ' bottom-bar' + ' navigation'}>
        <Link to={'/'} className={selected === 'home' ? styles['selected'] : null}>
            <div className={styles['home']}></div>
        </Link>
        <Link to={'/rooms'} className={selected === 'room' ? styles['selected'] : null}>
            <div className={styles['room']}></div>
        </Link>
        <Link to={'/sounds'} className={selected === 'music' ? styles['selected'] : null}>
            <div className={styles['music']}></div>
        </Link>
        <Link to={'/meditations'} className={selected === 'meditation' ? styles['selected'] : null}>
            <div className={styles['meditation']}></div>
        </Link>
        <Link to={'/settings'} className={selected === 'settings' ? styles['selected'] : null}>
            <div className={styles['settings']}></div>
        </Link>
    </nav>
}