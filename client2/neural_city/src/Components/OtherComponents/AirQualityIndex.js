import React, { useEffect, useState } from 'react'
import axios from 'axios'
function AirQualityIndex() {
    const [data, setData] = useState({
        "coord": { "lon": 78.5685, "lat": 25.4484 },
        "name": "Jhansi",
        "list": [{
            "main": { "aqi": 5 },
            "components": {
                "co": 587.46, "no": 0, "no2": 9.6,
                "o3": 27.18, "so2": 2.71, "pm2_5": 78.71,
                "pm10": 109.87, "nh3": 25.08
            },
            "dt": 1696437625
        }]
    });
    return (
        <>
            {
                <div>
                    
                </div>
            }
        </>
    )
}

export default AirQualityIndex