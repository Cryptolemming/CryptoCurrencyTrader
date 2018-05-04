import React from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import style from './account-balance.css';

export class AccountBalance extends React.Component {

	render() {
		const balances = this.props.balances;

		const accountBalances = Object.keys(balances).map(curr => {
			let currency = balances[curr];
			if (currency === 'BTC') {
				currency = parseFloat(currency).toFixed(8);
			}
			return (
				<li key={uuidv4()}>
					<span className={style.currency}>{curr}</span>
					<span className={style.balance}>{currency}</span>
				</li>
			)
		})

		return(
			<div className={style.accountBalance}>
				<span className={style.title}>Account Balance</span>
				<ul>
					{accountBalances}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	balances: state.balances
});

export default connect(mapStateToProps)(AccountBalance);
