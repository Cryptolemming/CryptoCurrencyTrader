import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CryptoCurrencyTrader from './components/crypto-currency-trader';
import store from './store';

import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<CryptoCurrencyTrader />
	</Provider>,
	document.getElementById('root')
);
