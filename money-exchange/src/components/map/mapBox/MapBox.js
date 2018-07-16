import React from "react";

import Marker from "../marker/Marker";
import Popup from "../popup/Popup";

class MapBox extends React.Component {
    render() {
        return (
            <div>
                module: MapBox<br />
                extensions: <Marker />, <Popup />
            </div>
        );
    }
}

export default MapBox;
