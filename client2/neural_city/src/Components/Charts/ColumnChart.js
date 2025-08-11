import React from "react";
import ReactApexChart from "react-apexcharts";

export const ColumnChart = ({ title,dataValues,dataNames,key }) => {
    const [state, setState] = React.useState({

        series: [{
            name: 'Number of Data Points',
            data: dataValues ? dataValues : [44, 55, 57, 56, 61, 58, 63, 60]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                toolbar: {
                    show: false
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '100%',
                    borderRadius: 5,
                    borderRadiusApplication: 'end'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: dataNames ? dataNames : ['Cleaniness', 'Walkability', 'Road Quality', 'Mobility', 'Health and Env.', 'Enchroachment', 'Public Safety', 'Aesthetics'],
            },
            yaxis: {
                title: {
                    text: 'No of Data Points'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            }
        },


    });



    return (
        <div className="bg-white border w-full rounded-xl">
            <div className='flex items-center space-x-2 text-xl sm:p-3 sm:py-3 p-2 border-b font-bold'>{title}</div>
            <div id="chart" className='w-full p-4'>
                <ReactApexChart key={key} width={'100%'} options={state.options} series={state.series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}
