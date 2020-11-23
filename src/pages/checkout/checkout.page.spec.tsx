import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { renderPage, baseURL } from 'test-utils';
import { Checkout } from './checkout.page';
import nock from 'nock';
import userEvent from '@testing-library/user-event';

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
			.post(/\/orders/i)
			.delay(500)
			.reply(201);

		const { store } = renderPage(<Checkout />);
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
