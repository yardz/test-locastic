import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PublicPaths } from 'routes/publicRoutes/public.paths';
import { cartActions, cartSelectors } from 'store/cartReducer';
import { IconCart } from '../icon';
import { CartSidebar } from './cartSidebar';
import style from './header.module.scss';

export const Header = () => {
	const [showSidebar, setShowSidebar] = useState(true);
	const itens = useSelector(cartSelectors.itens);
	const notification = useSelector(cartSelectors.notification);
	const dispatch = useDispatch();

	const total = itens.reduce((total, item) => total + item.quantity, 0);

	let message = 'Cart is Empty';
	if (total === 1) {
		message = '1 Workshop in Cart';
	}
	if (total > 1) {
		message = `${total} Workshops in Cart`;
	}

	return (
		<div className={style.fixed}>
			{showSidebar && (
				<CartSidebar
					close={() => {
						setShowSidebar(false);
					}}
				/>
			)}
			<header className={style.header}>
				<Link to={PublicPaths.home}>
					<img className={style.logo} src="/images/logo.svg" alt="" />
				</Link>

				<div
					className={style.cartContainer}
					onClick={() => {
						setShowSidebar(true);
						dispatch(cartActions.removeNotification());
					}}>
					{notification && <div className={style.alert} />}
					<IconCart className={style.cart} />
					<h6 className={style.cartDescription}>{message}</h6>
				</div>
			</header>
		</div>
	);
};
