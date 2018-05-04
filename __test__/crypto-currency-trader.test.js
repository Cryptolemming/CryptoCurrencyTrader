import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import ConnectedCryptoCurrencyTrader from '../src/components/crypto-currency-trader';
import { CryptoCurrencyTrader }  from '../src/components/crypto-currency-trader';

/***********UNCONNECTED**************/
describe('CryptoCurrencyTrader Component --- Shallow Render', () => {
	let component;

	beforeEach(() => {
		component = shallow(<CryptoCurrencyTrader />)
	});

	it('+++ render UNCONNECTED component', () => {
		expect(component.length).toEqual(1);
	});
});

/************CONNECTED**************/
describe('CryptoCurrencyTrader Component --- Shallow + Passing Store', () => {
	const initialState = {
		rate: 9555,
	};
	const mockStore = configureStore();
	let store, container;

	beforeEach(() => {
		store = mockStore(initialState);
		container = shallow(<ConnectedCryptoCurrencyTrader store={store} />)
	});

	it('+++ render CONNECTED component', () => {
		expect(container.length).toEqual(1);
	})

	it('+++ match Props and InitialState', () => {
		expect(container.prop('rate')).toEqual(initialState.rate);
	});
});
