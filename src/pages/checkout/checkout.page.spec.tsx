import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { renderPage, baseURL } from 'test-utils';
import { Checkout } from './checkout.page';
import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { checkoutActions } from 'store/checkoutReducer';

const itens = [
	{
		id: 1,
		title: 'When you get lost in API testing',
		desc:
			"The toughest part is probably to figure out which type of tests to write and how to test some specific logic in your app - but don't give up! Paula will present a few tips she learned along the way that will hopefully make your life easier. In this talk, you will hear about different test types and when to use them, real examples based on PHPUnit and Postman, followed by some tools for checking the test quality",
		price: 100,
		date: 1611694310000,
		category: 'backend',
		userId: 1,
		imageUrl: 'https://pbs.twimg.com/media/EREoip3XsAEPDRp.jpg',
		quantity: 1,
	},
	{
		id: 2,
		title: 'YouTube for your business!',
		desc:
			'Aleksandar Ašković aka Kojot is one of the pioneers when it comes to regional YouTube expertise. His tech journey started at the age of 12 when he inserted the first coin into the arcade machine. In 1997 he becomes editor of the renowned Serbian magazine “Svet Kompjutera” and in 2001 he started his first TV show called Game Over. After that, it was time to become a bit serious so in 2019 KursorTV was born, a TV show that was covering mostly tech topics. In 2014 Aleksandar decided to make a switch in his career and dedicate his time to YouTube. During the last 5 years, he was focused on helping brands utilize this platform to a full extent. Kojot considers YouTube channel of “Sport Klub” the prime example of YouTube SEO power. Thanks to the great content and good optimization Sport Klub channel reached[masked] subscribers in under 18 months.',
		price: 25,
		date: 1611694310000,
		category: 'marketing',
		userId: 2,
		imageUrl: 'https://pbs.twimg.com/media/EL--sgSXYAAnOX2.jpg',
		quantity: 2,
	},
];

describe('checkout.page', () => {
	let server: nock.Scope;

	beforeAll(() => {
		server = nock(baseURL).defaultReplyHeaders({
			'access-control-allow-origin': '*',
			'access-control-allow-credentials': 'true',
		});
	});

	afterAll(() => {
		nock.restore();
	});

	afterEach(() => {
		nock.cleanAll();
		jest.resetAllMocks();
		cleanup();
	});

	it('should complete the order correctly', async () => {
		server
			.post(/\/orders/i, body => {
				expect(body.products).toEqual(itens);
				expect(body.id).toEqual(expect.any(Number));
				expect(body.total).toEqual(150);
				return true;
			})
			.delay(500)
			.reply(201);

		const { store } = renderPage(<Checkout />);
		store.dispatch(checkoutActions.start(itens));
		expect(server.isDone()).toEqual(false);
		await act(async () => {
			await userEvent.type(screen.getByTestId('firstName'), 'Bruno');
			await userEvent.type(screen.getByTestId('lastName'), 'Motta');
			await userEvent.type(screen.getByTestId('email'), 'wadge.motta@gmail.com');
			fireEvent.change(screen.getByTestId('dateOfBirth'), { target: { value: '2020-05-12' } });
			userEvent.selectOptions(screen.getByTestId('gender'), 'Male');
			await userEvent.type(screen.getByTestId('address'), 'R. Timoteo, 380, Santa Inês, Belo Horizonte - Minas GErais, Brasil');
			await userEvent.type(screen.getByTestId('zipCode'), '31035');
			expect(store.getState().checkout.isComplete).toEqual(false);
			fireEvent.click(screen.getByTestId('btn-checkout'));
		});
		await waitFor(() => expect(server.isDone()).toEqual(true));
		await waitFor(() => expect(store.getState().checkout.isComplete).toEqual(true));

		await waitFor(() => screen.getByText(/Thank you!/i));
		await waitFor(() => screen.getByText(/What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing/i));
		await waitFor(() => screen.getByText(/Back to Shop/i));
	});

	it('should validate the form correctly', async () => {
		server
			.post(/\/orders/i)
			.delay(500)
			.reply(201);

		const { store } = renderPage(<Checkout />);
		store.dispatch(checkoutActions.start(itens));
		expect(server.isDone()).toEqual(false);
		await act(async () => {
			expect(store.getState().checkout.isComplete).toEqual(false);
			fireEvent.click(screen.getByTestId('btn-checkout'));
		});
		await waitFor(() => screen.getByText(/First Name is a required field/i));
		await waitFor(() => screen.getByText(/Last Name is a required field/i));
		await waitFor(() => screen.getByText(/Email is a required field/i));
		await waitFor(() => screen.getByText(/Date is a required field/i));
		await waitFor(() => screen.getByText(/Gender is a required field/i));
		await waitFor(() => screen.getByText(/Address is a required field/i));

		await act(async () => {
			await userEvent.type(screen.getByTestId('firstName'), 'Bruno 1');
			await userEvent.type(screen.getByTestId('lastName'), 'Motta 1');
			await userEvent.type(screen.getByTestId('email'), 'wadge.motta');
			fireEvent.change(screen.getByTestId('dateOfBirth'), { target: { value: '2020-05-12' } });
			userEvent.selectOptions(screen.getByTestId('gender'), 'Male');
			await userEvent.type(screen.getByTestId('address'), 'R. Timoteo, 380, Santa Inês, Belo Horizonte - Minas GErais, Brasil');
			await userEvent.type(screen.getByTestId('zipCode'), '31035-203');
		});

		await waitFor(() => screen.getByText(/Email Address must be a valid email/i));
		await waitFor(() => screen.getByText(/First Name must be only letters/i));
		await waitFor(() => screen.getByText(/Last Name must be only letters/i));
		await waitFor(() => screen.getByText(/Zip Code be only digits/i));
	});

	it('should show the error message when the api returns an error', async () => {
		server
			.post(/\/orders/i)
			.delay(500)
			.reply(500);

		const { store } = renderPage(<Checkout />);
		store.dispatch(checkoutActions.start(itens));
		expect(server.isDone()).toEqual(false);
		await act(async () => {
			await userEvent.type(screen.getByTestId('firstName'), 'Bruno');
			await userEvent.type(screen.getByTestId('lastName'), 'Motta');
			await userEvent.type(screen.getByTestId('email'), 'wadge.motta@gmail.com');
			fireEvent.change(screen.getByTestId('dateOfBirth'), { target: { value: '2020-05-12' } });
			userEvent.selectOptions(screen.getByTestId('gender'), 'Male');
			await userEvent.type(screen.getByTestId('address'), 'R. Timoteo, 380, Santa Inês, Belo Horizonte - Minas GErais, Brasil');
			await userEvent.type(screen.getByTestId('zipCode'), '31035');
			expect(store.getState().checkout.isComplete).toEqual(false);
			fireEvent.click(screen.getByTestId('btn-checkout'));
		});
		await waitFor(() => screen.getByText(/An error occurred while trying to complete the purchase. Please try again./i));
	});
});
