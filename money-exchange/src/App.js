import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Exchanger from "./components/exchanger/Exchanger";

const MONEY_EXCHANGE_API = `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_MONEY_EXCHANGE}`;


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          lng: undefined,
          term: undefined,
          rates: undefined,
          branches: undefined
        };
    
        this.setActiveBranches = this.setActiveBranches.bind(this);
    }

    // init config for API functions
    initRoute() {
        let route = { term: undefined, lng: undefined };
        if (this.props.location.search !== "") {
            this.props.location.search.split(/[&|?]/).map((e) => {
                if (e) {
                    // /?term=[number]&lng=[str:ru|en]
                    route[String(e.split('=')[0])] = Number(e.split('=')[1]) || String(e.split('=')[1]);
                }
                return e;
            })
        } else {
            this.setState({
                error: `get empty: required format /?term=[int]&lng=[str:ru|en]`
            })
        }
        return route;
    }

    // API functions
    async setTerminal(initTermId) {
        try {
            let termData;
            termData = await fetch(`${MONEY_EXCHANGE_API}/terminal/${initTermId}/`);
            termData = await termData.json();
            this.setState({
                term: termData
            })
        } catch(err) {
            this.setState({
                error: `processing: setTerminal() in ${this.constructor.name}.js: ${err}`
            })
        }
    }
    async setRates() {
        try {
            let ratesData;
            ratesData = await fetch(`${MONEY_EXCHANGE_API}/rates/${this.state.term.termId}/`);
            ratesData = await ratesData.json();
            this.setState({
                rates: ratesData
            });
        } catch(err) {
            this.setState({
                error: `processing: setRates() in ${this.constructor.name}.js: ${err}`
            })
        }
    }
    async setBranches() {
        try {
            let branchesData;
            branchesData = await fetch(`${MONEY_EXCHANGE_API}/branches/${this.state.term.termId}/`);
            branchesData = await branchesData.json();
            this.setState({
                branches: branchesData
            });
        } catch(err) {
            this.setState({
                error: `processing: setBranches() in ${this.constructor.name}.js: ${err}`
            })
        }
    }
    
    // app functions
    setActiveBranches(bankName) {
        let cache = this.state.branches;
        Object.keys(cache).map(i => {
            cache[i].bank === bankName ? cache[i].selected = true : cache[i].selected = false 
        });
        this.setState({
            branches: cache
        });
    }

    // init app of React
    componentDidMount() {
        let initConf = this.initRoute();
        if (initConf) {
            if (initConf.lng !== this.state.lng) {
                this.setState({
                    lng: initConf.lng
                })
            }
            if (initConf.term) {
                this.setTerminal(initConf.term).then(async () => {
                    await Promise.all([this.setBranches(), this.setRates()]);
                    this.setState({
                        isLoaded: true
                    });
                });
            }
        } else {
            this.setState({
                error: `Checking routing parameters, format: "?term=[ID]&lng=[STR]"`
            })
        }
    }
    
    // after mount
    render() {
        const { setActiveBranches } = this;
        const { error, isLoaded, rates, lng, term, branches } = this.state;

        if (error) {
            return <div className="timi-error">Error: {error}</div>;
        } else if (!isLoaded) {
            return <div className="timi-loader">Loading...</div>;
        } else {
            return (
            <div className="App">
                <Exchanger
                rates={rates}
                branches={branches}
                setActiveBranches={setActiveBranches}
                lng={lng}
                term={term}
                mbtoken={process.env.REACT_APP_MAPBOX_TOKEN} />
            </div>
            );
        }
    }

}

export default withRouter(App);
