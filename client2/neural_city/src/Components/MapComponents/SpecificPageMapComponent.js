import React, { useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css';
import { wardDivision } from './wardDivisionData';
import { useState } from 'react';
import { Polygon } from 'react-leaflet';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import { Box, IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import L, { divIcon } from "leaflet";
import 'leaflet/dist/leaflet.css';
import "./mapstyle.css";
import ReactImageZoom from 'react-image-zoom';

const LeafIcon = L.Icon.extend({
    options: {}
});
const redIcon = new LeafIcon({
    iconUrl:
        "redMarker.png"
})
let wards = [];

wardDivision.features.map((ward) => {
    wards.push({ "ward_name": ward.properties["Ward Name"], "ward_number": ward.properties["Ward Numbe"] })
})

function SpecificPageMapComponent(props) {
    React.useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);
    const wardValue = props.currWard;
    let position = [];
    wardDivision.features.map((feature) => {
        if (wardValue === feature.properties["Ward Numbe"]) {
            position = [feature.geometry.coordinates[0][0][0][1], feature.geometry.coordinates[0][0][0][0]];
        }
    })
    let selectedWardBoundary = [];
    if (wardValue === "any") {
        wardDivision.features.map((ward) => {
            selectedWardBoundary.push(ward.geometry.coordinates[0][0]);
        });
    } else {
        wardDivision.features.map((ward) => {
            if (wardValue === ward.properties["Ward Numbe"]) {
                selectedWardBoundary.push(ward.geometry.coordinates[0][0]);
            }
        });
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 2,
        boxShadow: 24,
    };

    const [imgsrc, setImgsrc] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
        setImgsrc(() => e.target.getAttribute('src'));
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [showLoading, setShowLoading] = useState(true);
    let scoreSum = 0;
    let totalCount = 0;
    props.geojson.map((sc) => {
        scoreSum += sc.score;
        totalCount++;
    });
    let avg = (scoreSum * 1.0 / totalCount);
    let colRep = avg < 2 ? 'red' : avg < 4 ? 'blue' : 'green';
    useEffect(() => {
        setShowLoading(true);
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
            console.log("Timeout called");
            setShowLoading(false);
        }, 100);
    }, [props.currWard]);
    return (
        showLoading ? <div>Loading...</div> : <div>
            <MapContainer
                key={props.pos}
                className='h-[500px]
                w-full'
                zoom={12}
                scrollWheelZoom={true}
                maxZoom={18}
                center={[25.4484, 78.5685]}
            >
                {selectedWardBoundary.map((wardBoundary) => <Polygon positions={wardBoundary.map((cord) => [cord[1], cord[0]])} color={colRep} />)}
                {
                    props.geojson.map((pos) => {
                        return (
                            <Marker position={[pos.latitude, pos.longitude]}
                                eventHandlers={{
                                    mouseover: (event) => event.target.openPopup(),
                                }}>
                                <Popup>
                                    <p>Latitude:- {pos.latitude}</p>
                                    <p>Longitude:- {pos.longitude}</p>
                                    <p>Here is XYZ Information</p>
                                    <img src={`/images/${pos.filename}`} className='w-20 h-20' onClick={handleOpen} />
                                </Popup>
                            </Marker>
                        )
                    })
                }
                {/* <HeatmapLayer
                    radius={10}
                    minOpacity={8}
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    zoom={12}
                    maxZoom={18}
                    points={props.geojson}
                    longitudeExtractor={m => parseFloat(m.longitude)}
                    latitudeExtractor={m => parseFloat(m.latitude)}
                    intensityExtractor={m => parseFloat(m.score)}
                /> */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-center'> Image </h1>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div>
                        <ReactImageZoom zoomWidth={800} img={imgsrc} height={400} width={500} className='w-100 h-100 cursor-pointer' />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default SpecificPageMapComponent