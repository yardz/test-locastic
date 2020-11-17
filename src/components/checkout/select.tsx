import { useField } from 'formik';
import React from 'react';

import style from './select.module.scss';

interface Props {
	options: string[];
	label: string;
	name: string;
	placeholder?: string;
}
export const Select: React.FC<Props> = ({ label, name, placeholder, options }) => {
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
				<select className={style.input} id={name} {...field}>
					{!field.value && <option value="">{placeholder}</option>}

					{options.map(option => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
