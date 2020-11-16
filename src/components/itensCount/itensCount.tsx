import React from 'react';

import style from './itensCount.module.scss';

interface Props {
	itens: number;
}

export const ItensCount: React.FC<Props> = ({ itens }) => {
	return (
		<h6 className={style.title}>
			Displayed: <span>{itens}</span>
		</h6>
	);
};
