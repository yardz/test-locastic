import React from 'react';
import { CSSProperties } from 'react';
import css from './button.module.scss';

interface Props {
	onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	color: 'Yellow' | 'Blue';
	style?: CSSProperties;
	type?: 'submit' | 'reset' | 'button';
}

export const Button: React.FC<Props> = ({ onClick, style, color, children, type }) => {
	const className = color === 'Blue' ? css.blue : css.yellow;

	return (
		<button className={className} style={style} onClick={onClick} type={type}>
			{children}
		</button>
	);
};
