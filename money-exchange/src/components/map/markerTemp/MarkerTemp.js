import React, { PureComponent } from 'react';
import BankHereUnselectedPNG from "./resources/bank_here_unselected.png";

//import style from "./marker.sass";

class MarkerTemp extends PureComponent {

    // setBank = () => {
    //     let stateSetter = {
    //         selectedBankInfo: this.props.bank
    //     }
    //     this.props.ExchangerStateSetter(stateSetter);
    //     this.props.setActiveBank(this.props.bank._id);
    // }

    render() {
        const { size = 40, setBankInfo } = this.props;
        return (
            <img
                src={BankHereUnselectedPNG}
                alt={'branch marker'}
                height={size} >
                {/* onClick={this.setBank} > */}
            </img>
        );
    }
}

export default MarkerTemp;