import React from 'react';

import { Header } from 'components/header';
import { Sidebar } from 'components/sidebar';
import { Footer } from 'components/footer';

import style from './template.module.scss';

interface Props {
	children: React.ReactNode;
}

export const Template: React.FC<Props> = ({ children }) => {
	return (
		<>
			<Header />

			<div className={style.container}>
				<div className={style.sidebar}>
					<Sidebar />
				</div>
				<div className={style.page}>{children}</div>
			</div>
			<Footer />
		</>
	);
};
