import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { cryptoCurrencyTraderReducer } from './reducers';

export default createStore(
	cryptoCurrencyTraderReducer,
	applyMiddleware(thunk)
);
