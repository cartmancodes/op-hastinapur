import React, { useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import { wardDivision } from './wardDivisionData';
import { useState } from 'react';
import { Polygon } from 'react-leaflet';
let wards = [];

wardDivision.features.map((ward) => {
    wards.push({ "ward_name": ward.properties["Ward Name"], "ward_number": ward.properties["Ward Numbe"] })
})

function SpecificPageMapComponent(props) {
    const wardValue = props.currWard;
    let position = [];
    wardDivision.features.map((feature) => {
        if (wardValue === feature.properties["Ward Numbe"]) {
            position = [feature.geometry.coordinates[0][0][0][1], feature.geometry.coordinates[0][0][0][0]];
        }
    })
    let selectedWardBoundary = [];

    wardDivision.features.map((ward) => {
        if (wardValue === ward.properties["Ward Numbe"]) {
            selectedWardBoundary = ward.geometry.coordinates;
        }
    });
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
                maxZoom={14}
                center={props.position}
            >
                <Polygon positions={selectedWardBoundary[0][0].map((cord) => [cord[1], cord[0]])} color={colRep} />
                <HeatmapLayer
                    radius={10}
                    minOpacity={8}
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    zoom={12}
                    maxZoom={14}
                    points={props.geojson}
                    longitudeExtractor={m => parseFloat(m.longitude)}
                    latitudeExtractor={m => parseFloat(m.latitude)}
                    intensityExtractor={m => parseFloat(m.score)}
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default SpecificPageMapComponent