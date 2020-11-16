import React from 'react';
import { CSSProperties } from 'react';
import css from './button.module.scss';

interface Props {
	onClick: () => void;
	color: 'Yellow' | 'Blue';
	style?: CSSProperties;
}

export const Button: React.FC<Props> = ({ onClick, style, color, children }) => {
	const className = color === 'Blue' ? css.blue : css.yellow;

	return (
		<button className={className} style={style} onClick={onClick}>
			{children}
		</button>
	);
};
