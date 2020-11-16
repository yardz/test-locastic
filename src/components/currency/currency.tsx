import React from 'react';
import Skeleton from 'react-loading-skeleton';

import style from './currency.module.scss';

const { format } = new Intl.NumberFormat('en', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

interface Props {
	value?: number;
	big?: boolean;
}

export const Currency: React.FC<Props> = ({ value, big }) => {
	if (!value) {
		return <Skeleton />;
	}
	return (
		<>
			{big ? <h2 className={style.currency}>{format(value)}</h2> : <h3 className={style.currency}>{format(value)}</h3>}{' '}
			<h6 className={style.currency}>EUR</h6>
		</>
	);
};
