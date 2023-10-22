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
        <div className='shadow-md rounded-lg h-[350px] w-[40vw]'>
            <div className='flex items-center justify-between pt-4 pl-2'>
                <p className='text-xl font-semibold'>Jhansi Vs National Score</p>
                <div className='flex items-center justify-between space-x-2 p-2'>
                    <div className='bg-purple-800 w-4 h-4'></div><span>Jhansi</span>
                    <div className='bg-black w-4 h-4'></div><span>National</span>
                </div>
            </div>
            <VictoryChart
             width={500}
             height={200}>
                <VictoryLine
                    name='lko'
                    animate={{
                        duration: 2000,
                        onEnter: { duration: 1000,margin:"5px" }
                    }}
                    style={{
                        data: { stroke: "purple" }
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
                        data: { stroke: "black",margin:"5px"}
                    }}
                    data={dat2}
                />
            </VictoryChart>
        </div>
    )
}

export default Linechart