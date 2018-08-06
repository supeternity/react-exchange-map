import React from "react";
import { List } from 'react-virtualized'

import Pair from "../../forms/pair/Pair";
import Sorting from "../../forms/sorting/Sorting";
import BankItem from "../bankItem/BankItem";

//import style from "./banksList.sass";

let output = [];

class BanksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterHeight: { marginTop: '261px' },
            listLayout: {
                width: 300,
                height: 300,
                cell: 150
            }
        }

        this.setBank = this.setBank.bind(this.setBank);
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
                setActiveBank={this.setBank}
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

    setBank = async (selectedBankInfo) => {
        let geometry;
        geometry = await fetch(`${this.props.MONEY_EXCHANGE_API}/route/${this.props.term.termId}/${selectedBankInfo.lon},${selectedBankInfo.lat}/`);
        geometry = await geometry.json();
        selectedBankInfo.geometry = geometry;

        let stateSetter = {
            selectedBankInfo
        }

        this.props.ExchangerStateSetter(stateSetter);
        this.props.setActiveBank(selectedBankInfo._id);
    }

    rowRenderer = ({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
    }) => {
        return (
            <div
                key={key}
                style={style}
            >
                {output[index]}
            </div>
        )
    }

    componentDidMount() {
        let listContainer = document.getElementById('timiExList');
        let listItem = document.getElementsByClassName('timi-ex-bank timi-ui-cell-master')[0];
        let filter = document.getElementById('timiExFilter');
        this.setState({
            filterHeight: filter.offsetHeight,
            listLayout: {
                width: listContainer.offsetWidth,
                height: window.innerHeight - filter.offsetHeight,
                cell: document.getElementsByClassName('timi-ex-bank timi-ui-cell-master')[0].clientHeight - (window.getComputedStyle(listItem, null).getPropertyValue('padding-top').replace('px', '') * 3.7)
            }
        });
        setTimeout(() => {
            this.setBank(output[0].props.bank);
        }, 1000)
    }

    render() {
        // let rerenderBy = this.props.multiplier, this.props.sorting;
        output = this.setSorting(this.getList(this.props.banks));
        let { multiplier,
              staticMultiplier,
              sorting,
              ExchangerStateSetter,
              pair,
              getPair,  
              getSorting,
              switchPair,
              lng,
              dict,
              banks } = this.props;
        let listRerender = { sorting, ...staticMultiplier };
        return (
            <div className="timi-ex-list" id="timiExList" style={{marginTop: `${this.state.filterHeight}px`}}>
                <div id="timiExFilter" className="timi-ex-filter">
                    <Pair
                        multiplier={multiplier}
                        ExchangerStateSetter={ExchangerStateSetter}
                        pair={pair}
                        getPair={getPair}
                        switchPair={switchPair} />
                    <Sorting
                        lng={lng}
                        dict={dict}
                        sorting={sorting}
                        getSorting={getSorting} />
                </div>
                <List 
                   width={this.state.listLayout.width}
                   height={this.state.listLayout.height}
                   rowCount={banks.length}
                   rowHeight={this.state.listLayout.cell}
                   rowRenderer={this.rowRenderer}
                   sortBy={listRerender} />
            </div>
        );
    }

}

export default BanksList;
