import React from 'react'
import SpecificPageMapComponent from './MapComponents/SpecificPageMapComponent'
import { Button, Select, FormControl, Box, MenuItem, InputLabel, } from '@mui/material'
import { useState } from 'react'
import Scores from './OtherComponents/Scores'
import { geojson } from './MapComponents/heatmap'

function SustainabilityPage() {
    let intialgeojson = geojson.filter(geo => (parseFloat(geo.lat) >= 12.95) && parseFloat(geo.lon) >= 77.56 && parseFloat(geo.lat) <= 13.10 && parseFloat(geo.lon) <= 77.7);
    console.log(intialgeojson);
    const [geojsonData, setGeojsondata] = useState(intialgeojson);
    const [wardValue, setwardValue] = useState("Ward1");
    const handleWardChange = (e) => {
        setwardValue(e.target.value);
    }
    const [parameter, setparameter] = useState("Parameter-1");
    const handleParameterChange = (e) => {
        setparameter(e.target.value);
    }
    const [position, setPosition] = useState([12.9516, 76.5946])

    const handleApplyClick = () => {
        if (wardValue === "Ward1" && parameter === "Parameter-1") {
            const newgeojson = geojson.filter(geo => (parseFloat(geo.lat) >= 12.95) && parseFloat(geo.lon) >= 77.56 && parseFloat(geo.lat) <= 13.10 && parseFloat(geo.lon) <= 77.7);
            setGeojsondata([...newgeojson]);
            setPosition([12.9516, 76.5946]);
        } if (wardValue === "Ward2" && parameter === "Parameter-1") {
            const newgeojson = geojson.filter(geo => (parseFloat(geo.lat) >= 11.85) && parseFloat(geo.lon) >= 76.46 && parseFloat(geo.lat) <= 12.20 && parseFloat(geo.lon) <= 76.8);
            setGeojsondata([...newgeojson]);
            setPosition([0, 0]);
        }
    }
    return (
        <div className='flex justify-between items-center w-full space-y-4 space-x-4'>
            <div className='w-full space-y-4'>
                <div>
                    <Scores
                        mainScoreName="Sustainability Score"
                        mainScoreValue={8}
                        scores={
                            [
                                { scoreName: "Score-1", scoreValue: 8, scoreColor: 'red' },
                                { scoreName: "Score-2", scoreValue: 8, scoreColor: 'purple' },
                                { scoreName: "Score-3", scoreValue: 8, scoreColor: 'blue' }
                            ]
                        }
                    />
                </div>
                <div className='flex items-center justify-between p-2'>
                    <div className='flex space-x-2'>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ward</InputLabel>
                                <Select
                                    value={wardValue}
                                    label="Ward"
                                    onChange={handleWardChange}
                                >
                                    <MenuItem value={"Ward1"}>Ward1</MenuItem>
                                    <MenuItem value={"Ward2"}>Ward2</MenuItem>
                                    <MenuItem value={"Ward3"}>Ward3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Parameter</InputLabel>
                                <Select
                                    value={parameter}
                                    label="Parameter"
                                    onChange={handleParameterChange}
                                >
                                    <MenuItem value={"Parameter-1"}>Parameter-1</MenuItem>
                                    <MenuItem value={"Parameter-2"}>Parameter-2</MenuItem>
                                    <MenuItem value={"Parameter-3"}>Parameter-3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div>
                        <Button onClick={handleApplyClick} variant='contained' size='large' disableElevation>Apply</Button>
                    </div>

                </div>
                <div className='shadow-md p-2 rounded-lg'>
                    <SpecificPageMapComponent
                        geojson={geojsonData}
                        position={position} />
                </div>
            </div>
            
        </div>
    )
}

export default SustainabilityPage