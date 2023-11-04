import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';

function SpecificPageMapComponent(props) {
    const position = props.position;
    return (
        <div>
            <MapContainer
                key={(position[0] + " " + position[1])}
                className='h-[500px]
                w-full'
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                maxZoom={16}
            >
                <HeatmapLayer
                    radius={10}
                    minOpacity={2}
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    zoom={15}
                    maxZoom={18}
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