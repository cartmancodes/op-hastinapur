import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import { isMobile } from 'react-device-detect';
import InfoButton from '../ui/InfoButton';

function LineChart({ chart_name,cityData,key }) {
    const cityXData = cityData ? cityData : [30, 45, 24, 13];

    const [series, setSeries] = useState([{
        name: 'Jhansi',
        data: cityXData
    }]);

    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false
            },
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        colors: ['#2E93fA'],
        dataLabels: {
            enabled: true,
        },
        labels: ["2024Q3", "2024Q2", "2025Q1", "2025Q2"],
        xaxis: {
            categories: ["2024Q3", "2024Q2", "2025Q1", "2025Q2"],
        }
    });

    return (
        <div className='bg-white w-[100%] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl'>
            <div className='flex items-center space-x-2 text-xl sm:p-3 sm:py-3 p-3 border-b font-bold'>{chart_name}<InfoButton text={"Here is Line Chart"}></InfoButton></div>
            <div id="chart" className='w-full p-4'>
                <Chart key={key} width={'100%'} options={options} series={series} type="line" height={isMobile ? 300 : 550} />
            </div>
        </div>
    )
}

export default LineChart;
