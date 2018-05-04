import React from 'react';
import AccountBalance from './account-balance';
import TradeForm from './trade-form';
import { fetchRate } from '../actions';
import { connect } from 'react-redux';

import style from './crypto-currency-trader.css';

export class CryptoCurrencyTrader extends React.Component {

	componentDidMount() {
		/*
			Not initially fired on purpose to demonstrate validation
			this.props.dispatch(fetchRate());
		*/
		setInterval(() => {
			this.props.dispatch(fetchRate())
		}, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		console.log('new rate: ' + this.props.rate);
		return (
			<section className={style.cryptoCurrencyTrader}>
				<AccountBalance />
				<TradeForm />
			</section>
		);
	}

}

const mapStateToProps = state => ({
	rate: state.rate,
	loading: state.loading
});

export default connect(mapStateToProps)(CryptoCurrencyTrader);
