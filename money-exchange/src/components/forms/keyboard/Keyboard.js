import React from "react";

import "./keyboard.css";

//import style from "./keyboard.sass";

class Keyboard extends React.Component {

    constructor(props) {
        super(props);

        this.setMultiply = this.setMultiply.bind(this);
        this.switchKeyboard = this.switchKeyboard.bind(this);
    }

    setMultiply(e) {
        this.props.sendKey(e.target.attributes.getNamedItem('data-val').nodeValue);
    }

    setKeys() {
        let keys = [];
        let key = (val, cn, ukey) =>
            keys.push(<div
                onClick={this.setMultiply}
                data-val={val}
                className={cn}
                key={ukey}>{val}</div>);
        for (let i = 0; i <= 11; i++) {
            if (i < 9) {
                key(i + 1, 'timi-keyboard-key timi-keyboard-numb', i);
            } else if (i === 9) {
                key(0, 'timi-keyboard-key timi-keyboard-numb', i);
            } else if (i === 10) {
                key('.', 'timi-keyboard-key timi-keyboard-dot', i);
            } else if (i === 11) {
                key('bs', 'timi-keyboard-key timi-keyboard-backspace', i);
            }
        }
        return keys;
    }

    switchKeyboard(e) {
        console.dir(e.target);
        this.props.swit();
    }

    render() {
        let classer = {
            closeButton: this.props.show ? "timi-keyboard-close tkc-anima" : "timi-keyboard-close",
            keyboard: this.props.show ? "timi-keyboard tk-show" : "timi-keyboard",
            fader: this.props.show ? "timi-keyboard-fader tkf-show" : "timi-keyboard-fader"
        }
        return (
            <div className="timi-keyboard-contain">
                <div className={classer.keyboard}>
                    <div className="timi-keyboard-keys">
                        {this.setKeys()}
                    </div>
                    <div className={classer.closeButton} onClick={this.switchKeyboard}><span>Рассчитать</span></div>
                </div>
                <div className={classer.fader}></div>
            </div>
        );
    }

}

export default Keyboard;
