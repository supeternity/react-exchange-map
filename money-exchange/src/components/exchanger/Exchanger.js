import React from "react";

import Pair from "../forms/pair/Pair";
import Sorting from "../forms/sorting/Sorting";
import BanksList from "../content/banksList/BanksList";
import MapBox from "../map/mapBox/MapBox";

import style from "./exchanger.sass";


class Exchanger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            multiplier: 10000,
            pair: {
                one: "rub",
                two: "usd"
            },
            sorting: {
                trade: "buy",
                type: "DESC"
            }
        };

        this.getMultiply = this.getMultiply.bind(this);
        this.getPair = this.getPair.bind(this);
        this.switchPair = this.switchPair.bind(this);
        this.getSorting = this.getSorting.bind(this);
    }

    getMultiply(newMultiply) {
        this.setState({
            multiplier: newMultiply
        })
    }

    getPair(type, pair) {
        type === 'one' ? this.setState({
            pair: {
                one: pair,
                two: this.state.pair.two
            }
        }
        ) : this.setState({
            pair: {
                one: this.state.pair.one,
                two: pair
            }
        })
    }

    switchPair() {
        this.setState({
            pair: {
                one: this.state.pair.two,
                two: this.state.pair.one
            }
        })
    }

    getSorting(trade) {
        let sort = {
            trade: trade,
            type: ''
        }

        this.state.sorting.type === 'DESC' ? sort.type = 'ASC' : sort.type = 'DESC';

        this.setState({
            sorting: {
                trade: sort.trade,
                type: sort.type
            }
        })
    }

    exchange() {
        const exchange = [];
        if (this.state.pair.one === 'rub' || this.state.pair.two === 'rub') {
            exchange.buy = this.props.rates.bank.map((rate) => {
                return this.state.pair.two !== 'rub' ?
                    this.state.multiplier / rate[this.state.pair.two][0].sell :
                    this.state.multiplier * rate[this.state.pair.one][0].buy
            });
            exchange.sell = this.props.rates.bank.map((rate) => {
                return this.state.pair.two !== 'rub' ?
                    this.state.multiplier / rate[this.state.pair.two][0].buy :
                    this.state.multiplier * rate[this.state.pair.one][0].sell
            });
        } else {
            exchange.buy = this.props.rates.bank.map((rate) => {
                return (this.state.multiplier * rate[this.state.pair.one][0].sell) / rate[this.state.pair.two][0].buy;
            })
            exchange.sell = this.props.rates.bank.map((rate) => {
                return (this.state.multiplier * rate[this.state.pair.one][0].buy) / rate[this.state.pair.two][0].sell;
            })
        }

        let sorter = [];
        sorter = exchange.buy.map((mxeBitem, i) => {
            return { buy: mxeBitem.toFixed(2), sell: exchange.sell[i].toFixed(2) }
        });

        return sorter;
    }

    render() {
        let mxe = this.exchange();
        const { multiplier, sorting, pair } = this.state;

        return (
            <div>
                <MapBox
                    branches={this.props.branches}
                    term={this.props.term}
                    mbtoken={this.props.mbtoken} />
                <div className="timi-ex">
                    <div className="timi-logical-hub">
                        <div className="timi-ex-filter">
                            <Pair
                                multiplier={multiplier}
                                getMultiply={this.getMultiply}
                                pair={pair}
                                getPair={this.getPair}
                                switchPair={this.switchPair} />
                            <Sorting
                                sorting={sorting}
                                getSorting={this.getSorting} />
                        </div>
                        <BanksList
                            bank={this.props.rates.bank}
                            branches={this.props.branches}
                            pair={this.state.pair}
                            sorting={sorting}
                            setActiveBranches={this.props.setActiveBranches}
                            exchange={mxe} />
                    </div>
                </div>
            </div>
        );
    }

}

export default Exchanger;