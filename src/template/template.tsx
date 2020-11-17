import React from 'react';

import { Header } from 'components/header';
import { Sidebar } from 'components/sidebar';
import { Footer } from 'components/footer';
import { Checkout } from 'pages/checkout/checkout.page';

import style from './template.module.scss';
import { useSelector } from 'react-redux';
import { checkoutSelectors } from 'store/checkoutReducer';

interface Props {
	children: React.ReactNode;
}

export const Template: React.FC<Props> = ({ children }) => {
	const isOpen = useSelector(checkoutSelectors.isOpen);

	return (
		<>
			<Header />
			{isOpen && <Checkout />}

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
