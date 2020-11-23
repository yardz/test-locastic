import { useField } from 'formik';
import React from 'react';

import style from './input.module.scss';

interface Props {
	type?: string;
	label: string;
	name: string;
	placeholder?: string;
}
export const Input: React.FC<Props> = ({ label, name, placeholder, type }) => {
	const [field, meta] = useField(name);

	let className: string = '';
	if (!!meta.touched && !!meta.error) {
		className = style.invalid;
	}
	if (!!meta.touched && !meta.error) {
		className = style.valid;
	}

	return (
		<div className={className}>
			<div className={style.box}>
				<label className={style.label} htmlFor={name}>
					<h6>{label}</h6>
					{meta.touched && <span className={style.error}>{meta.error}</span>}
				</label>
				<input type={type} className={style.input} id={name} data-testid={name} {...field} placeholder={placeholder} />
			</div>
		</div>
	);
};
