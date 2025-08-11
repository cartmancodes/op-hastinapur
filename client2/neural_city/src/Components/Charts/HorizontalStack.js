import React from "react";
import ReactApexChart from "react-apexcharts";
import InfoButton from "../ui/InfoButton";

export const HorizontalStack = ({ title,dataNames,dataValues }) => {
    let good = [];
    let average = [88.5,87.9,83.9,63.2,71.4,62.3,61.5,75,20,0,100];
    let poor = [10.5,12,16.1,36.8,28.6,37.7,38.5,25.0,57.5,100,0];

    for(let i=0;i<average.length;i++) {
        good.push(100 - parseInt(average[i]) - parseInt(poor[i]));
    }

    const [state, setState] = React.useState({
        series: [{
            name: 'Poor',
            data: poor
        }, {
            name: 'Average',
            data: average
        }, {
            name: 'Good',
            data: good
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                stackType: '100%',
                toolbar: {
                    show: false
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: dataNames ? dataNames : [2008, 2009, 2010, 2011, 2012, 2013, 2014],
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            fill: {
                opacity: 1,
                colors: ['#FF0000','#FFA500','#1B5E20']

            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
            }
        },


    });



    return (
        <div className='bg-white w-[100%] rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
            <div className='flex items-center space-x-2 text-xl sm:p-3 sm:py-3 p-3 border-b font-bold'>{title}<InfoButton text={"Here is Horizontal Chart"}></InfoButton></div>
            <div id="chart" className='w-full p-4'>
                <ReactApexChart options={state.options} series={state.series} type="bar" width={"100%"} height={350} />
            </div>
        </div>
    );
}