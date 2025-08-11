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
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { useMap } from 'react-leaflet';

const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();

    return L.divIcon({
        html: `
      <div style="
        background: black;
        border-radius: 100%;
        color: white;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
      ">
        ${count}
      </div>
    `,
        className: 'custom-marker-cluster',
        iconSize: [40, 40],
    });
}

const LeafIcon = L.Icon.extend({
    options: {}
});
const redIcon = new LeafIcon({
    iconUrl:
        "redMarker.png"
})



function ZoomDisplay({ zoom, setZoom }) {
    const map = useMap(); // ✅ This works ONLY inside MapContainer

    useEffect(() => {
        const onZoom = () => setZoom(map.getZoom());
        map.on('zoomend', onZoom);

        return () => {
            map.off('zoomend', onZoom);
        };
    }, [map]);

    return (
        <div
            style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'white',
                padding: '8px 16px',
                zIndex: 1000,
            }}
        >
            Zoom: {zoom}
        </div>
    );
}



function SpecificPageMapComponent(props) {
    const [imgsrc, setImgsrc] = useState("");
    const [open, setOpen] = React.useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [zoom, setZoom] = useState(props.mapData.zoom);
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
    const position = props.mapData.position;
    const wardValue = props.mapData.currWard;

    // Getting Selected Ward Boundary,Average and Corresponding Color Representations
    let selectedWardBoundary = getSelectedWardBoundary(wardValue, wardDivision);
    let cityBoundary = getCityBoundary(wardDivision);
    const polygon = L.polygon(cityBoundary);
    const bounds = polygon.getBounds();

    // let wards = getWardsWithName(wardDivision);
    return (
        showLoading ? <div>Loading...</div> : <div className='hidden sm:block rounded-md p-2 border'>
            <MapContainer
                maxBounds={cityBoundary}
                zoomSnap={0.5}
                key={props.pos}
                // maxBoundsViscosity={1.0}
                zoomAnimation={true}
                zoomAnimationThreshold={4}
                zoomSnap={0.25}   // smoother zoom levels
                zoomDelta={0.25}
                className='h-[75vh]
                w-full'
                zoom={zoom}
                scrollWheelZoom={true}
                maxZoom={28}
                center={position}
                markerZoomAnimation={true}
            >
                <ZoomDisplay zoom={zoom} setZoom={setZoom} />
                {
                    selectedWardBoundary.map((ward) => {
                        return <Polygon positions={ward.boundary} fillOpacity={0.4} weight={1} fillColor={props.geojson.colorRep} color={`gray`} />
                    })
                }
                {
                    zoom <= 16 ? <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>

                        {
                            props.geojson.data.map((pos, idx) => {
                                return (
                                    <MapMarker key={idx} pos={pos} handleOpen={handleOpen} />
                                )
                            })
                        }
                    </MarkerClusterGroup> :
                        <div>
                            {
                                props.geojson.data.map((pos, idx) => {
                                    return (
                                        <MapMarker key={idx} pos={pos} handleOpen={handleOpen} />
                                    )
                                })
                            }
                        </div>
                }
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            <ImageModal open={open} handleClose={handleClose} imgsrc={imgsrc} />
        </div >
    )
}

export default SpecificPageMapComponent;