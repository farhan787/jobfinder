import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

function saveToLocalStorage(state) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		console.log(err);
	}
}

function loadFromLocalStorage() {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (err) {
		console.log(err);
		return undefined;
	}
}

const persistedState = loadFromLocalStorage();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	persistedState,
	composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
