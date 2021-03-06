import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PublicPaths } from 'routes/publicRoutes/public.paths';
import { cartActions, cartSelectors } from 'store/cartReducer';
import { IconCart } from '../icon';
import { CartSidebar } from '../cartSidebar';
import style from './header.module.scss';

export const Header = () => {
	const itens = useSelector(cartSelectors.itens);
	const notification = useSelector(cartSelectors.notification);
	const cartOpen = useSelector(cartSelectors.isOpen);
	const dispatch = useDispatch();

	const total = itens.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);

	let message = 'Cart is Empty';
	if (total === 1) {
		message = '1 Workshop in Cart';
	}
	if (total > 1) {
		message = `${total} Workshops in Cart`;
	}

	return (
		<div className={style.fixed}>
			{cartOpen && <CartSidebar />}
			<header className={style.header}>
				<Link to={PublicPaths.home}>
					<img className={style.logo} src="/images/logo.svg" alt="" />
				</Link>

				<div
					className={style.cartContainer}
					onClick={() => {
						dispatch(cartActions.openCart());
					}}>
					{notification && <div className={style.alert} />}
					<IconCart className={style.cart} />
					<h6 className={style.cartDescription}>{message}</h6>
				</div>
			</header>
		</div>
	);
};
