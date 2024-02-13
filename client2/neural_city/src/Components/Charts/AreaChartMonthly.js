import React from 'react';
import Chart from 'react-apexcharts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


// {
//     name: "Cleaniness",
//     monthlyData: [38, 72, 14, 65, 83, 45, 92, 27, 51, 96, 63, 20],
//     score: 67,
//     change: 2.4,
//     topParams: [
//         {name:"Garbage and Litter",score: 57,change: 1.3},
//         {name:"Dust",score: 47,change: -1.3},
//         {name:"Drain",score: 33,change: 2.3}
//     ]
// },
const AreaChartMonthly = ({ data }) => {
    const seriesData = [{
        name: 'Monthly Data',
        data: data.monthlyData // Sample monthly data
    }];

    const chartOptions = {
        chart: {
            type: 'area',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: true
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
            max: 100,
            min: 0
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: data.name
        },
        stroke: {
            curve: 'stepline',
        },
        fill: {
            type: 'gradient',
            shade: 'light'
        }
    };

    return (
        <div className='rounded-lg border-dashed border p-2'>
            <Chart
                options={chartOptions}
                series={seriesData}
                type="area"
                height={180}
                width={'280px'}
            />
            <div className='w-full bg-gray-100 rounded-lg mt-[-20px]'>
                <div className='bg-blue-200 border-b flex items-center justify-between rounded-lg p-2'>
                    <div className='font-bold'>Score</div>
                    <div className='font-bold text-gray-700'>{data.score}</div>
                    <span className={data.change < 0 ? 'text-red-500' : 'text-green-500'}>{data.change}% {data.change < 0 ? <ArrowDropDownIcon color='red' /> : <ArrowDropUpIcon />}</span>
                </div>
                {
                    data.topParams.map((param) => {
                        return (
                            <div className='flex items-center justify-between px-2'>
                                <div className='w-[58%] text-sm'>{param.name}</div>
                                <div className='font-bold text-gray-500'>{param.score}</div>
                                <div className='w-[27%]'>
                                    <span className={param.change < 0 ? 'text-red-500' : 'text-green-500'}>{param.change}% {param.change < 0 ? <ArrowDropDownIcon color='red' /> : <ArrowDropUpIcon />}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AreaChartMonthly;