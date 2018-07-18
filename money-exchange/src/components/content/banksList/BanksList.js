import React from "react";

import BankItem from "../bankItem/BankItem";
import BranchesList from "../branchesList/BranchesList";

//import style from "./banksList.sass";

class BanksList extends React.Component {

    getList(banks) {
        return banks.map((bank, i) => {
            let branches = this.props.branches.map(branch => {
                let res;
                if (branch.bank === bank.name) {
                    res = branch;
                }
                return res;
            }).filter(value => {
                return value !== undefined;
            });
            let branchOut;
            let branchCount;
            if (branches.length === 1) {
                branchOut = branches[0].address.match(/ул.*|просп.*/g)[0];
                branchCount = 1;
            } else {
                branchOut = branches[0].address.match(/ул.*|просп.*/g)[0];
                branchCount = +branches.length;
                console.log(branchCount);
            }
            return <BankItem
                bank={bank}
                branches={branchOut}
                bracnhesCount={branchCount}
                pair={this.props.pair}
                exchange={this.props.exchange[i]}
                setActiveBranches={this.props.setActiveBranches}
                key={i} />
        });
    }

    setSorting(arr) {
        if (this.props.sorting.trade === 'buy') {
            if (this.props.sorting.type === 'DESC') {
                arr.sort((a, b) => {
                    return b.props.exchange.buy - a.props.exchange.buy
                });
            } else {
                arr.sort((a, b) => {
                    return a.props.exchange.buy - b.props.exchange.buy
                });
            }
        } else {
            if (this.props.sorting.type === 'DESC') {
                arr.sort((a, b) => {
                    return b.props.exchange.sell - a.props.exchange.sell
                });
            } else {
                arr.sort((a, b) => {
                    return a.props.exchange.sell - b.props.exchange.sell
                });
            }
        }

        return arr;
    }

    render() {
        let listing = this.getList(this.props.bank);
        let ouput = this.setSorting(listing);

        return (
            <div className="timi-ex-list">
                {ouput}
            </div>
        );
    }

}

export default BanksList;
