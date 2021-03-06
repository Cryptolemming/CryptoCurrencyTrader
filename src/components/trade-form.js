import React from 'react';
import { connect } from 'react-redux';
import { invokeTrade } from '../actions';
import style from './trade-form.css';

export class TradeForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			value: ''
		}
	}

	handleChangeInput(val) {
		this.setState({
			value: val
		})
	}

	handleSubmitTrade(e) {
		e.preventDefault();
		const value = this.refs.base.value;
		const conv = parseFloat(this.refs.conv.value);
		if (!(this.props.balances.USD - value < 0)
			&& this.props.balances.USD !== 0
			&& !isNaN(value)
			&& value !== ''
			&& this.props.rate !== undefined) {
			this.setState({
				value: ''
			})
			this.props.dispatch(invokeTrade(value, conv));
		}
	}

	render() {
		const rate = this.props.rate;
		const value = this.state.value;
		const quote = value === '' || isNaN(value) || isNaN(rate)
					? ''
					: parseFloat(value / rate).toFixed(8);
		const loading = rate === undefined
					  ? <span className={style.loading}>loading...</span>
					  : '';

		return (
			<form className={style.tradeForm} onSubmit={(e) => this.handleSubmitTrade(e)}>
				<fieldset>
					<label htmlFor='base'>Trade</label>
					<input
						type='text'
						className={style.type}
						value='USD'
						readOnly
					/>
					<input
						type='text'
						id='base'
						className={style.value}
						placeholder='Enter your amount'
						value={value}
						onChange={(e) => this.handleChangeInput(e.target.value)}
						ref="base"
					/>
					<label htmlFor='conv'>For</label>
					<input
						type='text'
						className={style.type}
						value='BTC'
						readOnly
					/>
					{loading}
					<input
						type='text'
						id='conv'
						className={style.value}
						placeholder='Display Quote'
						value={quote}
						ref="conv"
					/>
					<input
						type='submit'
						className={style.submitTrade}
						value='Trade'
					/>
				</fieldset>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	balances: state.balances,
	rate: state.rate,
})

export default connect(mapStateToProps)(TradeForm);
