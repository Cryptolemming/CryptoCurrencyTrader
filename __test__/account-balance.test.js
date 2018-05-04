import React from 'react';
import { shallow, mount } from 'enzyme';

import { AccountBalance } from '../src/components/account-balance';

describe(`<AccountBalance />`, () => {
	it('Renders without crashing', () => {
		shallow(<AccountBalance />);
	});
});
