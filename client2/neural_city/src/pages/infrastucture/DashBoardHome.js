import React from 'react'
import MapComponent from '../../Components/MapComponents/Map';
import OverAllScoreComponent from '../../Components/OtherComponents/OverAllScoreComponent';
import IndividualScores from '../../Components/OtherComponents/IndividualScores';
import LineBarCombination from '../../Components/Charts/LineBarCombination';
import ActionCard from '../../Components/OtherComponents/ActionCard';
import WardTable from '../../Components/Tables/WardTable';
import MapAnalysis from '../../Components/OtherComponents/MapAnalysis';

// function caseChange(str) {
//     let sepe = str.split("_");
//     let ans = sepe.map((s) => {
//         return s[0].toUpperCase() + s.substring(1);
//     }).join(" ");
//     return ans;
// }
function DashBoardHome() {
    return (
        <div className='w-full'>
            <div className='relatives w-full space-y-4 sm:space-y-0 sm:p-4'>
                <div id='overall' className='w-full section sm:h-[80vh] sm:flex items-center justify-between sm:space-x-6 space-y-2 sm:space-y-0'>
                    <OverAllScoreComponent />
                    <IndividualScores />
                </div>
                <div id='deepDive' className='w-full section sm:h-[100vh] sm:flex items-center space-y-2 sm:space-y-0 justify-between'>
                    <MapAnalysis />
                    <MapComponent />
                </div>
                <div id='actionItems' className='w-full section sm:h-[100vh] sm:flex items-center space-y-2 sm:space-y-0 justify-between'>
                    <LineBarCombination />
                    <ActionCard />
                </div>
                <div
                    id='wardTable'
                    className='w-full section sm:h-[100vh] sm:flex sm:items-center 
                    sm:justify-between mb-2 
                    rounded-lg
                    space-y-2
                    sm:space-y-0'
                >
                    <WardTable />
                </div>
            </div>
        </div>
    )
}

export default DashBoardHome