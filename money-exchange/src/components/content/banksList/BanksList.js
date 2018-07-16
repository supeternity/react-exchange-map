import React from "react";

import BankItem from "../bankItem/BankItem";
import BranchesList from "../branchesList/BranchesList";

import banksListStyle from "./banksList.sass";

class BanksList extends React.Component {
    render() {
        return (
            <div className={banksListStyle.SASStest}>
                module: BanksList<br />
                extensions: <BankItem />, <BranchesList />
            </div>
        );
    }
}

export default BanksList;
