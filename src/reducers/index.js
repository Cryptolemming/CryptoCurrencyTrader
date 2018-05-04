import * as ACTIONS from '../actions';

const initialState = {
	balances: {
		USD: 156.12,
		BTC: 0.0000000
	},
	rate: undefined,
	error: undefined
}

export function cryptoCurrencyTraderReducer(state = initialState, action) {
	switch(action.type) {
		case ACTIONS.FETCH_RATE_SUCCESS:
			return Object.assign({}, state, {
				rate: action.rate,
			});
		case ACTIONS.FETCH_RATE_ERROR:
			return Object.assign({}, state, {
				error: action.error
			});
		case ACTIONS.INVOKE_TRADE:
			const newBalanceBTC = state.balances.BTC + parseFloat(action.amountBTC);
			const newBalanceUSD = (state.balances.USD - action.amountUSD).toFixed(2);
			return Object.assign({}, state, {
				balances: {
					USD: newBalanceUSD,
					BTC: parseFloat(newBalanceBTC.toFixed(8))
				}
			})
		default:
			return state;
	}
}
