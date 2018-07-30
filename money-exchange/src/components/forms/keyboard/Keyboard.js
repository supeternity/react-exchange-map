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

    // функция актуальна в рамках pure-компонента
    setKeys() {
        let keys = [];
        let key = (val, cn, ukey) => val !== '.' ?
            keys.push(<div
                onClick={this.setMultiply}
                data-val={val}
                className={cn}
                key={ukey}>{val}</div>) : // < 
            keys.push(<div
                onClick={this.setMultiply}
                data-val={val}
                className={cn}
                key={ukey}><span className="timi-keyboard-special-dot">{val}</span></div>);
                // .timi-keyboard-special-dot для гениев вёрстки, которые придумают
                // как позиционировать эту точку по центральной базовой линии строки таблицы
        for (let i = 0; i <= 11; i++) {
            if (i < 9) {
                key(i + 1, 'timi-keyboard-key timi-keyboard-numb', i);
            } else if (i === 9) {
                key('.', 'timi-keyboard-key timi-keyboard-dot', i);
            } else if (i === 10) {
                key(0, 'timi-keyboard-key timi-keyboard-numb', i);
            } else if (i === 11) {
                key('bs', 'timi-keyboard-key timi-keyboard-backspace', i);
            }
        }
        return keys;
    }

    faderTap = (e) => {
        if (e.target.className === 'timi-keyboard-fader tf-show') {
            this.props.swit();
        }
    }

    switchKeyboard(e) {
        this.props.swit();
    }

    render() {
        // предельно топорная и не совершенная функция вызова клавиатуры
        // необходим рефакторинг
        // в первую очередь, чтобы клавиатура не просто была скрыта визуально
        // но не отрисовывалась в DOM
        // и вызывалась с опеределением параметров позиционирования относительно
        // объекта, вызвавшего его
        // !!! для качественного UI необходимо, чтобы объект, вызвавший клавиатуру,
        // !!! передавал параметры позиции для неё
        // !!! ниже топорное временное решение

        let classer = {
            closeButton: this.props.show ? "timi-keyboard-close tkc-anima" : "timi-keyboard-close",
            keyboard: this.props.show ? "timi-keyboard-contain tk-show" : "timi-keyboard-contain",
            fader: this.props.show ? "timi-keyboard-fader tf-show" : "timi-keyboard-fader"
        }
        let styler = {
            keyboard: { left: '13vw' }
        }

        // let masterInput = document.getElementById("pairInput");
        // let styler = {
        //     keyboard: { left: masterInput.offsetLeft }
        // }

        return (
            <div className={classer.keyboard}>
                <div className={classer.fader} onClick={this.faderTap}>
                    <div className="timi-keyboard" style={styler.keyboard}>
                        <div className="timi-keyboard-keys">
                            {this.setKeys()}
                        </div>
                        <div className={classer.closeButton} onClick={this.switchKeyboard}><span>Ok</span></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Keyboard;
