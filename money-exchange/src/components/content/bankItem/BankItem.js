import React from "react";
import NumberFormat from 'react-number-format';

//import style from "./bankItem.sass";

class BankItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.setBank = this.setBank.bind(this.setBank);
    }

    setBank = () => {
        this.props.setActiveBank(this.props.bank);
    }

    render() {
        //let refresh = this.props.bank.refresh.split(' ');
        let currentBankRate = {
            sell: this.props.pair.two !== 'rub' ? this.props.bank[this.props.pair.two][0].sell : this.props.bank[this.props.pair.one][0].sell,
            buy: this.props.pair.two !== 'rub' ? this.props.bank[this.props.pair.two][0].buy : this.props.bank[this.props.pair.one][0].buy
        }
        let address
        if (/ул\.\s.*|просп\.\s.*|наб\.\s.*|пл\.\s.*|ш\.\s.*|бул\.\s.*|\d.я.*|\d.й.*/g.test(this.props.bank.address)) {
            address = this.props.bank.address.match(/ул\.\s.*|просп\.\s.*|наб\.\s.*|пл\.\s.*|ш\.\s.*|бул\.\s.*|\d.я.*|\d.й.*/g)[0];
        } else {
            address = this.props.bank.address;
        }
        if (typeof this.props.branches === 'string') {
            address = this.props.branches
        } else if (typeof this.props.branches === 'number') {
            address = `Филиалы: ${this.props.branches}`
        }
        let classer = {
            item: `timi-ex-bank timi-ui-cell-master`
        }
        if (this.props.bank.selected === true) {
            classer.item = `timi-ex-bank timi-ui-cell-master timi-list-item-selected`;
        }

        return (
            <div className={classer.item} onClick={this.setBank}>
                <div className="timi-ex-name timi-ex-fav-to timi-ui-cell-slave" style={{ backgroundImage: `url('${process.env.REACT_APP_API_HOST}/money-exchange/logos/${this.props.bank.logoFile}')` }}>
                    <span className="timi-ex-name-fader">{this.props.bank.bank}</span>
                    <div className="timi-ex-street">{address}</div>
                </div>
                <div className="timi-ex-sell timi-ui-cell-slave">
                    {this.props.bank.distance} {this.props.lng === 'en' ? this.props.dict.km[0] : this.props.dict.km[1]}
                    <div className="timi-ex-buy-delta timi-delta-plus">
                        <span className="timi-ex-caaaar">{this.props.bank.duration} {this.props.lng === 'en' ? this.props.dict.min[0] : this.props.dict.min[1]}</span>
                    </div>
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
                {/* <div className="timi-ex-fresh timi-ui-cell-slave">
                    {refresh[0]}
                    <div className="timi-ex-fresh-date">{refresh[1]}</div>
                </div> */}
            </div>
        );
    }
}

export default BankItem;
