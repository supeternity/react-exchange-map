import React from "react";

//import style from "./pairSelector.sass";

class PairSelector extends React.Component {

    setActivePair(e) {
        this.state = {
            showOptions: false
        }

        this.props.getPair(this.props.type, e.target.value);
    }

    render() {
        let pairs = ['rub', 'usd', 'eur'];
        let exclude = this.props.type === 'one' ? 'two' : 'one';
        let output = pairs.map(pairel => {
            let ukey = this.props.type + '-' + pairel;
            if (pairel !== this.props.pair[exclude]) {
                return <option value={pairel} key={ukey}>{pairel}</option>
            } else {
                return '';
            }
        });
        return (
            <select
                className={'timi-drop-call ' + this.props.type}
                value={this.props.pair[this.props.type]}
                onChange={(e) => this.props.getPair(this.props.type, e.target.value)} >
                {output}
            </select>
        )
    }

}

export default PairSelector;