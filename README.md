## CryptoCurrencyTrader

### `Introduction`
---
Currency Pair Trading user interface for market trade between USD and BTC.  Pulls the latest BTCUSD price from the Bitfinex (BFX) public API.  BTCUSD price is fetched and updated at interval to better assure user is acting on the interfaced BTC amount.  Balances are updated after a successful 'Trade'.

### `Install`
---
1. clone this repo
2. Run ```npm install```
3. Run ```npm start```

### `Tech`
---
Webpack setup: [Simple webpack boilerplate](https://github.com/pinglinh/simple_webpack_boiletplate)
Front-end: React, Redux
API: [(BFX) API](https://docs.bitfinex.com/v1/reference)
CORS proxy: [CORS-anywhere](http://cors-anywhere.herokuapp.com/)

### ``UI``
---
Mockup:                                                     
<a href="https://imgbb.com/"><img src="https://image.ibb.co/b9Ojr7/mockup.png" alt="mockup" border="0"></a>

Prototype:
<a href="https://imgbb.com/"><img src="https://image.ibb.co/hHo64S/prototype.png" alt="prototype" border="0"></a>

Initial fetch request loading:
<a href="https://imgbb.com/"><img src="https://image.ibb.co/c3DHTn/loading.png" alt="loading" border="0"></a>

### ``Functionality``
---
User can enter a USD amount and see a quote for the converted BTC amount.  Changes to the entered amount are immediately re-converted in the quote display.  User can submit a 'Trade' and see their account balances immediately updated to reflect their new account balances.  

The BTCUSD ticker symbol 'last_price' is fetched on interval every 10 seconds.  The converted BTC quote is re-converted on every newly fetched BTCUSD conversion rate.  This better ensures the user is seeing a moderately accurate quote - while not over-loading the API (experienced issues at anywhere between 3-8 second intervals).  

The USD amounts in trades and balances are capped at 2 decimal places.  The BTC amounts are capped at 8 decimal places as [1 BTC = 100,000,000 Satoshis](https://en.bitcoin.it/wiki/Satoshi_(unit)).

Initial loading - displays a small 'loading...' text while waiting for initial fetch response

Input validation - BTC converted quotes are only displayed if valid USD numbers are entered.  A 'Trade' can only be submitted if the USD and BTC amounts are valid, if the USD balance is sufficient, and if the initial fetch request has returned (fetch request not initially fired on ComponentDidMount() as demonstration).

Error handling - errors not currently displayed to user however are represented in state - including successful requests with response status 429

### ``Testing``
---
jest
enzyme
