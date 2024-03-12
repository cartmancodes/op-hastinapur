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
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        colors: score < 35 ? ["#FF0000"] : score < 70 ? ["#e7e7e7"] : ["#008000"],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    strokeWidth: '97%',
                    margin: 5,
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: '33px',
                        fontWeight: 'bold',
                        color: 'black'
                    },
                    value: {
                        show: false,
                        offsetY:0,
                        fontSize: '44px',
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
        labels: [`${score}`],
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