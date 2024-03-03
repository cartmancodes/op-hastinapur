import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { isMobile } from 'react-device-detect'
function HalfPieChart({score}) {
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true);
    //     let timeOut = setTimeout(() => {
    //         setLoading(false);
    //     },200);
    // },[])
    let [series, setSeries] = useState([score]);
    let [options, setOption] = useState({
        chart: {
            type: 'radialBar',
            offsetY: -50,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '97%',
                    margin: 5,
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY:0,
                        fontSize: '22px',
                        fontWeight: 'bold'
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -30,
                bottom: -20
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 53, 91]
            },
        },
        labels: ['Overall Score'],
    });

    console.log(isMobile);

    return (
        loading ? <div>Loading...</div> : <div className='mt-[0]'>
            <Chart
                options={options}
                series={series}
                type="radialBar"
                width={isMobile ? 400 : 600}
            />
        </div >
    )
}

export default HalfPieChart