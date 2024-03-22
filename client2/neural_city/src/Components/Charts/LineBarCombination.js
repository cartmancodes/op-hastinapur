import React, { useState } from 'react'
import Chart from 'react-apexcharts'
<<<<<<< HEAD
import {isMobile} from 'react-device-detect';
function LineBarCombination() {
    let cityXData = [30, 45, 24, 13, 50];
    let nationalAvg = [30,30,30,30,30];
=======

function LineBarCombination() {
    let cityXData = [30, 45, 24, 13, 50, 45, 17, 35, 22, 27, 12, 12];
    let nationalAvg = [23, 42, 35, 27, 43, 22, 30, 31, 25, 22, 18, 16];
>>>>>>> bc63538a (Modified:Map)
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
<<<<<<< HEAD
                borderRadius: '0',
                horizontal: false,
                columnWidth: '40%', // Change this value to adjust the width of bars
=======
>>>>>>> bc63538a (Modified:Map)
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
<<<<<<< HEAD
            enabledOnSeries: [0]
        },
        labels: ["JAN","APR","JUL","OCT","DEC"],
    })

    return (
        <div className='bg-white w-[100%]  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:w-[48%] p-4 rounded-sm'>
            <div id="chart">
                <Chart width={'100%'} options={options} series={series} type="line" height={isMobile ? 300 : 550} />
=======
            enabledOnSeries: [0, 1]
        },
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    })

    return (
        <div className='shadow-md p-4 rounded-lg'>
            <div id="chart">
                <Chart width={680} options={options} series={series} type="line" height={550} />
>>>>>>> bc63538a (Modified:Map)
            </div>
            <div id="html-dist"></div>
        </div>
    )
}

export default LineBarCombination