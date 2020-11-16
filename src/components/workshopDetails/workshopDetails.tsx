import React, { useState } from 'react';

import style from './workshopDetails.module.scss';

import { Workshop } from 'domain/workshop';
import { User } from 'domain/user';
import { DisplayData } from 'components/displayDate';
import Skeleton from 'react-loading-skeleton';
import { CategoryIcon } from 'components/icon/CategoryIcon';
import { Currency } from 'components/currency';
import { IconCart } from 'components/icon';
import { useDevice } from 'hooks/useDevice';
import { useDispatch } from 'react-redux';
import { cartActions } from 'store/cartReducer';
import { Button } from 'components/button';

const { format } = new Intl.NumberFormat('en', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

interface Props {
	workshop: Workshop;
	user?: User;
}

export const WorkshopDetails: React.FC<Props> = ({ workshop, user }) => {
	const [quantity, setQuantity] = useState(1);
	const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const dispatch = useDispatch();
	const device = useDevice();

	const addToCart = () => {
		dispatch(cartActions.addItem({ id: workshop.id, price: workshop.price, title: workshop.title, image: workshop.imageUrl, quantity }));
	};

	return (
		<div className={style.workshopDetails}>
			<img className={style.image} src={workshop.imageUrl} alt="" />
			<div className={style.container}>
				<div className={style.details}>
					<div className={style.metaData}>
						<div className={style.icon}>
							<CategoryIcon category={workshop.category} />
						</div>
						<DisplayData date={workshop.date} small />
					</div>

					<h1>{workshop.title}</h1>

					<div className={style.author}>
						<label>WITH: </label>
						<h4>{user?.name || <Skeleton width={200} />}</h4>
					</div>

					<div className={style.content}>
						<p>{workshop.desc}</p>
					</div>
				</div>

				<div className={style.addCart}>
					<div className={style.box}>
						<h5>Buy Your Ticket</h5>

						<div className={style.price}>
							<Currency value={workshop.price} big={device === 'desktop'} />
						</div>

						<div className={style.quantity}>
							<select
								onChange={e => {
									setQuantity(Number(e.target.value));
								}}>
								{options.map(q => (
									<option key={q} value={q}>
										{q.toString().padStart(2, '0')}
									</option>
								))}
							</select>
							<Button onClick={addToCart} style={{ width: '140px' }} color="Yellow">
								<IconCart />
							</Button>
						</div>

						<h6 className={style.subTotal}>Subtotal: {format(workshop.price * quantity)} EUR</h6>
					</div>
				</div>
			</div>
		</div>
	);
};
