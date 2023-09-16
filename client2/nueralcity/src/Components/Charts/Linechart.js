import React from 'react'
import { VictoryLine, VictoryChart, VictoryLegend } from 'victory';

function Linechart() {
    let xAxis = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    let lkoData = [0, 5, 2, 6, 3, 9.3];
    let nationalData = [6, 3, 7, 9.5, 4, 2];
    let dat1 = [];
    let dat2 = [];
    for (let i = 0; i < xAxis.length; i++) {
        dat1.push({ x: xAxis[i], y: lkoData[i] });
        dat2.push({ x: xAxis[i], y: nationalData[i] });
    }
    return (
        <div className='shadow-md m-2 rounded-lg w-[58vw] p-2'>
            <div className='flex items-center justify-between p-2 pt-4'>
                <p className='text-xl font-semibold'>Lucknow Vs National Score</p>
            </div>
            <VictoryChart height={300} width={600}>
                <VictoryLegend x={60} y={60}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
                    data={[
                        { name: "Lucknow", symbol: { fill: "violet", type: "sqaure" } },
                        { name: "National", symbol: { fill: "black" } },
                    ]}
                />
                <VictoryLine
                    name='lko'
                    animate={{
                        duration: 2000,
                        onEnter: { duration: 1000 }
                    }}
                    style={{
                        data: { stroke: "violet" }
                    }}
                    data={dat1}
                />
                <VictoryLine
                    name='national'
                    animate={{
                        duration: 2000,
                        onEnter: { duration: 1000 }
                    }}
                    style={{
                        data: { stroke: "black" }
                    }}
                    data={dat2}
                />
            </VictoryChart>
        </div>
    )
}

export default Linechart