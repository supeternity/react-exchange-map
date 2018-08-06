import React, { PureComponent } from 'react';

//import style from "./popup.sass";

const splitter = (str, exp) => {
    str = str.split(exp);
    let temp = str.map((st, i) => {
        return <span key={i}>{st}<br /></span>
    })
    return temp;
}

const callNumber = str => {
    str = str.split(',')[0].replace(/^8|\s|-|\(|\)/gm, '');
    return 'tel:+7' + str;
}

class PopupTemp extends PureComponent {
    render() {
        const { info } = this.props;
        let stel = splitter(info.tel, ',');
        let stime = splitter(info.time, /\n/gm);
        let call = callNumber(info.tel);
        let address;
        if (/ул\.\s.*|просп\.\s.*|наб\.\s.*|пл\.\s.*|ш\.\s.*|бул\.\s.*|\d.я.*|\d.й.*/g.test(info.address)) {
            address = info.address.match(/ул\.\s.*|просп\.\s.*|наб\.\s.*|пл\.\s.*|ш\.\s.*|бул\.\s.*|\d.я.*|\d.й.*/g)[0];
        } else {
            address = info.address;
        }

        return (
            <div className="timi-map-popup-inner">
                <div className="bankName">
                    {info.bank}
                    <div className="branchName">
                        {info.name}
                    </div>
                </div>
                <div className="branchInfo">
                    <div className="branchConcrete">
                        <div className="branchStreet">
                            {address}
                        </div>
                        <div className="branchTime">
                            {stime}
                        </div>
                        <div className="branchTel">
                            {stel}
                        </div>
                    </div>
                </div>
                <a href={call} className="callTo">&nbsp;</a>
            </div>
        );
    }

}

export default PopupTemp;