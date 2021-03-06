import React from "react";

//import style from "./sorting.sass";

class Sorting extends React.Component {

    render() {

        let classer = {
            buy: '',
            sell: ''
        };

        if (this.props.sorting.data === 'buy') {
            if (this.props.sorting.type === 'DESC') {
                classer.buy = 'timi-ex-buy timi-ex-sorter timi-ex-sorter-active timi-ex-sorter-DESC timi-ui-cell-slave';
                classer.dist = 'timi-ex-sell timi-ex-sorter timi-ui-cell-slave'
            } else if (this.props.sorting.type === 'ASC') {
                classer.buy = 'timi-ex-buy timi-ex-sorter timi-ex-sorter-active timi-ex-sorter-ASC timi-ui-cell-slave';
                classer.dist = 'timi-ex-sell timi-ex-sorter timi-ui-cell-slave'
            }
        } else if (this.props.sorting.data === 'distance') {
            if (this.props.sorting.type === 'DESC') {
                classer.buy = 'timi-ex-buy timi-ex-sorter timi-ui-cell-slave';
                classer.dist = 'timi-ex-sell timi-ex-sorter timi-ex-sorter-active timi-ex-sorter-DESC timi-ui-cell-slave'
            } else if (this.props.sorting.type === 'ASC') {
                classer.buy = 'timi-ex-buy timi-ex-sorter timi-ui-cell-slave';
                classer.dist = 'timi-ex-sell timi-ex-sorter timi-ex-sorter-active timi-ex-sorter-ASC timi-ui-cell-slave'
            }
        }
        // } else if (this.props.sorting.data === 'sell') {
        //   if (this.props.sorting.type === 'DESC') {
        //     classer.sell = 'timi-ex-sell timi-ex-sorter timi-ex-sorter-active timi-ex-sorter-DESC timi-ui-cell-slave';
        //     classer.buy = 'timi-ex-buy timi-ex-sorter timi-ui-cell-slave'
        //   } else if (this.props.sorting.type === 'ASC') {
        //     classer.sell = 'timi-ex-sell timi-ex-sorter timi-ex-sorter-active timi-ex-sorter-ASC timi-ui-cell-slave';
        //     classer.buy = 'timi-ex-buy timi-ex-sorter timi-ui-cell-slave'
        //   }
        // }

        return (
            <div className="timi-ex-sort timi-ui-cell-master">
                <div className="timi-ex-name timi-ui-cell-slave">{this.props.lng === 'en' ? this.props.dict.exchangeOffice[0] : this.props.dict.exchangeOffice[1]}</div>
                <div className={classer.dist} onClick={() => (this.props.getSorting('distance'))}>
                    <span className="timi-ex-sorter-icon">{this.props.lng === 'en' ? this.props.dict.distance[0] : this.props.dict.distance[1]}</span>
                </div>
                <div className={classer.buy} onClick={() => (this.props.getSorting('buy'))}>
                    <span className="timi-ex-sorter-icon">{this.props.lng === 'en' ? this.props.dict.exchange[0] : this.props.dict.exchange[1]}</span>
                </div>
                {/* <div className="timi-ex-fresh timi-ui-cell-slave">Обновлено</div> */}
            </div>
        );
    }

}

export default Sorting;