import React from 'react'
import { Polygon } from 'react-leaflet';
import { useState } from 'react';

function WardPolygon({ name, boundary, fillColor, mapData, setMapData, number }) {
    return (
        <Polygon key={mapData.currWard + "$" + number} eventHandlers={{
            mouseover: (e) => {
                setMapData(() => {
                    return {
                        ...mapData,
                        currWard: number,
                        zoom: 12
                    }
                });
            },
            mouseout: (e) => {
                setMapData(() => {
                    return {
                        ...mapData,
                        currWard: "any",
                        zoom: 12
                    }
                });
            }
        }} positions={boundary} weight={(mapData.currWard === number) ? 2 : 1} color={'black'} fillOpacity={(mapData.currWard === number) ? 0.8 : 0.7} fillColor={fillColor}></Polygon>
    )
}

export default WardPolygon