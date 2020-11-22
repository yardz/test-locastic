import React, { CSSProperties } from 'react';
import css from './button.module.scss';

interface Props {
	onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	color: 'Yellow' | 'Blue';
	style?: CSSProperties;
	type?: 'submit' | 'reset' | 'button';
	disabled?: boolean;
}

export const Button: React.FC<Props> = ({ onClick, style, color, children, type, disabled }) => {
	const className = color === 'Blue' ? css.blue : css.yellow;

	return (
		<button className={className} style={style} onClick={onClick} type={type} disabled={disabled}>
			{children}
		</button>
	);
};
