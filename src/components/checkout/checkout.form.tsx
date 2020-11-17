import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../button';

import { checkoutActions } from 'store/checkoutReducer';

import { Formik, Form } from 'formik';
import style from './checkout.form.module.scss';

interface UserCheckout {
	firstName: string;
	lastName: string;
	email: string;
	dateOfBirth: string;
	gender: string;
	address: string;
	zipCode: string;
	agree: boolean;
}

export const CheckoutForm = () => {
	const dispatch = useDispatch();
	const initialValues: UserCheckout = {
		firstName: '',
		lastName: '',
		email: '',
		dateOfBirth: '',
		gender: '',
		address: '',
		zipCode: '',
		agree: false,
	};
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(userCheckout, actions) => {
				console.log({ userCheckout });
				dispatch(checkoutActions.done());

				actions.setSubmitting(false);
			}}>
			{props => (
				<Form>
					<div className={style.container}>
						<div>Text 1</div>
						<div>Text 2</div>
						<div>Text 3</div>
						<div>Text 4</div>
						<div>Text 5</div>
						<div>Text 6</div>
						<div>Text 7</div>
						<div>Text 8</div>
						<div>Text 9</div>
						<div>Text 10</div>
						<div>Text 11</div>
						<div>Text 12</div>
						<div>Text 13</div>

						<Button
							type="submit"
							color="Yellow"
							style={{ width: 167, margin: '0px' }}
							onClick={event => {
								event?.preventDefault();
								props.handleSubmit();
							}}>
							Checkout
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
