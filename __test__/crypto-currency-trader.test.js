import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import nock from 'nock';

import * as Actions from '../src/actions';
import { cryptoCurrencyTraderReducer } from '../src/reducers';

import ConnectedCryptoCurrencyTrader, { CryptoCurrencyTrader } from '../src/components/crypto-currency-trader';

/***********UNCONNECTED COMPONENT**************/
describe('CryptoCurrencyTrader Component --- Shallow Render', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<CryptoCurrencyTrader />)
	});

	it('should render UNCONNECTED component', () => {
		expect(wrapper.length).toEqual(1);
	});


});

/************CONNECTED Shallow COMPONENT**************/
describe('CryptoCurrencyTrader Component --- Shallow + Passing Store', () => {
	const initialState = {
		rate: 9555,
	};
	const mockStore = configureMockStore();
	let store, wrapper;

	beforeEach(() => {
		store = mockStore(initialState);
		wrapper = shallow(<ConnectedCryptoCurrencyTrader store={store} />)
	});

	it('should render CONNECTED component', () => {
		expect(wrapper.length).toEqual(1);
	})

	it('should match Props and InitialState', () => {
		expect(wrapper.prop('rate')).toEqual(initialState.rate);
	});
});

/**********CONNECTED Mounted COMPONENT************/
describe('CryptoCurrencyTrader Component --- Mounted + Passing Store', () => {
	const initialState = {
		balances: {
			USD: 156.12,
			BTC: 0.00000000
		},
	};

	const mockStore = configureMockStore();
	let store, wrapper;
	beforeEach(() => {
		store = mockStore(initialState);
		wrapper = mount(
			<Provider store={store}>
				<ConnectedCryptoCurrencyTrader />
			</Provider>
		);
	});

	it('should render CONNECTED component', () => {
		expect(wrapper.length).toEqual(1);
	});

	/*
	it('should check Prop matches with initialState', () => {
		const props = wrapper.find('CryptoCurrencyTrader').props();
		console.log(props);
		expect(props.balances).toEqual(initialState.balances);
	})
	*/

	it('should contain 1 section, 1 AccountBalance and 1 TradeForm', () => {
		expect(wrapper.find('section').length).toEqual(1);
		expect(wrapper.find('AccountBalance').length).toEqual(1);
		expect(wrapper.find('TradeForm').length).toEqual(1);
	});

	it('should contain span with class title that contains Account Balance', () => {
		expect(wrapper.find('.title').text()).toEqual('Account Balance');
	});
});

/**********REDUCER TESTS************/
describe('Reducers', () => {
	it('should should invoke a trade', () => {
		let state = {
			balances: {
				USD: 156.12,
				BTC: 0.0000000
			},
		};

		state = cryptoCurrencyTraderReducer(state, Actions.invokeTrade(56.12, 56.12/9555));
		expect(state.balances).toEqual({ USD: (100).toFixed(2), BTC: parseFloat((56.12/9555).toFixed(8)) });
	});
})

/**********ASYNC ACTION TESTS************/
describe('Async fetch request action', () => {
	const mockStore = configureMockStore([thunk]);

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	})

    it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
      fetchMock
        .getOnce('http://cors-anywhere.herokuapp.com/https://api.bitfinex.com/v1/pubticker/BTCUSD', { body: { rate: 9555 }, headers: { 'content-type': 'application/json', 'mode': 'cors' } })

      const expectedActions = [
        { type: Actions.FETCH_RATE_SUCCESS, body: { rate: 9555 } }
      ]
      const store = mockStore({ rate: undefined })
	  console.log(store);
      return store.dispatch(Actions.fetchRate()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
});
