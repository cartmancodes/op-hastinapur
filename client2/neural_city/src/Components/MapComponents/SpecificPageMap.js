import React, { useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { wardDivision } from './wardDivisionData';
import { useState } from 'react';
import { Polygon } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "./mapstyle.css";
import MapMarker from './ui/MapMarker';
import { calculateAverage, getSelectedWardBoundary, getColRep } from '../../utils/MapUtils';
import ImageModal from '../Modals/ImageModal';
import { getCityBoundary } from '../../utils/MapUtils';
const LeafIcon = L.Icon.extend({
    options: {}
});
const redIcon = new LeafIcon({
    iconUrl:
        "redMarker.png"
})


function SpecificPageMapComponent(props) {
    const [imgsrc, setImgsrc] = useState("");
    const [open, setOpen] = React.useState(false);
    const [showLoading, setShowLoading] = useState(true);
    // Modal Popup Open Close Functions
    const handleOpen = (e) => {
        setImgsrc(() => e.target.getAttribute('src'));
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    // Effect Method To set Intial setup of the map
    React.useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);

    // Effect Method for Seamless Loading of Map On Any Change Happened
    useEffect(() => {
        setShowLoading(true);
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
            setShowLoading(false);
        }, 100);
    }, [props.mapData]);

    // Values Recieved Through Props
    const zoom = props.mapData.zoom;
    const position = props.mapData.position;
    const wardValue = props.mapData.currWard;

    // Getting Selected Ward Boundary,Average and Corresponding Color Representations
    let selectedWardBoundary = getSelectedWardBoundary(wardValue, wardDivision);
    let cityBoundary = getCityBoundary(wardDivision);
    const polygon = L.polygon(cityBoundary);
    const bounds = polygon.getBounds();

    // let wards = getWardsWithName(wardDivision);
    return (
        showLoading ? <div>Loading...</div> : <div>
            <MapContainer
                zoomSnap={0.5}
                maxBounds={bounds}
                key={props.pos}
                // maxBoundsViscosity={1.0}
                className='h-[400px]
                w-full'
                zoom={zoom}
                scrollWheelZoom={true}
                maxZoom={18}
                center={position}
                markerZoomAnimation={true}
            >
                {
                    selectedWardBoundary.map((ward) => {
                        return <Polygon positions={ward.boundary} fillOpacity={0.4} weight={1} fillColor={props.geojson.colorRep} color={`gray`}/>
                    })
                }
                {
                    props.geojson.data.map((pos) => {
                        return (
                            <MapMarker pos={pos} handleOpen={handleOpen} />
                        )
                    })
                }
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            <ImageModal open={open} handleClose={handleClose} imgsrc={imgsrc} />
        </div>
    )
}

export default SpecificPageMapComponent