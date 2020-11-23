import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button';

import { checkoutActions, checkoutSelectors } from 'store/checkoutReducer';

import { Formik, Form } from 'formik';
import { Input } from './input';
import { Select } from './select';

import { orderCreateService } from 'services/order.create';
import { UserCheckout } from 'domain/checkout';

import style from './checkout.form.module.scss';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.trim()
		.required('First Name is a required field')
		.matches(/^[a-zA-Z\s]*$/, 'First Name must be only letters'),
	lastName: Yup.string()
		.trim()
		.required('Last Name is a required field')
		.matches(/^[a-zA-Z\s]*$/, 'Last Name must be only letters'),
	email: Yup.string().trim().required('Email is a required field').email('Email Address must be a valid email'),
	dateOfBirth: Yup.date().required('Date is a required field'),
	gender: Yup.string().trim().required('Gender is a required field'),
	address: Yup.string().trim().required('Address is a required field'),
	zipCode: Yup.string()
		.trim()
		.required('Zip Code is a required field')
		.matches(/^[0-9]+$/, 'Zip Code be only digits'),
});

interface InitalProps extends Omit<UserCheckout, 'dateOfBirth'> {
	dateOfBirth: Date | '';
}

export const CheckoutForm = () => {
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const order = useSelector(checkoutSelectors.getOrder);
	const initialValues: InitalProps = {
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
			validationSchema={validationSchema}
			onSubmit={(userCheckout, actions) => {
				const user = userCheckout as UserCheckout;
				actions.setSubmitting(true);
				orderCreateService({ user, order })
					.finally(() => {
						actions.setSubmitting(false);
					})
					.then(() => dispatch(checkoutActions.done()))
					.catch(() => {
						setError(true);
					});
			}}>
			{props => (
				<Form>
					<div className={style.container}>
						<div className={style.field}>
							<Input label="First Name" name="firstName" placeholder="Type your first name here" />
						</div>
						<div className={style.field}>
							<Input label="Last Name" name="lastName" placeholder="Type your last name here" />
						</div>
						<div className={style.field}>
							<Input label="Email Address" name="email" placeholder="Type your email address here" />
						</div>
						<div className={style.fieldDuble}>
							<div>
								<Input label="Date of Birth" type="date" name="dateOfBirth" placeholder="Type your date of birth here" />
							</div>
							<div>
								<Select label="Gender" name="gender" placeholder="Select your Gender here" options={['Female', 'Male', 'Other']} />
							</div>
						</div>
						<div className={style.field}>
							<Input label="Address" name="address" placeholder="Type your address here" />
						</div>
						<div className={style.field}>
							<Input label="Zip Code" name="zipCode" placeholder="eg. 21310" />
						</div>

						<Button
							id="btn-checkout"
							disabled={props.isSubmitting}
							type="submit"
							color="Yellow"
							style={{ width: 167, margin: '0px' }}
							onClick={event => {
								event?.preventDefault();
								props.handleSubmit();
							}}>
							Checkout
						</Button>
						{error && <div className={style.formError}>An error occurred while trying to complete the purchase. Please try again.</div>}
					</div>
				</Form>
			)}
		</Formik>
	);
};
