import React from "react";
import NumberFormat from 'react-number-format';

//import style from "./bankItem.sass";

class BankItem extends React.Component {
    render() {
        let refresh = this.props.bank.refresh.split(' ');
        let currentBankRate = {
            sell: this.props.pair.two !== 'rub' ? this.props.bank[this.props.pair.two][0].sell : this.props.bank[this.props.pair.one][0].sell,
            buy: this.props.pair.two !== 'rub' ? this.props.bank[this.props.pair.two][0].buy : this.props.bank[this.props.pair.one][0].buy
        }
        let address = undefined;
        let distance = {
            km: 0,
            ml: 0
        };
        if (typeof this.props.branches === 'string') {
            address = this.props.branches
        } else if (typeof this.props.branches === 'number') {
            address = `Филиалы: ${this.props.branches}`
        }

        return (
            <div className="timi-ex-bank timi-ui-cell-master" onClick={() => { this.props.setActiveBranches(this.props.bank.name) }}>
                <div className="timi-ex-name timi-ex-fav-to timi-ui-cell-slave">
                    <span className="timi-ex-name-fader">{this.props.bank.name}</span>
                    <div className="timi-ex-street">{address}</div>
                </div>
                <div className="timi-ex-buy timi-ui-cell-slave">
                    <NumberFormat
                        value={this.props.exchange.buy}
                        displayType={'text'}
                        thousandSeparator={' '}
                        renderText={value => <span>{value}</span>} />
                    <div className="timi-ex-buy-delta timi-delta-plus">
                        {currentBankRate.sell} RUB
              </div>
                </div>
                <div className="timi-ex-sell timi-ui-cell-slave">
                    {distance.km} км.
              <div className="timi-ex-buy-delta timi-delta-plus">
                    Филиалы
              </div>
                </div>
                <div className="timi-ex-fresh timi-ui-cell-slave">
                    {refresh[0]}
                    <div className="timi-ex-fresh-date">{refresh[1]}</div>
                </div>
            </div>
        );
    }
}

export default BankItem;
