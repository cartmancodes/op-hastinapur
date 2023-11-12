import React from 'react'
import { aqiData } from '../OtherComponents/AqiData'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory'
function AQIChart() {
    const data = aqiData;
    const dataToPlot = [];
    data.map((dat) => {
        dataToPlot.push({
            x: dat.name, y: dat.list[0].components.pm2_5
        });
    })
    return (
        <div className='shadow-md rounded-lg sm:w-[40vw]'>
            <div className='flex items-center justify-between pt-4 pl-2'>
                <h1 className='md:text-xl text-sm md:font-bold'>Air Quality Index Tehsil Wise</h1>
            </div>
            <VictoryChart
                width={500}
                height={200}
                theme={VictoryTheme.material}
            >
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={dataToPlot}
                    domain={{ y: [70, 120] }}
                    labels={({ datum }) => datum.y}
                />
            </VictoryChart>
        </div>

    )
}


export default AQIChart