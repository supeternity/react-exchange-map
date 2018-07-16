import React from "react";

import PairSelector from "../pairSelector/PairSelector";
import SyntheticInput from "../syntheticInput/SyntheticInput";

class Pair extends React.Component {
    render() {
        return (
            <div>
                module: Pair<br />
                extensions: <PairSelector />, <SyntheticInput />
            </div>
        );
    }
}

export default Pair;
