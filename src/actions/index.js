export const INVOKE_TRADE = 'INVOKE_TRADE';
export const invokeTrade = (amountUSD, amountBTC) => ({
	type: INVOKE_TRADE,
	amountUSD,
	amountBTC
})

export const FETCH_RATE_SUCCESS = 'FETCH_RATE';
export const fetchRateSuccess = rate => ({
	type: FETCH_RATE_SUCCESS,
	rate
})

export const FETCH_RATE_ERROR = 'FETCH_RATE_ERROR';
export const fetchRateError = error => ({
	type: FETCH_RATE_ERROR,
	error
})

export const fetchRate = () => dispatch => {
	fetch('http://cors-anywhere.herokuapp.com/https://api.bitfinex.com/v1/pubticker/BTCUSD', {
	  mode: 'cors'
	})
	.then(res => {
		return res.json();
	})
	.then(rate => {
		if (rate['error']) {
			dispatch(fetchRateError(rate['error']));
		} else {
			dispatch(fetchRateSuccess(rate['last_price']));
		}
	})
	.catch(err => {
		dispatch(fetchRateError(err));
	})
}
