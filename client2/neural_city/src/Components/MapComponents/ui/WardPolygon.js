import React from 'react'
import { Polygon } from 'react-leaflet';
import { useState,useEffect } from 'react';

function WardPolygon({ name, boundary, fillColor, mapData, setMapData, number }) {
    const [debouncedCurrWard, setDebouncedCurrWard] = useState(mapData.currWard);
    const handleMouseIn = (e) => {
        setDebouncedCurrWard(number);
    };

    const handleMouseOut = (e) => {
        setDebouncedCurrWard("any");
    }
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setMapData(() => ({ ...mapData, currWard: debouncedCurrWard, zoom: 12 }));
        }, 100); // Adjust debounce delay as needed

        return () => clearTimeout(timeoutId);
    }, [debouncedCurrWard]);

    console.log(boundary)
    return (
        <Polygon
            pathOptions={{ cursor: 'default' }}
            key={mapData.currWard + "$" + number}
            eventHandlers={{
            }}
            positions={boundary} weight={(mapData.currWard === number) ? 2 : 1} color={'black'} fillOpacity={0.6} fillColor={fillColor}></Polygon>
    )
}

export default WardPolygon