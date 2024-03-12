import React from 'react';
import Chart from 'react-apexcharts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const AreaChartMonthly = ({ data, color }) => {
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
                show: false
            },
            background: data.colors[1]
        },
        toolbar: {
            enabled: true,
        },
        colors: [data.colors[2]],
        xaxis: {
            categories: ['Jan', 'Apr', 'Jul',  'Oct', 'Dec']
        },
        yaxis: {
            max: 100,
            min: 0
        },
        dataLabels: {
            enabled: false
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
        <div style={{color: data.colors[2]}} className='h-[50%]'>
            <div style={{background: data.colors[1]}} className='bg-blue-200 border-b border-black flex items-center justify-between rounded-t-md py-1 px-2'>
                <div className='font-bold'>{data.name}</div>
                <div style={{color : data.score < 35 ? 'red' : data.score < 70 ? 'blue' : 'green'}} className='font-bold'>{data.score}</div>
                <span className={data.change < 0 ? 'text-red-500' : 'text-green-800'}>{data.change}% {data.change < 0 ? <ArrowDropDownIcon color='red' /> : <ArrowDropUpIcon />}</span>
            </div>
            <Chart
                options={chartOptions}
                series={seriesData}
                type="area"
                height={150}
                width={'100%'}
            />
            <div style={{background: data.colors[1]}} className='border-t border-black w-full p-2 rounded-b-md mt-[-15px]'>
                {
                    data.topParams.map((param) => {
                        return (
                            <div className='flex items-center justify-between border-gray-300 text-md'>
                                <div className='w-[60%] font-bold text-sm'>{param.name}</div>
                                <div className='text-gray-500 font-bold text-center text-sm'>{param.score}</div>
                                <div className='w-[25%] text-right text-sm'>
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