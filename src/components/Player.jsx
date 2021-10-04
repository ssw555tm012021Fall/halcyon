import React from 'react';
import styles from './Player.module.css';
export function BigPlayer() {
	return (
		<section className={styles['big-player']}>
			<div className={styles['information']}>
				<img />
				<small>Name</small>
			</div>
			<div className={styles['slider']}>
				<input type={'range'} />
			</div>
			<div className={styles['controls']}>
				<div className={styles['rewind']}>
					<button>
						<div />
					</button>
				</div>
				<div className={styles['play']}>
					<button>
						<div />
					</button>
				</div>
				<div className={styles['forward']}>
					<button>
						<div />
					</button>
				</div>
			</div>
		</section>
	);
}
