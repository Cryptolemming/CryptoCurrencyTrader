import React from 'react';
import { shallow, mount } from 'enzyme';

import { CryptoCurrencyTrader } from '../src/components/crypto-currency-trader';

describe('<CryptoCurrencyTrader />', () => {
	it('Renders without crashing', () => {
		shallow(<CryptoCurrencyTrader />);
	});
});
