import React from "react";
// import MapGL, { NavigationControl, Marker, FlyToInterpolator } from "react-map-gl";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import polyline from "@mapbox/polyline";

import MarkerTemp from "../markerTemp/MarkerTemp";
import PopupTemp from "../popupTemp/PopupTemp";

import "./mapBox.css";
import YouAreHereSvg from "./resources/you_are_here.svg";

//import style from "./mapBox.sass";

const MapGL = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

class MapBox extends React.Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         viewport: {
    //             zoom: 13,
    //             pitch: 39
    //         }
    //     }

    //     //this.updateMapPosition = this.updateMapPosition.bind(this);
    // }

    // cubicInOut(t) {
    //     return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    // }
    // quadInOut(t) {
    //     return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
    // }

    // updateMapPosition(lat, lon, zoom) {
    //     this.setState({
    //         viewport: {
    //             width: this.state.viewport.width,
    //             height: this.state.viewport.height,
    //             latitude: +lat + 0.009,
    //             longitude: +lon,
    //             zoom: zoom,
    //             pitch: this.state.viewport.zoom,
    //             transitionInterpolator: new FlyToInterpolator(),
    //             transitionDuration: 1000,
    //             transitionEasing: this.cubicInOut
    //         }
    //     })
    // }

    setBranchMarker = (bank, index) => {
        if (bank.selected !== false) {
            let mrkSize = undefined;
            let mrkOpacity = undefined;
            if (bank.selected === undefined) {
                mrkSize = 50;
                mrkOpacity = 1;
            } else if (bank.selected === true) {
                mrkSize = 40;
                mrkOpacity = 1;
            }
            return (
                <Marker key={`marker-${index}`}
                    coordinates={[bank.lon, bank.lat]} >
                    <MarkerTemp
                        size={mrkSize}
                        opacity={mrkOpacity}
                        bank={bank}
                        setActiveBank={this.props.setActiveBank}
                        ExchangerStateSetter={this.props.ExchangerStateSetter} />
                </Marker>
            );
        }
    }

    // setBank = () => {
    //     let stateSetter = {
    //         selectedBankInfo: null
    //     }
    //     this.props.ExchangerStateSetter(stateSetter);
    //     this.props.setActiveBank('all');
    // }

    setBranchPopup() {
        let { selectedBankInfo } = this.props;
        if (selectedBankInfo) {
            return selectedBankInfo && (
                <Popup coordinates={[this.props.selectedBankInfo.lat, this.props.selectedBankInfo.lon]}>
                    <PopupTemp
                        info={selectedBankInfo} />
                </Popup>
            )
        }        
    }

    render() {
        let branches = this.props.banks.map(this.setBranchMarker);
        let popup = this.setBranchPopup();

        let lineLayout = {
            'line-cap': 'round',
            'line-join': 'round'
        }
        let linePaint = {
            'line-color': '#4790E5',
            'line-width': 7
        }

        let decodePolyline = polyline.decode(this.props.selectedBankInfo.geometry, 5);
        let mapBoxPolyline = decodePolyline.map(coordPair => {
            let line = [coordPair[1],coordPair[0]];
            return line;
        })

        //let layer = this.setBranchDirection();
        return (
            <div id="timiMap" className="timi-map">
                {/* <MapGL
                    mapboxApiAccessToken={this.props.mbtoken}
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })} >

                    {this.props.banks.map(this.setBankMarker)}

                    <Marker
                        latitude={+this.props.term.lat}
                        longitude={+this.props.term.lon}
                        offsetLeft={-31.8}
                        offsetTop={-90} >
                        <div><img src={YouAreHereSvg} width={63.6} height={90} alt={'YAH'} /></div>
                    </Marker>

                    <NavigationControl
                        className={'timi-zoomer'}
                        showCompass={false}
                        onViewportChange={(viewport) => this.setState({ viewport })} />

                </MapGL> */}
                <MapGL
                    style='mapbox://styles/timilink-dev/cjj3vgnsc1brz2rsawl2vt0vq'
                    containerStyle={{ height: '100vh', width: '' }}
                    center={[this.props.satellite.lon, this.props.satellite.lat]}
                    pitch={[39]}
                    zoom={[13]} >
                        {branches}
                        <Marker
                        coordinates={[this.props.term.lon, this.props.term.lat]} >
                        <div><img src={YouAreHereSvg} width={63.6} height={90} alt={'YAH'} /></div>
                        {/* {popup} */}
                        </Marker>
                        <Layer type="line" layout={lineLayout} paint={linePaint}>
                            <Feature coordinates={mapBoxPolyline} />
                        </Layer>
                </MapGL>
            </div>
        );
    }
}

export default MapBox;
