import React from 'react';

import style from './workshopList.module.scss';

import { Workshop } from 'domain/workshop';
import { WorkshopListItem } from './workshopListItem';

interface Props {
	workshops: Workshop[];
}

export const WorkshopList: React.FC<Props> = ({ workshops }) => {
	return (
		<div className={style.list} data-testid="WorkshopList">
			{workshops.map(workshop => (
				<WorkshopListItem key={workshop.id} workshop={workshop} />
			))}
		</div>
	);
};
