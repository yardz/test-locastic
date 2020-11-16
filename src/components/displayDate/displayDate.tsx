import React from 'react';
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';

import { IconCalendar, IconClock } from '../icon';

import style from './displayDate.module.scss';

interface Props {
	date?: number;
	small?: boolean;
}

export const DisplayData: React.FC<Props> = props => {
	const date = props.date ? dayjs(props.date) : undefined;
	const { small } = props;

	return (
		<div className={style.dateTime} data-testid="date-time">
			<IconCalendar className={style.icon} />
			<h6 data-testid="date" className={style.item}>
				{date?.format(small ? 'DD.MM.YYYY.' : 'ddd DD.MM.YYYY.') || <Skeleton width={small ? 75 : 128} />}
			</h6>
			<IconClock className={style.icon} />
			<h6 data-testid="time" className={style.item}>
				{date?.format('HH:mm').concat('h') || <Skeleton width={50} />}
			</h6>
		</div>
	);
};
