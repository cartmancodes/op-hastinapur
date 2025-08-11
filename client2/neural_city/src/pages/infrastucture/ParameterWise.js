import ParameterCard from '../../Components/Cards/ParameterCard'
import LineChart from '../../Components/Charts/LineChart'
import RadarChart from '../../Components/Charts/RadarChart'
import { ColumnChart } from '../../Components/Charts/ColumnChart'
import { Box, FormControl, Select, MenuItem } from '@mui/material'
import { getWardsWithName } from '../../utils/MapUtils'
import { wardDivision } from '../../Components/MapComponents/wardDivisionData'
import { useState } from 'react'
import { Button } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { HorizontalStack } from '../../Components/Charts/HorizontalStack';
import { Carousel } from 'react-responsive-carousel';

function changeTypo(parameter) {
  return parameter.split("_").join(" ");
}

function ParameterWise() {
  let wards = getWardsWithName(wardDivision);
  let datas = [
    {
      file_name: "/images/IMG_20250509_162158.jpg"
    },
    {
      file_name: "/images/IMG_20250505_174706.jpg"
    },
    {
      file_name: "/images/IMG_20250505_183322.jpg"
    },
    {
      file_name: "/images/IMG_20250505_175643.jpg"
    },
    {
      file_name: "/images/IMG_20250505_182116.jpg"
    }
  ]
  const parameters = [
    {
      parameter_name: "Cleanliness_and_Waste_Management",
      quaterly_trend: [57.5, 62.5, 65, 60],
      score: 60,
      total_count: 1115,
      poor_count: 391,
      average_count: 711,
      good_count: 13,
      subParameters: [
        {
          "subparam_name": "Garbage_and_Litter",
          "median_score": 40,
          "count": 1082,
          "percentage": 83.67
        },
        {
          "subparam_name": "Dust",
          "median_score": 40,
          "count": 744,
          "percentage": 3.82
        },
        {
          "subparam_name": "Bin_Usability",
          "median_score": 40,
          "count": 31,
          "percentage": 2.02
        },
        {
          "subparam_name": "Bin_Overflow",
          "median_score": 60,
          "count": 19,
          "percentage": 1.12
        },
        {
          "subparam_name": "Bin_Cleanliness",
          "median_score": 40,
          "count": 21,
          "percentage": 1.27
        },
        {
          "subparam_name": "Construction_Material",
          "median_score": 40,
          "count": 69,
          "percentage": 1.87
        },
        // {
        //   "subparam_name": "Open_Urination",
        //   "median_score": 0,
        //   "count": 0,
        //   "percentage": 0.0
        // },
        {
          "subparam_name": "Toilet_Accessibility",
          "median_score": 60,
          "count": 26,
          "percentage": 1.95
        },
        {
          "subparam_name": "Toilet_Maintenance",
          "median_score": 60,
          "count": 16,
          "percentage": 1.2
        },
        {
          "subparam_name": "Drain",
          "median_score": 20,
          "count": 40,
          "percentage": 0.22
        },
        {
          "subparam_name": "Drain_Manhole_Cover_Condition",
          "median_score": 20,
          "count": 2,
          "percentage": 0.15
        },
        {
          "subparam_name": "Median_Cleanliness",
          "median_score": 40,
          "count": 18,
          "percentage": 2.7
        },
        // {
        //   "subparam_name": "Drain_Waste_Accumulation",
        //   "median_score": 0,
        //   "count": 0,
        //   "percentage": 0.0
        // }
      ],
    },
    {
      parameter_name: "Walkability_and_Inclusivity",
      quaterly_trend: [69.5, 68.5, 70.5, 70],
      score: 70,
      total_count: 741,
      poor_count: 15,
      average_count: 377,
      good_count: 349,
      subParameters: [
        {
          "subparam_name": "Sidewalk_Availability",
          "median_score": 100,
          "count": 697,
          "percentage": 13.01
        },
        {
          "subparam_name": "Obstruction_on_Sidewalk",
          "median_score": 40,
          "count": 658,
          "percentage": 12.28
        },
        {
          "subparam_name": "Parking_on_Sidewalk",
          "median_score": 100,
          "count": 580,
          "percentage": 10.82
        },
        {
          "subparam_name": "Street_Furniture_Present",
          "median_score": 80,
          "count": 71,
          "percentage": 1.33
        },
        {
          "subparam_name": "Street_Furniture_Usability",
          "median_score": 80,
          "count": 67,
          "percentage": 1.25
        },
        {
          "subparam_name": "Tactile_Paving",
          "median_score": 40,
          "count": 582,
          "percentage": 10.86
        },
        {
          "subparam_name": "Sidewalk_Surface",
          "median_score": 80,
          "count": 601,
          "percentage": 11.22
        },
        {
          "subparam_name": "Sidewalk_Width",
          "median_score": 60,
          "count": 616,
          "percentage": 11.5
        },
        {
          "subparam_name": "Sidewalk_Continuity",
          "median_score": 80,
          "count": 58,
          "percentage": 1.08
        },
        {
          "subparam_name": "Sidewalk_Bollards",
          "median_score": 60,
          "count": 49,
          "percentage": 0.91
        },
        {
          "subparam_name": "Sidewalk_Curbs",
          "median_score": 100,
          "count": 626,
          "percentage": 11.68
        },
        {
          "subparam_name": "Sidewalk_Fencing",
          "median_score": 60,
          "count": 636,
          "percentage": 11.87
        },
        {
          "subparam_name": "Traffic_Islands",
          "median_score": 80,
          "count": 6,
          "percentage": 0.11
        },
        {
          "subparam_name": "Crosswalk",
          "median_score": 40,
          "count": 10,
          "percentage": 0.19
        },
        {
          "subparam_name": "Raised_Crosswalks",
          "median_score": 60,
          "count": 9,
          "percentage": 0.17
        },
        {
          "subparam_name": "Overhead_Bridge_Top",
          "median_score": 0,
          "count": 0,
          "percentage": 0.0
        },
        {
          "subparam_name": "Overhead_Bridge_Stairs",
          "median_score": 0,
          "count": 0,
          "percentage": 0.0
        },
        {
          "subparam_name": "Subway_For_Pedestrians",
          "median_score": 0,
          "count": 0,
          "percentage": 0.0
        },
        {
          "subparam_name": "Multi_Lingual_signages",
          "median_score": 100,
          "count": 35,
          "percentage": 0.65
        },
        {
          "subparam_name": "Sidewalk_Ramp_Slope",
          "median_score": 20,
          "count": 28,
          "percentage": 0.52
        },
        {
          "subparam_name": "Sidewalk_Ramp_Build",
          "median_score": 80,
          "count": 29,
          "percentage": 0.54
        }
      ]
    },
    {
      parameter_name: "Road_Quality",
      score: 60,
      total_count: 970,
      poor_count: 12,
      average_count: 826,
      good_count: 132,
      quaterly_trend: [58.5, 57, 63, 60],
      subParameters: [
        {
          "subparam_name": "Surface_Quality",
          "median_score": 60,
          "count": 905,
          "percentage": 27.74
        },
        {
          "subparam_name": "Blacktop_Quality",
          "median_score": 60,
          "count": 949,
          "percentage": 29.09
        },
        {
          "subparam_name": "Road_Markings",
          "median_score": 40,
          "count": 822,
          "percentage": 25.2
        },
        {
          "subparam_name": "Median_Quality",
          "median_score": 40,
          "count": 64,
          "percentage": 1.96
        },
        {
          "subparam_name": "Speed_Bump_Breaker",
          "median_score": 20,
          "count": 5,
          "percentage": 0.15
        },
        {
          "subparam_name": "Parking_on_Road",
          "median_score": 40,
          "count": 517,
          "percentage": 15.85
        },
        {
          "subparam_name": "Road_side_gutter",
          "median_score": 0,
          "count": 0,
          "percentage": 0.0
        },
        {
          "subparam_name": "Road_Drain_Connection",
          "median_score": 0,
          "count": 0,
          "percentage": 0.0
        }
      ]
    },
    {
      parameter_name: "Mobility_and_Congestion",
      score: 60,
      total_count: 1015,
      poor_count: 19,
      average_count: 509,
      good_count: 487,
      quaterly_trend: [58.5, 57, 63, 60],
      subParameters: [
        {
          "subparam_name": "Road_Motorable_Space",
          "median_score": 100,
          "count": 974,
          "percentage": 49.54
        },
        {
          "subparam_name": "Walking_Space",
          "median_score": 60,
          "count": 972,
          "percentage": 49.44
        },
        {
          "subparam_name": "Cycling_Infrastructure",
          "median_score": 80,
          "count": 2,
          "percentage": 0.1
        },
        {
          "subparam_name": "Public_Transport_Stops_Stations",
          "median_score": 60,
          "count": 5,
          "percentage": 0.25
        },
        {
          "subparam_name": "Taxi_Stand_Commotion_Discipline",
          "median_score": 0,
          "count": 6,
          "percentage": 0.31
        },
        {
          "subparam_name": "Public_Transport_Hubs_Waiting_Area",
          "median_score": 40,
          "count": 4,
          "percentage": 0.2
        },
        {
          "subparam_name": "Signages_for_Better_Mobility",
          "median_score": 40,
          "count": 3,
          "percentage": 0.15
        }
      ]
    },
    {
      parameter_name: "Health_and_Environment",
      score: 40,
      total_count: 708,
      poor_count: 193,
      average_count: 514,
      good_count: 1,
      quaterly_trend: [38.5, 38.4, 42.5, 40],
      subParameters: [
        {
          "subparam_name": "Dust",
          "median_score": 40,
          "count": 539,
          "percentage": 58.97
        },
        {
          "subparam_name": "Construction_Material",
          "median_score": 40,
          "count": 63,
          "percentage": 6.89
        },
        {
          "subparam_name": "Road_Tree_Canopy",
          "median_score": 60,
          "count": 312,
          "percentage": 34.14
        }
      ]
    },
    {
      parameter_name: "Encroachment",
      score: 53.33,
      total_count: 175,
      poor_count: 21,
      average_count: 135,
      good_count: 19,
      quaterly_trend: [52.5, 53.5, 56.66, 53.33],
      subParameters: [
        {
          "subparam_name": "Encroachment_Extent",
          "median_score": 40,
          "count": 174,
          "percentage": 39.46
        },
        {
          "subparam_name": "Occupants_Type",
          "median_score": 60,
          "count": 142,
          "percentage": 32.2
        },
        {
          "subparam_name": "Structure_Type",
          "median_score": 60,
          "count": 125,
          "percentage": 28.34
        }
      ]
    },
    {
      parameter_name: "Public_Safety",
      score: 20,
      total_count: 67,
      poor_count: 67,
      average_count: 0,
      good_count: 0,
      quaterly_trend: [18.5, 22.5, 25.5, 20],
      subParameters: [
        {
          "subparam_name": "Street_Lights",
          "median_score": 0,
          "count": 0,
          "percentage": 0.0
        },
        {
          "subparam_name": "Lighting_in_Public_Parking",
          "median_score": 0,
          "count": 0,
          "percentage": 0.0
        },
        {
          "subparam_name": "Queueing_Infrastructure",
          "median_score": 0,
          "count": 0,
          "percentage": 0.0
        },
        {
          "subparam_name": "Electrical_Safety",
          "median_score": 20,
          "count": 67,
          "percentage": 100.0
        }
      ]
    },
    {
      parameter_name: "Aesthetics",
      score: 80,
      total_count: 791,
      poor_count: 27,
      average_count: 168,
      good_count: 596,
      quaterly_trend: [75.5, 83.5, 82.5, 80],
      subParameters: [
        {
          "subparam_name": "Facade_Public_Road",
          "median_score": 60,
          "count": 232,
          "percentage": 22.1
        },
        {
          "subparam_name": "Street_Installations",
          "median_score": 60,
          "count": 9,
          "percentage": 0.86
        },
        {
          "subparam_name": "Overhead_Utilities_Clutter",
          "median_score": 80,
          "count": 608,
          "percentage": 57.9
        },
        {
          "subparam_name": "Ornamental_Plants",
          "median_score": 40,
          "count": 105,
          "percentage": 10.0
        },
        {
          "subparam_name": "Decorative_Lighting",
          "median_score": 80,
          "count": 96,
          "percentage": 9.14
        }
      ]
    }
  ]

  const [parameter, setParameter] = useState(0);

  const handleParameterChange = (e) => {
    setParameter(e.target.value);
  }

  let datapoints = [
    {
      file_name: "/images/frame_1704116275349_0003.jpg"
    },
    {
      file_name: "/images/frame_1704116275349_0001.jpg"
    },
    {
      file_name: "/images/frame_1704116609012_0213.jpg"
    },
    {
      file_name: "/images/frame_1704116609012_0235.jpg"
    },
    {
      file_name: "/images/frame_1704116609012_0340.jpg"
    }
  ]

  let subParameterNames = parameters[parameter].subParameters.map((subParam) => subParam.subparam_name);
  let subParameterScores = parameters[parameter].subParameters.map((subParam) => subParam.median_score);
  let subParameterCount = parameters[parameter].subParameters.map((subParam) => subParam.count);

  return (
    <div className='p-4 space-y-10 w-full'>
      <div className='flex items-center border p-4 bg-white justify-between rounded-md w-full space-x-10'>
        <Box sx={{ minWidth: 220 }}>
          <FormControl fullWidth>
            <Select
              size='small'
              value={parameter}
              onChange={handleParameterChange}
            >
              <MenuItem value={0}>{changeTypo(parameters[parameter].parameter_name)}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="outlined"
          className="flex items-center space-x-2"
        >
          <p>Download</p>
          <CloudDownloadIcon />
        </Button>
      </div>

      <div className='flex items-center justify-between w-full space-x-10'>
        <ParameterCard parameter_name={"Parameter"} parameter_value={changeTypo(parameters[parameter].parameter_name)} />
        <ParameterCard parameter_name={"National Average"} parameter_value={55} />
        <ParameterCard parameter_name={"Datapoints Collected"} parameter_value={parameters[parameter].total_count} />
      </div>


      <div className='flex items-center justify-between w-full space-x-10'>
        <ParameterCard parameter_name={"Mean"} parameter_value={parseInt((parameters[parameter].score))} />
        <ParameterCard parameter_name={"Good"} parameter_value={((parameters[parameter].good_count / parameters[parameter].total_count) * 100).toFixed(2) + "%"} />
        <ParameterCard parameter_name={"Average"} parameter_value={((parameters[parameter].average_count / parameters[parameter].total_count) * 100).toFixed(2) + "%"} />
        <ParameterCard parameter_name={"Poor"} parameter_value={((parameters[parameter].poor_count / parameters[parameter].total_count) * 100).toFixed(2) + "%"} />
      </div>

      <div className='grid grid-cols-2 gap-[20px]'>
        <LineChart key={parameters[parameter].parameter_name + "line"} cityData={parameters[parameter].quaterly_trend} chart_name={"Parameter Score Trend"} />
        <RadarChart key={parameters[parameter].parameter_name + "radar"} parameterScore={subParameterScores} parameterNames={subParameterNames} title={"Subparameter Median Scores"} />
        <HorizontalStack key={parameters[parameter].parameter_name + "horizontal"} dataNames={subParameterNames} title={"Subparameter Score Distribution"} />
        <ColumnChart key={parameters[parameter].parameter_name + "column"} dataValues={subParameterCount} dataNames={subParameterNames} title={"Data Points for each subparameter"} />
      </div>

      <div className='w-full flex items-center justify-center'>
        <div className='w-[50%]'>
          <Carousel dynamicHeight autoPlay showThumbs={true} showIndicators={false}>
            {
              datas.map((dat) => {
                return (
                  <div>
                    <img src={`${dat.file_name}`} />
                    <p className="legend">Legend 1</p>
                  </div>
                )
              })
            }
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default ParameterWise