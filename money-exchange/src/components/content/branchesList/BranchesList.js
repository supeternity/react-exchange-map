import React from "react";

import BranchItem from "../branchItem/BranchItem";

class BranchesList extends React.Component {
    render() {
        return (
            <div>
                module: BranchesList<br />
                extensions: <BranchItem />
            </div>
        );
    }
}

export default BranchesList;