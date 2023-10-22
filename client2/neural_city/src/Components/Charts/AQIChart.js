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
        <div className=''>
            <VictoryChart
                width={600}
                height={300}
                theme={VictoryTheme.material}
                domainPadding={{ x: 15 }}
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