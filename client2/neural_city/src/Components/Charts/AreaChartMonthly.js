import React from 'react';
import Chart from 'react-apexcharts';
<<<<<<< HEAD
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const AreaChartMonthly = ({ data, color }) => {
    const seriesData = [{
        name: 'Monthly Data',
        data: data.monthlyData // Sample monthly data
=======

const AreaChartMonthly = () => {
    const seriesData = [{
        name: 'Monthly Data',
        data: [80, 100, 95, 90, 85, 80, 70, 60, 50, 45, 40, 30] // Sample monthly data
>>>>>>> bc63538a (Modified:Map)
    }];

    const chartOptions = {
        chart: {
            type: 'area',
<<<<<<< HEAD
=======
            width: '900px', // Adjust width as per requirement
            height: 250, // Adjust height as per requirement
>>>>>>> bc63538a (Modified:Map)
            zoom: {
                enabled: false
            },
            toolbar: {
<<<<<<< HEAD
                show: false
            },
            background: data.colors[0]
        },
        
        toolbar: {
            enabled: true,
        },
        colors: [data.colors[2]],
        xaxis: {
            categories: ['Jan', 'Apr', 'Jul', 'Oct', 'Dec']
=======
                show: true
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
>>>>>>> bc63538a (Modified:Map)
        },
        yaxis: {
            max: 100,
            min: 0
        },
        dataLabels: {
            enabled: false
        },
<<<<<<< HEAD
        stroke: {
            curve: 'stepline',
        },
        fill: {
            type: 'gradient',
            shade: 'light'
=======
        title: {
            text: "Monthly Analysis"
        },
        stroke: {
            curve: 'stepline',
>>>>>>> bc63538a (Modified:Map)
        }
    };

    return (
<<<<<<< HEAD
        <div style={{ color: data.colors[2] }} className='shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md border-gray-200'>
            <div style={{ background: data.colors[1] }} className='bg-blue-200 border-b border-black flex items-center justify-between rounded-t-md py-1 px-2'>
                <div className='font-bold'>{data.name}</div>
                <div style={{ color: data.score < 35 ? 'red' : data.score < 70 ? 'blue' : 'green' }} className='font-bold'>{data.score}</div>
                <span className={data.change < 0 ? 'text-red-500' : 'text-green-800'}>{data.change}% {data.change < 0 ? <ArrowDropDownIcon color='red' /> : <ArrowDropUpIcon />}</span>
            </div>
=======
        <div>
>>>>>>> bc63538a (Modified:Map)
            <Chart
                options={chartOptions}
                series={seriesData}
                type="area"
<<<<<<< HEAD
                height={150}
                width={'100%'}
            />
            <div style={{ background: data.colors[0] }} className={`border-t h-auto w-full p-2 rounded-b-md mt-[-15px]`}>
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
=======
                height={250}
                width={'600px'}
            />
>>>>>>> bc63538a (Modified:Map)
        </div>
    );
};

export default AreaChartMonthly;