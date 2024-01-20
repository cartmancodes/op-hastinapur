import React from 'react'
import { VictoryLine, VictoryChart, VictoryLegend } from 'victory';

function Linechart() {
    let xAxis = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    let lkoData = [1.8,1.6,1.8,2.3,2,2.5];
    let nationalData = [6, 3, 7, 9.5, 4, 2];
    let dat1 = [];
    let dat2 = [];
    for (let i = 0; i < xAxis.length; i++) {
        dat1.push({ x: xAxis[i], y: lkoData[i] });
        dat2.push({ x: xAxis[i], y: nationalData[i] });
    }
    return (
        <div className='shadow-md rounded-lg sm:w-[40vw] w-[100%] h-[300px]'>
            <div className='flex items-center justify-between pt-4 pl-2'>
                <p className='md:text-xl text-sm md:font-semibold'>CityX Score Trend</p>
                {/* <div className='flex items-center justify-between space-x-2 mx-2'>
                    <div className='bg-purple-800 w-[10px] h-[10px] text-sm'></div><span>Jhansi</span>
                    <div className='bg-black w-[10px] h-[10px] text-sm'></div><span>National</span>
                </div> */}
            </div>
            <VictoryChart
             width={500}
             height={200}
             domain={{ y: [0, 5] }}
            >
                <VictoryLine
                    name='jhansi'
                    animate={{
                        duration: 2000,
                        onEnter: { duration: 1000}
                    }}
                    style={{
                        data: { stroke: "purple" }
                    }}
                    data={dat1}
                />
                {/* <VictoryLine
                    name='national'
                    animate={{
                        duration: 2000,
                        onEnter: { duration: 1000 }
                    }}
                    style={{
                        data: { stroke: "black"}
                    }}
                    data={dat2}
                /> */}
            </VictoryChart>
        </div>
    )
}

export default Linechart