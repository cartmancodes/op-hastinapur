import React from 'react'
import ReactApexChart from 'react-apexcharts';
import InfoButton from '../ui/InfoButton';

function RadarChart({ title, parameterScore, parameterNames, key }) {
    const [state, setState] = React.useState({
        series: [
            {
                name: 'Quarter-1',
                data: parameterScore ? parameterScore : [80, 60, 44, 25, 10, 90, 50, 72],
            },
        ],
        options: {
            chart: {
                type: 'radar',
                height: '100%',      // important
                width: '100%',       // optional, for completeness
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                },
                toolbar: {
                    show: false
                },
            },

            stroke: {
                width: 2
            },
            fill: {
                opacity: 0.1
            },
            markers: {
                size: 0
            },
            yaxis: {
                stepSize: 20,
                
                min: 0,
                max: 100,
                tickAmount: 5 // Optional: Controls how many grid lines you see

            },
            xaxis: {
                categories: parameterNames ? parameterNames : ['Cleaniness', 'Walkability', 'Road', 'Mobility', 'Health and Env', 'Encroachment', 'Public Safety', 'Aesthetics']
            }
        },
    });

    return (
        <div className="w-[100%] rounded-xl h-[667px] hidden sm:block bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className='flex items-center space-x-2 text-xl sm:p-3 sm:py-3 p-2 border-b font-bold'>{title}<InfoButton text={"Here is Radar Chart"}></InfoButton></div>
            <ReactApexChart height={"90%"} options={state.options} series={state.series} type="radar" />
            <div id="html-dist"></div>
        </div >
    )
}

export default RadarChart