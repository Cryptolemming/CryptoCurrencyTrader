import * as ACTIONS from '../actions';

const initialState = {
	balances: {
		BTC: 0.0000000,
		USD: 156.12
	},
	rate: undefined
}

export function cryptoCurrencyTraderReducer(state = initialState, action) {
	switch(action.type) {
		case ACTIONS.FETCH_RATE_SUCCESS:
			return Object.assign({}, state, {
				rate: action.rate
			});
		case ACTIONS.INVOKE_TRADE:
			const newBalanceBTC = state.balances.BTC + parseFloat(action.amountBTC);
			const newBalanceUSD = (state.balances.USD - action.amountUSD).toFixed(2);
			return Object.assign({}, state, {
				balances: {
					BTC: newBalanceBTC,
					USD: newBalanceUSD
				}
			})
		default:
			return state;
	}
}
