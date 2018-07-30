import React from "react";

import Pair from "../../forms/pair/Pair";
import Sorting from "../../forms/sorting/Sorting";
import BankItem from "../bankItem/BankItem";

//import style from "./banksList.sass";

class BanksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outputOffset: { marginTop: '261px' }
        }
    }

    getList(banks) {
        let listing = banks.map((bank, i) => {
            return <BankItem
                lng={this.props.lng}
                dict={this.props.dict}
                bank={bank}
                pair={this.props.pair}
                term={this.props.term}
                exchange={this.props.exchange[i]}
                setActiveBank={this.props.setActiveBank}
                ExchangerStateSetter={this.props.ExchangerStateSetter}
                key={i}
                MONEY_EXCHANGE_API={this.props.MONEY_EXCHANGE_API} />
        });
        return listing;
    }

    setSorting(arr) {
        if (this.props.sorting.data === 'buy') {
            if (this.props.sorting.type === 'DESC') {
                arr.sort((a, b) => {
                    return b.props.exchange.buy - a.props.exchange.buy
                });
            } else {
                arr.sort((a, b) => {
                    return a.props.exchange.buy - b.props.exchange.buy
                });
            }
        } else if (this.props.sorting.data === 'distance') {
            if (this.props.sorting.type === 'DESC') {
                arr.sort((a, b) => {
                    return b.props.bank.distance - a.props.bank.distance
                });
            } else {
                arr.sort((a, b) => {
                    return a.props.bank.distance - b.props.bank.distance
                });
            }
        }

        return arr;
    }

    setBank = (first) => {
        this.props.setActiveBank(first._id);
    }

    componentDidMount() {
        this.setState({
            outputOffset: { marginTop: `${document.getElementById('timiExFilter').offsetHeight}px` }
        }) 
    }

    render() {
        let listing = this.getList(this.props.banks);
        let output = this.setSorting(listing);

        return (
            <div className="timi-ex-list" style={this.state.outputOffset}>
                <div id="timiExFilter" className="timi-ex-filter">
                    <Pair
                        multiplier={this.props.multiplier}
                        ExchangerStateSetter={this.props.ExchangerStateSetter}
                        pair={this.props.pair}
                        getPair={this.props.getPair}
                        switchPair={this.props.switchPair} />
                    <Sorting
                        lng={this.props.lng}
                        dict={this.props.dict}
                        sorting={this.props.sorting}
                        getSorting={this.props.getSorting} />
                </div>
                {output}
            </div>
        );
    }

}

export default BanksList;
