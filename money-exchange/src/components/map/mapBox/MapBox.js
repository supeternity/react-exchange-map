import React from "react";
import MapGL, { NavigationControl, Popup, Marker } from "react-map-gl";

import MarkerTemp from "../marker/Marker";
import PopupTemp from "../popup/Popup";

import "./mapBox.css";
import YouAreHereSvg from "./resources/you_are_here.svg";

//import style from "./mapBox.sass";

class MapBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: undefined,
                height: undefined,
                latitude: undefined,
                longitude: undefined,
                zoom: undefined
            },
            branchInfo: null
        };
    }

    componentDidMount() {
        this.setMap();
    }

    setMap() {
        let mapContainer = document.getElementById("timiMap");
        let mapWidth = mapContainer.offsetWidth;
        let mapHeight = mapContainer.offsetHeight;
        this.setState({
            viewport: {
                width: mapWidth,
                height: mapHeight,
                latitude: +this.props.term.lat,
                longitude: +this.props.term.lon,
                zoom: 11,
                pitch: 39
            }
        })
    }

    setBranchMarker = (branch, index) => {
        if (branch.selected === true || branch.selected === "undefined") {
            let mrkSize = undefined;
            let mrkOpacity = undefined;
            if (branch.selected === undefined) {
                mrkSize = 40;
                mrkOpacity = 1;
            } else if (branch.selected === true) {
                mrkSize = 40;
                mrkOpacity = 1;
            }
            return (
                <Marker key={`marker-${index}`}
                    longitude={branch.lon}
                    latitude={branch.lat} >
                    <MarkerTemp size={mrkSize} opacity={mrkOpacity} onClick={() => this.setState({ branchInfo: branch })} />
                </Marker>
            );
        } else {
            return false;
        }
    }

    setBranchPopup() {
        const { branchInfo } = this.state;

        return branchInfo && (
            <Popup tipSize={5}
                anchor="bottom"
                longitude={branchInfo.lon}
                latitude={branchInfo.lat}
                className={"timi-custom-popup"}
                onClose={() => this.setState({ branchInfo: null })} >
                <PopupTemp info={branchInfo} />
            </Popup>
        )
    }

    render() {

        fetch

        return (
            <div id="timiMap" className="timi-map">
                <MapGL
                    mapboxApiAccessToken={this.props.mbtoken}
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })} >

                    {this.props.branches.map(this.setBranchMarker)}

                    <Marker
                        latitude={+this.props.term.lat}
                        longitude={+this.props.term.lon}
                        offsetLeft={-31.8}
                        offsetTop={-90} >
                        <div><img src={YouAreHereSvg} width={63.6} height={90} alt={'YAH'} /></div>
                    </Marker>

                    {this.setBranchPopup()}

                    <NavigationControl
                        className={'timi-zoomer'}
                        showCompass={false}
                        onViewportChange={(viewport) => this.setState({ viewport })} />

                </MapGL>
            </div>
        );
    }
}

export default MapBox;
