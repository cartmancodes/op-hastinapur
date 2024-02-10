import React, { useState } from 'react'
import Chart from 'react-apexcharts'

function HalfPieChart() {
    let [series, setSeries] = useState([49]);
    let [options, setOption] = useState({
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#f2f2f2",
                    strokeWidth: "100%"
                },
                dataLabels: {
                    show: true,
                    value: {
                        show: false,
                    },
                    total: {
                        show: true,
                        label: series[0],
                        color: "#373d3f",
                        fontWeight: "bold",
                        fontSize: "30px"
                    },

                },
                grid: {
                    padding: {
                        top: 0,
                        bottom: 0
                    },
                    margin: {
                        top: 0,
                        bottom: 0
                    }
                },
                goals: [
                    {
                        name: 'Expected',
                        value: 52,
                        strokeColor: '#775DD0'
                    }
                ]
            },

        }
    })

    return (
        <div className='mt-[0]'>
            <Chart
                options={options}
                series={series}
                type="radialBar"
                width="600"
            />
        </div >
    )
}

export default HalfPieChart