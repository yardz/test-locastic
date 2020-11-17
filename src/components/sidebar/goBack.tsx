import React from 'react';
import { useHistory } from 'react-router-dom';

import { IconGoBack } from '../icon';

import style from './goBack.module.scss';

export const GoBack = () => {
	const history = useHistory();
	return (
		<div className={style.goBack} onClick={() => history.goBack()}>
			<IconGoBack /> <span>GoBack</span>
		</div>
	);
};
