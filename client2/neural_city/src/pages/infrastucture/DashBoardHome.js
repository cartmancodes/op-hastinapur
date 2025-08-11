import React from 'react'
import MapComponent from '../../Components/MapComponents/Map';
import WardTable from '../../Components/Tables/WardTable';
import MapAnalysis from '../../Components/Charts/MapAnalysis';
import CityNameCard from '../../Components/Cards/CityNameCard';
import ParameterCard from '../../Components/Cards/ParameterCard';
import MainScoreCard from '../../Components/Cards/MainScoreCard';
import OtherScoreCard from '../../Components/Cards/OtherScoreCard';
import LineChart from '../../Components/Charts/LineChart';
import ActionCard from '../../Components/Cards/ActionCard'
import RadarChart from '../../Components/Charts/RadarChart';
// function caseChange(str) {
//     let sepe = str.split("_");
//     let ans = sepe.map((s) => {
//         return s[0].toUpperCase() + s.substring(1);
//     }).join(" ");
//     return ans;
// }

const road_quality = "Road Quality";
const parameters = ["Cleaniness", "Walkability", "Road", "Mobility", "Health and Env", "Encroachment", "Public Safety", "Aesthetics"];
function DashBoardHome() {
    const scoreVariation = [55.13,57.05,60.02,57.08];

    const parameterScores = [60,68.57,60,66.66,40,53.33,20,80];
    const parameterNames = ["Cleanliness","Walkability","Roads","Mobility","Health","Enchroachment","Public Safety","Aesthetics"];
    return (
        <div className='w-full p-2 sm:p-0 min-h-[100vh]'>
            <div className='md:space-y-[60px] space-y-[20px] px-[80px] relative w-full sm:p-4'>
                <div id='overall' className='w-full section items-center space-y-10'>
                    {/* <OverAllScoreComponent score={28.87} good={2} acceptable={10} poor={11} />
                    <IndividualScores scores={scores} include_sdg={true} /> */}
                    <div className='flex justify-between w-full items-center space-x-10'>
                        <CityNameCard parameter_value="Jhansi" parameter_name={"City Name"}></CityNameCard>
                        <ParameterCard parameter_value={767} parameter_name={"Number of Data Points"}></ParameterCard>
                        <ParameterCard parameter_value={60} parameter_name={"% of wards covered"}></ParameterCard>
                        <ParameterCard parameter_value={2000} parameter_name={"Sq. Km of Area Covered"}></ParameterCard>
                        <ParameterCard parameter_value={1000} parameter_name={"Km of Road Covered"}></ParameterCard>
                    </div>
                    <div id='overall' className='w-full md:flex items-center md:space-x-6 space-y-2 md:space-y-0'>
                        <div className='flex w-full justify-between items-center space-x-6'>
                            <MainScoreCard national_score={62} city_score={56.07}></MainScoreCard>
                            <div className="gap-6 flex flex-wrap">
                                <OtherScoreCard body_color={"#4C2F60"} image_link={"/icons/cleaning.png"} score_name={"Cleanliness and Waste Management"} national={65} city_score={60}></OtherScoreCard>
                                <OtherScoreCard body_color={"#113852"} image_link={"/icons/walk.png"} score_name={"Walkability and Inclusivity"} national={73} city_score={68.57142857}></OtherScoreCard>
                                <OtherScoreCard body_color={"#945D12"} image_link={"/icons/destination.png"} score_name={"Road Quality"} national={65} city_score={60}></OtherScoreCard>
                                <OtherScoreCard body_color={"#1A5921"} image_link={"/icons/mobility.png"} score_name={"Mobility and Congestion"} national={70} city_score={66.66}></OtherScoreCard>
                                <OtherScoreCard body_color={"#860020"} image_link={"/icons/healthcare.png"} score_name={"Health and Environment"} national={46} city_score={40}></OtherScoreCard>
                                <OtherScoreCard body_color={"#012049"} image_link={"/icons/mobility.png"} score_name={"Encroachment"} national={58} city_score={53.33}></OtherScoreCard>
                                <OtherScoreCard body_color={"#4E946E"} image_link={"/icons/security.png"} score_name={"Public Safety"} national={25} city_score={20}></OtherScoreCard>
                                <OtherScoreCard body_color={"#7D233D"} image_link={"/icons/asterisk.png"} score_name={"Aesthetics"} national={83} city_score={80}></OtherScoreCard>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-[20px]">
                    <LineChart chart_name={"City Score Trend"} cityData={scoreVariation}/>
                    <ActionCard />
                    <RadarChart parameterScore = {parameterScores} parameterNames={parameterNames} title={"Parameter Breakdown"} />
                    <MapComponent />
                </div>

                {/* <div id='actionItems' className='w-full section md:flex items-center space-y-2 md:space-y-0 justify-between'>

                </div>


                <div id='deepDive' className='w-full section md:flex items-center space-y-2 md:space-y-0 justify-between'>

                </div> */}

                <div
                    id='wardTable'
                    className='
                    hidden
                    w-full section sm:flex sm:items-center 
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