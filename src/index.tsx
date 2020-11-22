// react imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Service Worker
import * as serviceWorker from './serviceWorker';

// Components
import { App } from './App';

// Components Configs
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Provider } from 'react-redux';

import './index.scss';

// lib configs
import { configs } from 'configs';
configs();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<App />
				</Router>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
