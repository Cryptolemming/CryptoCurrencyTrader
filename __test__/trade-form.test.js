import React from 'react';
import {shallow, mount} from 'enzyme';

import TradeForm from '../src/components/trade-form';

describe('<TradeForm />', () => {
    it('Renders without crashing', () => {
        shallow(<TradeForm />);
    });
});
