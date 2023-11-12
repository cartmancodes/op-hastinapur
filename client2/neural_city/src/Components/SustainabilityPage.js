import React from 'react'
import SpecificPageMapComponent from './MapComponents/SpecificPageMapComponent'
import { Button, Select, FormControl, Box, MenuItem, InputLabel, } from '@mui/material'
import { useState } from 'react'
import Scores from './OtherComponents/Scores'
import { geojson } from './MapComponents/heatmap'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RightSideBar from './Utility/RightSideBar'
import MapTable from './OtherComponents/DataGrid'

function SustainabilityPage() {
    let intialgeojson = geojson;
    const [scoreValue, setScoreValue] = useState("Any");
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
        <div className='flex relative justify-between items-center w-[full] space-x-4'>
            <div className='w-[79%] space-y-4'>
                <div className='flex-start'>
                    <h1 className='text-4xl font-bold text-gray-800'>Jhansi</h1>
                    <p className='text-gray-500 text-xl'>Dashboard <KeyboardArrowRightIcon color='primary' /> </p>
                </div>
                <div>
                    <Scores
                        mainScoreName="Walkability Score"
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
                    <div className='sm:flex space-y-2 sm:space-y-0 sm:space-x-2'>
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

                        <Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Score</InputLabel>
							<Select
								value={scoreValue}
								label="Score"
								onChange={(e) => setScoreValue(e.target.value)}
							>
								<MenuItem value={"Any"}>Any</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
							</Select>
						</FormControl>
					</Box>
                    </div>
                </div>
                <div className='shadow-md p-2 rounded-lg'>
                    <SpecificPageMapComponent
                        geojson={geojsonData}
                        position={position} />
                </div>
                <MapTable />
            </div>
            <RightSideBar/>
        </div>
    )
}

export default SustainabilityPage