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
        
        this.props.updateMapPosition(info.lat, info.lon, 13);

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
                            {info.address.match(/ул.*|просп.*/g)[0]}
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