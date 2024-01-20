import React from 'react'
import Scores from './OtherComponents/Scores';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Linechart from './Charts/Linechart';
import MapComponent from './MapComponents/MapComponent';
import BarChartComponent from './Charts/BarChartComponent';
import { useState } from 'react';
import AirQualityIndex from './OtherComponents/AirQualityIndex';
import 'react-dates/initialize'; // This is required to initialize the library
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'; 
import { mockData, mockRecommendation } from './MapComponents/MockData';
import BarChartWard from './Charts/BarCharWard';
import { Select, MenuItem } from '@mui/material'
import { wardDivision } from './MapComponents/wardDivisionData';
import { isMarkerInsidePolygon } from './MapComponents/UtilityFunctions';
import AlertBar from './Utility/AlertBar';

let cityParams = [
    "cleaniness_score",
    "sidewalk_score",
    "road_score",
    "encroachment_score"
]
const sub_parameters = [
    ["overall_cleaniness_score", "general_cleanliness", "littering", "dustbin", "drain"],
    ["overall_sidewalk_score", "maintenance_quality", "cleanliness_and_hygiene", "effective_use_vs_occupation", "markets", "wrong_parking"],
    ["overall_road_score", "surface_quality", "blacktop_quality", "lane_markings", "right_rules", "lane_discipline", "wrong_parking"],
    ["overall_encroachment_score", "general_encroachment", "encroachment_by_whom"],
    ["overall_traffic_calming", "toilet"]
]

function caseChange(str) {
    let sepe = str.split("_");
    let ans = sepe.map((s) => {
        return s[0].toUpperCase() + s.substring(1);
    }).join(" ");
    return ans;
}
function DashBoardHome() {
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
      });
    
    const [focusedInput, setFocusedInput] = useState(null);

    const handleDateChange = ({ startDate, endDate }) => {
        setDateRange({ startDate, endDate });
      };

    const [overallScore, setOverAllScore] = useState(2.5);
    const [nationalScore, setNationalScore] = useState(2.5);
    const [walkabilityScore, setwalkabilityScore] = useState(2);
    const [touristScore, setTouristScore] = useState(4);
    const [wardRange, setwardRange] = useState(5);
    const handleWardRangeChange = (e) => {
        setwardRange(e.target.value);
    }
    let noOfWardsRange = wardDivision.features.length / 10;
    let wardRanges = [];
    for (let i = 0; i < noOfWardsRange; i++) {
        let start = (i) * 10 + 1;
        let end = Math.min(wardDivision.features.length, (i * 10) + 10);
        let wardR = "Ward" + start + "-" + "Ward" + end;
        wardRanges.push(wardR);
    }
    const [data, setData] = useState(mockData.data);
    const cityParamsValue = [];
    let capitilizecityParams = cityParams.map((param) => caseChange(param));
    let filteredData = data;
    let dataWithWardNumber = [];
    console.log(filteredData)
    filteredData.map((dat) => {
        let score = undefined;
        let ward_name_curr = undefined;
        for (let i = 0; i < wardDivision.features.length; i++) {
            let ward = wardDivision.features[i];
            let isInside = isMarkerInsidePolygon([dat.longitude, dat.latitude], ward.geometry.coordinates);
            if (isInside) {
                ward_name_curr = ward.properties["Ward Numbe"];
                break;
            }
        }
        if (dat["score"]["overall_score"] !== 'Ignore') {
            let preparedData = {
                "ward_num": ward_name_curr,
                "score": dat["score"]["overall_score"],
            };
            dataWithWardNumber.push(preparedData);
        }
    });
    let wardAvg = new Array(wardDivision.features.length);

    for (let i = 0; i < wardAvg.length; i++) {
        let arr = [0, 0, 0];
        wardAvg[i] = arr;
    }
    dataWithWardNumber.map((dat) => {
        let ward_number = dat.ward_num;
        wardAvg[ward_number - 1][2] = (wardAvg[ward_number - 1][0] + (Number)(dat.score)) / (wardAvg[ward_number - 1][1] + 1);
        wardAvg[ward_number - 1][0] += (Number)(dat.score);
        wardAvg[ward_number - 1][1]++;
    });
    cityParams.map((param, idx) => {
        let sum = 0;
        let num = 0;
        let sub_param = sub_parameters[idx][0];
        filteredData.map((dat) => {
            if ((dat['score'][param][sub_param]) !== "Ignore") {
                sum += (Number)(dat['score'][param][sub_param]);
                num++;
            }
        });
        let avg = (sum * 1.0) / num;
        cityParamsValue.push(avg);
    });

    const wards = [];
    const wardValue = [];

    let startWard = (wardRange) * 10 + 1;
    let endWard = Math.min(wardDivision.features.length, (wardRange) * 10 + 10);
    for (let i = startWard; i <= endWard; i++) {
        wards.push("Ward" + i);
        wardValue.push(wardAvg[i - 1][2]);
    }
    return (
        <div className='space-y-4'>
            <div className='sm:flex justify-between items-center'>
                <div className='flex-start'>
                    <h1 className='text-4xl font-bold text-gray-800'>CityX</h1>
                    <p className='text-gray-500 text-xl'>Dashboard <KeyboardArrowRightIcon color='primary' /> </p>
                </div>
                <div className='flex-end'>
                    <DateRangePicker
                        startDate={dateRange.startDate}
                        startDateId="your_unique_start_date_id"
                        endDate={dateRange.endDate}
                        endDateId="your_unique_end_date_id"
                        onDatesChange={handleDateChange}
                        focusedInput={focusedInput}
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                    />
                </div>
            </div>
            <Scores
                mainScoreName="Overall Score"
                mainScoreValue={overallScore}
                scores={
                    [
                        { scoreName: "National Average", scoreValue: nationalScore, scoreColor: "purple"},
                        { scoreName: "Walkability Score", scoreValue: walkabilityScore, scoreColor: "blue" },
                        { scoreName: "Tourism Score", scoreValue: touristScore, scoreColor: "gray",disabled:true }
                    ]
                }
            />
            <div className='sm:flex items-center space-y-2 sm:space-y-0 justify-between'>
                <Linechart />
                {/* <AQIChart /> */}
                <div className='p-4 space-y-4 overflow-y-scroll sm:w-[40%] w-[100%] h-[300px] flex flex-col items-center justify-between rounded-lg shadow-md'>
                    {
                        mockRecommendation.map((reco, idx) => {
                            return <AlertBar main_topic={reco.main_topic} heading={reco.heading} id={idx} />
                        })
                    }
                </div>

            </div>
            <MapComponent />
            <div className='sm:flex sm:items-center 
                sm:justify-between mb-2 
                rounded-lg
                space-y-2
                sm:space-y-0
            '>
                <div className='shadow-md p-2 rounded-lg bg-cyan-50'>
                    <h1 className='text-2xl'>City Parameters</h1>
                    <BarChartComponent width={575} XLabels={capitilizecityParams} values={cityParamsValue} />
                </div>
                <div className='shadow-md p-2 rounded-lg bg-yellow-50'>
                    <div className='w-[full] flex item-center justify-between'>
                        <h1 className='text-2xl'>Ward/Area Score</h1>
                        <Select
                            sx={{ width: '170px' }}
                            value={wardRange}
                            onChange={handleWardRangeChange}
                            size='small'
                        >
                            {
                                wardRanges.map((wardR, idx) => {
                                    return <MenuItem value={idx}>{wardR}</MenuItem>
                                })
                            }
                        </Select>
                    </div>
                    <BarChartWard width={600} XLabels={wards} values={wardValue} />
                </div>
            </div>
            {/* <div className='w-full p-4 shadow-md rounded-lg mb-2'>
                <h1 className='text-4xl'>Progress of Intiatives</h1>
                <YojanaTable />
            </div> */}
            <AirQualityIndex />
        </div>
    )
}

export default DashBoardHome