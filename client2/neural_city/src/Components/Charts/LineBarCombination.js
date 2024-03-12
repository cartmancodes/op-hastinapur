import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import {isMobile} from 'react-device-detect';
function LineBarCombination() {
    let cityXData = [30, 45, 24, 13, 50, 45, 17, 35, 22, 27, 12, 12];
    let nationalAvg = [30,30,30,30,30,30,30,30,30,30,30,30];
    let cityXWithColor = [];
    let national = [];
    for(let i=0;i<cityXData.length;i++) {
        if(cityXData[i] < nationalAvg[i]) {
            cityXWithColor.push({
                y: cityXData[i],
                x: i + 1,
                fillColor: "#FF0000"
            })
        } else {
            cityXWithColor.push({
                y: cityXData[i],
                x: i + 1,
                fillColor: "#008000"
            })
        }
        national.push({
            y: nationalAvg[i],
            x: i + 1,
        })
        console.log(cityXWithColor[i].y);
    }
    const [series, setSeries] = useState([{
        name: 'CityX',
        type: 'bar',
        data: cityXWithColor
    }, {
        name: 'National Average',
        type: 'line',
        data: national
    }]);

    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'line',
        },
        stroke: {
            width: [0, 4]
        },
        title: {
            text: 'CityX Score Trend',
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                dataLabels: {
                    position: 'bottom'
                },
            },
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        colors: ['#000000', '#2E93fA'],
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0]
        },
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    })

    return (
        <div className='bg-white w-[100%]  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:w-[48%] p-4 rounded-sm'>
            <div id="chart">
                <Chart width={'100%'} options={options} series={series} type="line" height={isMobile ? 300 : 550} />
            </div>
            <div id="html-dist"></div>
        </div>
    )
}

export default LineBarCombination