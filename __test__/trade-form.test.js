import React from 'react';
import {shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import * as Actions from '../src/actions';
import { createStore } from 'redux';
import { cryptoCurrencyTraderReducer } from '../src/reducers';

import ConnectedTradeForm, { TradeForm } from '../src/components/trade-form';

/***********UNCONNECTED COMPONENT**************/
describe('TradeForm Component --- Shallow Render', () => {
	let component;

	beforeEach(() => {
		component = shallow(<TradeForm />);
	});

    it('should render UNCONNECTED component', () => {
        expect(component.length).toEqual(1);
    });
});

/************CONNECTED Shallow COMPONENT**************/
describe('TradeForm Component --- Shallow + Passing Store', () => {
	const initialState = {
		rate: 9555,
		balances: {
			USD: 156.12,
			BTC: 0.00000000
		}
	};
	const mockStore = configureMockStore();
	let store, wrapper;

	beforeEach(() => {
		store = mockStore(initialState);
		wrapper = shallow(<ConnectedTradeForm store={store} />);
	});

	it('should render CONNECTED component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('should match Props and InitialState', () => {
		expect(wrapper.prop('rate')).toEqual(initialState.rate);
		expect(wrapper.prop('balances')).toEqual(initialState.balances);
	});
});

/************CONNECTED Mounted COMPONENT**************/
describe('TradeForm Component --- Mounted + Passing Store', () => {
	const initialState = {
		rate: 9555,
		balances: {
			USD: 156.12,
			BTC: 0.00000000
		}
	};
	const mockStore = configureMockStore();
	let store, wrapper;

	beforeEach(() => {
		store = mockStore(initialState);
		wrapper = mount(
			<Provider store={store}>
				<ConnectedTradeForm />
			</Provider>
		);
	});

	it('should render CONNECTED component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('should match Props and with passed initialState', () => {
		const props = wrapper.find('TradeForm').props();
		expect(props.rate).toEqual(initialState.rate);
		expect(props.balances).toEqual(initialState.balances);
	});

	it('should contain 1 form, 1 fieldset, 2 labels, 4 inputs', () => {
		expect(wrapper.find('form').length).toEqual(1);
		expect(wrapper.find('fieldset').length).toEqual(1);
		expect(wrapper.find('label').length).toEqual(2);
		expect(wrapper.find('input').length).toEqual(5);
	});

});

/************ACTION TESTS**************/
describe('Actions', () => {
	it('should should create an action to invoke a trade', () => {
		const amountUSD = 100;
		const amountBTC = 0.0000000 + (56.12/9555);
		const expectedAction = {
			type: Actions.INVOKE_TRADE,
			amountUSD,
			amountBTC,
		};
		expect(Actions.invokeTrade(amountUSD, amountBTC)).toEqual(expectedAction);
	});
});
