import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import ConnectedAccountBalance, { AccountBalance } from '../src/components/account-balance';

/**********UNCONNECTED************/
describe(`AccountBalance Component --- Shallow Render`, () => {
	let component;
	const balances = {
		USD: 156.12,
		BTC: 0.00000000
	};

	beforeEach(() => {
		component = shallow(<AccountBalance balances={balances}/>)
	});

	it('+++ render UNCONNECTED component', () => {
		expect(component.length).toEqual(1);
	});
});

/**********CONNECTED************/
describe('AccountBalance Component --- Shallow + Passing Store', () => {
	const initialState = {
		balances: {
			USD: 156.12,
			BTC: 0.00000000
		}
	};
	const mockStore = configureStore();
	let store, container;

	beforeEach(() => {
		store = mockStore(initialState);
		container = shallow(<ConnectedAccountBalance store={store} />);
	});

	it('+++ render CONNECTED component', () => {
		expect(container.length).toEqual(1);
	})

	it('+++ match Props and InitialState', () => {
		expect(container.prop('balances')).toEqual(initialState.balances);
	});
});
