import React, { useRef } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MapComponent from './MapComponents/MapComponent';
import { useState } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { mockData, mockRecommendation } from './MapComponents/MockData';
import { wardDivision } from './MapComponents/wardDivisionData';
import { isMarkerInsidePolygon } from './MapComponents/UtilityFunctions';
import OverAllScoreComponent from './OtherComponents/OverAllScoreComponent';
import IndividualScores from './OtherComponents/IndividualScores';
import LineBarCombination from './Charts/LineBarCombination';
import ActionCard from './OtherComponents/ActionCard';
import WardTable from './OtherComponents/WardTable';
import MapAnalysis from './OtherComponents/MapAnalysis';
import { useEffect } from 'react';

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
    const [wardRange, setwardRange] = useState(5);
    const [currSection, setCurrSection] = useState('overall');
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

    let sectionActive = 'py-2 px-4 bg-indigo-600 bg-opacity-100  text-white font-bold';
    let sectionInactive = 'py-2 px-4';
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setCurrSection(entry.target.id);
            }
          });
        }, { threshold: 0.5 });
    
        if (containerRef.current) {
          const divs = containerRef.current.querySelectorAll('.section');
          divs.forEach(div => observer.observe(div));
        }
    
        return () => {
          if (containerRef.current) {
            const divs = containerRef.current.querySelectorAll('.section');
            divs.forEach(div => observer.unobserve(div));
          }
        };
    }, []);
    
    const containerRef = useRef(null);
    return (
        <div>
            <div className='sticky top-0 p-2 bg-white z-[1001] sm:flex justify-between items-center'>
                <div className='flex-start'>
                    <h1 className='text-2xl font-bold text-gray-800'>CityX</h1>
                    <p className='text-gray-500 text-xl'>Dashboard <KeyboardArrowRightIcon color='primary' /> </p>
                </div>
                <div className='border rounded-lg [&>*]:border-r justify-between flex first:rounded-l-lg last:rounded-r-lg border-r last:border-r-none'>
                    <a href="#overall" onClick={() => setCurrSection('overall')} className={currSection == 'overall' ? sectionActive : sectionInactive}>Overall</a>
                    <a href="#deepDive"><div onClick={() => setCurrSection('deepDive')} className={currSection == 'deepDive' ? sectionActive : sectionInactive}>Deep Dive</div></a>
                    <a href="#actionItems"><div onClick={() => setCurrSection('actionItems')} className={currSection == 'actionItems' ? sectionActive : sectionInactive}>Action Items/Issues</div></a>
                    <a href="#wardTable"><div onClick={() => setCurrSection('wardTable')} className={currSection == 'wardTable' ? sectionActive : sectionInactive}>Ward Table</div></a>
                </div>
                <div className='w-[22%]'>
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
            <div className='relative p-4' ref={containerRef}>
                <div id='overall' className='section pt-[60px] flex items-center justify-between space-x-2'>
                    <OverAllScoreComponent />
                    <IndividualScores />
                </div>
                <div id='deepDive' className='section pt-[120px] sm:flex items-center space-y-2 sm:space-y-0 justify-between'>
                    <MapAnalysis />
                    <MapComponent />
                </div>
                <div id='actionItems' className='section pt-[120px] sm:flex items-center space-y-2 sm:space-y-0 justify-between'>
                    <LineBarCombination />
                    <ActionCard />
                </div>
                <div
                    
                    id='wardTable'
                    className='section pt-[120px] sm:flex sm:items-center 
                    sm:justify-between mb-2 
                    rounded-lg
                    space-y-2
                    sm:space-y-0'
                >
                    <WardTable />
                </div>
            </div>
        </div>
    )
}

export default DashBoardHome