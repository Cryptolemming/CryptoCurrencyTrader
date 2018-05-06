import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import * as Actions from '../src/actions';
import { cryptoCurrencyTraderReducer } from '../src/reducers';

import ConnectedAccountBalance, { AccountBalance } from '../src/components/account-balance';

/**********UNCONNECTED COMPONENT************/
describe(`AccountBalance Component --- Shallow Render`, () => {
	let component;
	const balances = {
		USD: 156.12,
		BTC: 0.00000000
	};

	beforeEach(() => {
		component = shallow(<AccountBalance balances={balances}/>)
	});

	it('should render UNCONNECTED component', () => {
		expect(component.length).toEqual(1);
	});
});

/**********CONNECTED Shallow COMPONENT************/
describe('AccountBalance Component --- Shallow + Passing Store', () => {
	const initialState = {
		balances: {
			USD: 156.12,
			BTC: 0.00000000
		}
	};
	const mockStore = configureStore();
	let store, wrapper;

	beforeEach(() => {
		store = mockStore(initialState);
		wrapper = shallow(<ConnectedAccountBalance store={store} />);
	});

	it('should render CONNECTED component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('should match Props and InitialState', () => {
		expect(wrapper.prop('balances')).toEqual(initialState.balances);
	});
});

/**********CONNECTED Mounted COMPONENT************/
describe('AccountBalance Component --- Mounted + Passing Store', () => {
	const initialState = {
		balances: {
			USD: 156.12,
			BTC: 0.00000000
		},
	};

	const mockStore = configureStore();
	let store, wrapper;
	beforeEach(() => {
		store = mockStore(initialState);
		wrapper = mount(
			<Provider store={store}>
				<ConnectedAccountBalance />
			</Provider>
		);
	});

	it('should render CONNECTED component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('should check Prop matches with initialState', () => {
		const props = wrapper.find('AccountBalance').props();
		expect(props.balances).toEqual(initialState.balances);
	})

	it('should contain 1 div, 5 spans, 1 ul and 2 li', () => {
		expect(wrapper.find('div').length).toEqual(1);
		expect(wrapper.find('span').length).toEqual(5);
		expect(wrapper.find('ul').length).toEqual(1);
		expect(wrapper.find('li').length).toEqual(2);
	});

	it('should contain span with class title that contains Account Balance', () => {
		expect(wrapper.find('.title').text()).toEqual('Account Balance');
	});

	it('should contain span with class currency that contain currency types', () => {
		const spans = wrapper.find('.currency');
		expect(spans.at(0).text()).toEqual('USD');
		expect(spans.at(1).text()).toEqual('BTC');
	});

	it('should contain span with class balance that contain currency values', () => {
		const balances = wrapper.find('AccountBalance').props().balances;
		const spans = wrapper.find('.balance');
		expect(parseFloat(spans.at(0).text())).toEqual(balances.USD);
		expect(parseFloat(spans.at(1).text()).toFixed(8)).toEqual((balances.BTC).toFixed(8));
	});
});
