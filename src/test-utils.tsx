import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { store } from './store';

export const renderPage = (component: React.ReactElement) => {
	const history = createMemoryHistory();
	const container = render(
		<Provider store={store}>
			{
				// tslint:disable-next-line: no-any
				<Router history={history as any}>{component}</Router>
			}
		</Provider>,
	);
	return { history, container };
};
