import React from 'react';
import { connect } from 'react-redux';

import style from './account-balance.css';

export class AccountBalance extends React.Component {

	render() {
		let { USD, BTC } = this.props.balances;
		BTC = parseFloat(BTC);
		return(
			<div className={style.accountBalance}>
				<span className={style.title}>Account Balance</span>
				<ul>
					<li>
						<span className={style.currency}>USD</span>
						<span className={style.balance}>{USD}</span>
					</li>
					<li>
						<span className={style.currency}>BTC</span>
						<span className={style.balance}>{BTC.toFixed(8)}</span>
					</li>
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	balances: state.balances
});

export default connect(mapStateToProps)(AccountBalance);
