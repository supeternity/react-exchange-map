import React from "react";

import Pair from "../forms/pair/Pair";
import Keyboard from "../forms/keyboard/Keyboard";
import Sorting from "../forms/sorting/Sorting";
import BanksList from "../content/banksList/BanksList";
import MapBox from "../map/mapBox/MapBox";

import style from "./exchanger.sass";

class Exchanger extends React.Component {
    render() {
        return (
            <div>
                module: Exchanger<br />
                extensions: <Pair />, <Keyboard />, <Sorting />, <BanksList />, <MapBox />
            </div>
        );
    }
}

export default Exchanger;