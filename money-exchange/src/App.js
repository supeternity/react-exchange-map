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
            banks: undefined,
            satellite: undefined
        };

        this.setActiveBank = this.setActiveBank.bind(this);
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
                term: termData,
                satellite: {
                    lat: termData.lat,
                    lon: termData.lon
                }
            })
        } catch (err) {
            this.setState({
                error: `processing: setTerminal() in ${this.constructor.name}.js: ${err}`
            })
        }
    }
    async setBanks() {
        try {
            let banksData;
            banksData = await fetch(`${MONEY_EXCHANGE_API}/banks/${this.state.term.termId}/`);
            banksData = await banksData.json();
            this.setState({
                banks: banksData
            });
        } catch (err) {
            this.setState({
                error: `processing: setBanks() in ${this.constructor.name}.js: ${err}`
            })
        }
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
                    await this.setBanks();
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

    // app functions
    setActiveBank(id) {
        let cache = this.state.banks;
        if (id !== 'all') {
            Object.keys(cache).map(i => {
                if (cache[i]._id === id) {
                    cache[i].selected = true;
                    this.setState({
                        satellite: {
                            lat: cache[i].lat,
                            lon: cache[i].lon
                        }
                    })
                } else {
                    cache[i].selected = false
                }
            });
        } else {
            Object.keys(cache).map(i => {
                cache[i].selected = 'undefined';
            });
            this.setState({
                satellite: undefined
            })
        }
        this.setState({
            branches: cache
        });
    }

    // after mount
    render() {
        const { setActiveBranches } = this;
        const { error, isLoaded, banks, lng, term, satellite } = this.state;

        if (error) {
            return <div className="timi-error">Error: {error}</div>;
        } else if (!isLoaded) {
            return <div className="timi-loader">Loading...</div>;
        } else {
            return (
                <div className="App">
                    <Exchanger
                        banks={banks}
                        lng={lng}
                        term={term}
                        satellite={satellite}
                        MONEY_EXCHANGE_API={MONEY_EXCHANGE_API}
                        setActiveBank={this.setActiveBank} />
                </div>
            );
        }
    }

}

export default withRouter(App);
