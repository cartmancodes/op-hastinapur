import React from 'react'
import ParameterCard from '../../Components/Cards/ParameterCard'
import AreaChartMonthly from '../../Components/Charts/AreaChartMonthly'
import LineChart from '../../Components/Charts/LineChart'
import RadarChart from '../../Components/Charts/RadarChart'
import { ColumnChart } from '../../Components/Charts/ColumnChart'
import { Box, FormControl, Select, MenuItem } from '@mui/material'
import { getWardsWithName } from '../../utils/MapUtils'
import { wardDivision } from '../../Components/MapComponents/wardDivisionData'
import { useState } from 'react'
import { Button } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import WardTable from '../../Components/Tables/WardTable'
import { Carousel } from 'react-responsive-carousel';
import { areaData } from '../../mockData/area_scores'

function AreaWise() {
    let wards = getWardsWithName(wardDivision);

    const [area_type, setAreaType] = useState("wards");

    const handleWardChange = (e) => {
        setCurrArea(e.target.value);
    }

    const handleChangeAreaType = (e) => {
        setAreaType(e.target.value);
    }

    let datapoints = [
        {
            file_name: "/images/frame_1704116275349_0003.jpg"
        },
        {
            file_name: "/images/frame_1704116275349_0001.jpg"
        },
        {
            file_name: "/images/frame_1704116609012_0213.jpg"
        },
        {
            file_name: "/images/frame_1704116609012_0235.jpg"
        },
        {
            file_name: "/images/frame_1704116609012_0340.jpg"
        }
    ]

    const [area, setCurrArea] = useState(0);

    const areas = areaData.sort((a, b) => a.parameters.overall.score - b.parameters.overall.score).filter(area => area.area_type === area_type);

    const scores = [];
    const frequencies = [];

    for (const param of Object.values(areas[area].parameters)) {
        scores.push(param.score);
        frequencies.push(param.frequency);
    }

    const totalNumberOfData = frequencies.reduce((a,b) => a + b);

    let scoreTrend = [];
    scoreTrend.push(areas[area].parameters.overall.score - 5);
    scoreTrend.push(areas[area].parameters.overall.score + 5);
    scoreTrend.push(areas[area].parameters.overall.score - 1.5);
    scoreTrend.push(areas[area].parameters.overall.score);

    return (
        <div className='p-4 space-y-10 w-full'>
            <div className='flex items-center border p-4 bg-white justify-between rounded-md w-full space-x-10'>
                <div className="flex space-x-10">
                    <Box sx={{ minWidth: 220 }}>
                        <label className='text-gray-700'> Area Type</label>
                        <FormControl fullWidth>
                            <Select
                                size='small'
                                value={area_type}
                                onChange={handleChangeAreaType}
                            >
                                <MenuItem value={"wards"}>Wards</MenuItem>
                                <MenuItem value={"roads"}>Roads</MenuItem>
                                <MenuItem value={"intersection"}>Intersections</MenuItem>
                                <MenuItem value={"parks"}>Parks</MenuItem>
                                <MenuItem value={"markets"}>Markets</MenuItem>
                                <MenuItem value={"tourist_area"}>Tourist Area</MenuItem>
                                <MenuItem value={"transport_hub"}>Transport Hub</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 220 }}>
                        <label className='text-gray-700'> Area</label>
                        <FormControl fullWidth>
                            <Select
                                size='small'
                                value={area}
                                onChange={handleWardChange}
                            >
                                {areas.map((ward, idx) => {
                                    return (<MenuItem value={idx}>{ward.area_name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </div>


                <Button
                    variant="outlined"
                    className="flex items-center space-x-2"
                >
                    <p>Download</p>
                    <CloudDownloadIcon />
                </Button>
            </div>


            <div className='flex items-center justify-between w-full space-x-10'>
                <ParameterCard parameter_name={"Area Name"} parameter_value={areas[area].area_name} />
                <ParameterCard parameter_name={"Area Rank"} parameter_value={`${area + 1}/${areas.length}`} />
                <ParameterCard parameter_name={"Datapoits Collected"} parameter_value={totalNumberOfData} />
            </div>

            <div className='grid grid-cols-2 gap-[20px]'>
                <LineChart key={areas[area].area_name + "line"} cityData={scoreTrend}  chart_name={"Area Score Trend"} />
                <RadarChart key={areas[area].area_name + "radar"} parameterScore={scores} title={"Parameter Breakdown"} />
                <div className='border rounded-xl w-[100%] h-[452px] bg-white'>
                    <div className='p-4 font-bold text-2xl border-b'>Critical Issue</div>
                    <div className='p-4 space-y-6'>
                        <div className='flex items-center justify-between'>
                            <div>Main St - Litter</div>
                            <div>1.4</div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div>Market Rd - Lighting</div>
                            <div>1.6</div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div>Station - Pothole</div>
                            <div>1.8</div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div>Steets - Litter</div>
                            <div>1.7</div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div>Main St - Dustbins</div>
                            <div>1.5</div>
                        </div>
                    </div>
                </div>

                <div className='w-[100%]'>
                    <ColumnChart key = {areas[area].area_name + "column"} dataValues={frequencies} title={"Data Points for Each Parameter"} />
                </div>
            </div>

            <div>
                <WardTable />
            </div>

            <div className='w-full flex items-center justify-center'>
                <div className='w-[50%]'>
                    <Carousel dynamicHeight autoPlay showThumbs={true} showIndicators={false}>
                        {
                            datapoints.map((dat) => {
                                return (
                                    <div>
                                        <img src={`${dat.file_name}`} />
                                        <p className="legend">Legend 1</p>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default AreaWise