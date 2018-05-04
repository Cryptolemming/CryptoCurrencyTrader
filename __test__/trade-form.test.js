import React from 'react';
import {shallow, mount} from 'enzyme';
import configureStore from 'redux-mock-store';

import ConnectedTradeForm, { TradeForm } from '../src/components/trade-form';

/***********UNCONNECTED**************/
describe('TradeForm Component --- Shallow Render', () => {
	let component;

	beforeEach(() => {
		component = shallow(<TradeForm />);
	});

    it('+++ render UNCONNECTED component', () => {
        expect(component.length).toEqual(1);
    });
});

/************CONNECTED**************/
describe('TradeForm Component --- Shallow + Passing Store', () => {
	const initialState = {
		rate: 9555,
		balances: {
			USD: 156.12,
			BTC: 0.00000000
		}
	};
	const mockStore = configureStore();
	let store, container;

	beforeEach(() => {
		store = mockStore(initialState);
		container = shallow(<ConnectedTradeForm store={store} />);
	});

	it('+++ render CONNECTED component', () => {
		expect(container.length).toEqual(1);
	});

	it('+++ match Props and InitialState', () => {
		expect(container.prop('rate')).toEqual(initialState.rate);
		expect(container.prop('balances')).toEqual(initialState.balances);
	});
});
