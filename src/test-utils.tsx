import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { reducers } from './store';
import { createStore } from 'redux';
import { SWRConfig } from 'swr';

export const renderPage = (component: React.ReactElement, path = '/') => {
	const history = createMemoryHistory({ initialEntries: [path] });
	const store = createStore(reducers);
	const container = render(
		<Provider store={store}>
			{
				// tslint:disable-next-line: no-any
				<Router history={history as any}>
					<SWRConfig value={{ dedupingInterval: 0, errorRetryInterval: 500 }}>{component}</SWRConfig>
				</Router>
			}
		</Provider>,
	);
	return { history, container, store };
};

export const baseURL = 'http://integration-test.com';
