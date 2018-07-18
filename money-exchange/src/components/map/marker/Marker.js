import React, { PureComponent } from 'react';
import BankHereUnselectedPNG from "./resources/bank_here_unselected.png";

//import style from "./marker.sass";

const pinStyle = {
    cursor: 'pointer',
    stroke: 'none'
};

class Marker extends PureComponent {
    render() {
        const { size = 40, onClick } = this.props;
        return (
            <img
                src={BankHereUnselectedPNG}
                alt={'branch marker'}
                height={size}
                style={{ ...pinStyle, transform: `translate(${-size / 2}px,${-size}px)`, opacity: this.props.opacity }}
                onClick={onClick} >
            </img>
        );
    }
}

export default Marker;