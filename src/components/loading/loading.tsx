import React from 'react';
import style from './loading.module.scss';

export const Loading = () => {
	return (
		<div data-testid="loading" className={style.loading}>
			<div className={style.inner}></div>
		</div>
	);
};
