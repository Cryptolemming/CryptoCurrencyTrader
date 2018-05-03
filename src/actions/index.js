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

export const fetchRate = () => dispatch => {
	fetch('http://cors-anywhere.herokuapp.com/https://api.bitfinex.com/v1/pubticker/BTCUSD', {
	  mode: 'cors'
	})
	.then(res => {
		return res.json();
	})
	.then(rate => {
		dispatch(fetchRateSuccess(rate['last_price']))
	})
	.catch(err => {
		console.log(err);
	})
}
