import React from "react";

import BanksList from "../content/banksList/BanksList";
import MapBox from "../map/mapBox/MapBox";

//import style from "./exchanger.sass";


class Exchanger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            multiplier: 1000,
            staticMultiplier: 1000,
            pair: {
                one: "usd",
                two: "rub"
            },
            sorting: {
                data: "distance",
                type: "ASC"
            },
            selectedBankInfo: {
                geometry: ''
            },
            dict: {
                exchangeOffice: ['Exchange office', 'Пункт обмена'],
                distance: ['Distance', 'Расстояние'],
                exchange: ['Exchange', 'Обмен'],
                km: ['Km.', 'Км.'],
                min: ['min.', 'мин']
            }
        };

        this.getPair = this.getPair.bind(this);
        this.switchPair = this.switchPair.bind(this);
        this.getSorting = this.getSorting.bind(this);
        this.ExchangerStateSetter = this.ExchangerStateSetter.bind(this);

    }

    ExchangerStateSetter(obj) {
        this.setState(obj);
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

    getSorting(transfer) {
        let sort = {
            data: transfer,
            type: ''
        }

        this.state.sorting.type === 'DESC' ? sort.type = 'ASC' : sort.type = 'DESC';

        this.setState({
            sorting: {
                data: sort.data,
                type: sort.type
            }
        })
    }

    exchange() {
        const exchange = [];
        if (this.state.pair.one === 'rub' || this.state.pair.two === 'rub') {
            exchange.buy = this.props.banks.map(rate => {
                return this.state.pair.two !== 'rub' ?
                    this.state.staticMultiplier / rate[this.state.pair.two][0].sell :
                    this.state.staticMultiplier * rate[this.state.pair.one][0].buy
            });
            exchange.sell = this.props.banks.map(rate => {
                return this.state.pair.two !== 'rub' ?
                    this.state.staticMultiplier / rate[this.state.pair.two][0].buy :
                    this.state.staticMultiplier * rate[this.state.pair.one][0].sell
            });
        } else {
            exchange.buy = this.props.banks.map(rate => {
                return (this.state.staticMultiplier * rate[this.state.pair.one][0].sell) / rate[this.state.pair.two][0].buy;
            })
            exchange.sell = this.props.banks.map(rate => {
                return (this.state.staticMultiplier * rate[this.state.pair.one][0].buy) / rate[this.state.pair.two][0].sell;
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
        const { multiplier, staticMultiplier, sorting, pair, selectedBankInfo, dict } = this.state;
        return (
            <div>
                <MapBox
                    banks={this.props.banks}
                    selectedBankInfo={selectedBankInfo}
                    setActiveBank={this.props.setActiveBank}
                    term={this.props.term}
                    satellite={this.props.satellite}
                    ExchangerStateSetter={this.ExchangerStateSetter} />
                <div className="timi-ex">
                    <div className="timi-logical-hub">
                        <BanksList
                            lng={this.props.lng}
                            dict={dict}
                            multiplier={multiplier}
                            staticMultiplier={staticMultiplier}
                            banks={this.props.banks}
                            branches={this.props.branches}
                            pair={pair}
                            getPair={this.getPair}
                            switchPair={this.switchPair}
                            sorting={sorting}
                            getSorting={this.getSorting}
                            exchange={mxe}
                            term={this.props.term}
                            setActiveBank={this.props.setActiveBank}
                            ExchangerStateSetter={this.ExchangerStateSetter}
                            MONEY_EXCHANGE_API={this.props.MONEY_EXCHANGE_API} />
                    </div>
                </div>
            </div>
        );
    }

}

export default Exchanger;