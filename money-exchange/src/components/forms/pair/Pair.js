import React from "react";
import NumberFormat from 'react-number-format';
//import MutateNumber from "../../../common/scripts/MutateNumber";

import PairSelector from "../pairSelector/PairSelector";
import Keyboard from "../keyboard/Keyboard";


//import style from "./pair.sass";

class Pair extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showKeyboard: false
        }

        this.setMultiply = this.setMultiply.bind(this);
        this.setKeyboard = this.setKeyboard.bind(this);
    }

    setMultiply(key) {
        let s = this.props.multiplier.toString();
        if (s.length <= 10) {
            switch (key) {
                case '.':
                    /\./.test(s) ? s = s : s += '.';
                    break;
                case 'bs':
                    s.length === 1 ? s = '0' : s = s.replace(/\d$|\.$/g, '');
                    break;
                default: s === '0' ? s = key : s += key;
                    break;
            }
        } else if (key === 'bs') {
            s = s.replace(/\d$|\.$/g, '')
        }
        this.props.getMultiply(s);
    }

    setTextFormat() {
        const s = {
            ini: this.props.multiplier,
            arr: undefined,
            res: undefined,
            form: (v) => { return v.replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ' ') }
        };
        s.ini = s.ini.toString();
        /\./.test(s.ini) ? s.arr = s.ini.split('.') : s.res = s.form(s.ini);
        s.arr ? s.arr[0] = s.form(s.arr[0]) : ' ';
        s.arr ? s.res = s.arr.join('.') : ' ';
        return s.res;
    }

    setKeyboard() {
        this.setState({
            showKeyboard: !this.state.showKeyboard
        })
    }

    render() {
        let exchange = this.setTextFormat();
        let classer = {
            cursor: this.state.showKeyboard ? "tkc-custom-cursor tkc-show" : "tkc-custom-cursor"
        }

        return (
            <div className="timi-ex-data">
                <PairSelector
                    type={'one'}
                    pair={this.props.pair}
                    getPair={this.props.getPair} />
                <span className="timi-synth-input" onClick={this.setKeyboard}>
                    <span className="ts-value">
                        <span className="timi-input">{exchange}<span className={classer.cursor}></span></span>
                    </span>
                    <span className="keyboard-cursor"></span>
                </span>
                <div className="timi-drop-switch" onClick={this.props.switchPair}>&nbsp;</div>
                <PairSelector
                    type={'two'}
                    pair={this.props.pair}
                    getPair={this.props.getPair} />
                <Keyboard
                    value={this.props.multiplier}
                    show={this.state.showKeyboard}
                    swit={this.setKeyboard}
                    sendKey={this.setMultiply} />
            </div>
        );
    }
}

export default Pair;
