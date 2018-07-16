import React, { Component } from 'react';

import Exchanger from "./components/exchanger/Exchanger";

class App extends Component {
    render() {
        return (
            <div>
                module: Main APP<br />
                extensions: <Exchanger />
            </div>
        );
    }
}

export default App;
