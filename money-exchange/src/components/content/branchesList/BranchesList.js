import React from "react";

import BranchItem from "../branchItem/BranchItem";

import style from "./branchesList.sass";

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