import React from 'react'
import SpecificPageMapComponent from '../../Components/MapComponents/SpecificPageMap'
import { Button, Select,IconButton, FormControl, Box, MenuItem, InputLabel, Drawer, Backdrop } from '@mui/material'
import { useState } from 'react'
import RightSideBar from '../../Components/Global/RightSideBar'
import MapTableSpecific from '../../Components/Tables/MapTableSpecific'
import { wardDivision } from '../../Components/MapComponents/wardDivisionData'
import { getWardsWithName, isMarkerInsidePolygon } from '../../utils/MapUtils'
import { useEffect } from 'react'
import { exportToExcel } from 'react-json-to-excel'
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import { mockData } from '../../mockData/MapData'
import L from 'leaflet'
import { sdgImpact } from '../../mockData/MapData'
import { calculateAverage, getColRep } from '../../utils/MapUtils';
import CloseIcon from '@mui/icons-material/Close';

function caseChange(str) {
  let sepe = str.split("_");
  let ans = sepe.map((s) => {
    return s[0].toUpperCase() + s.substring(1);
  }).join(" ");
  return ans;
}

function wardSelection(newData, currWard, param, sub_param, scoreValue) {
  let selectedWardBoundary = [];
  let dataToReturn = newData;
  if (currWard !== "any") {
    wardDivision.map((ward) => {
      if (currWard === ward["Ward Numbe"]) {
        selectedWardBoundary = ward.geometry;
      }
    });
    dataToReturn = dataToReturn.filter((dat) => {
      var polygonFormed = L.polygon(selectedWardBoundary);
      var marker = L.marker([dat.longitude, dat.latitude])
      let isContains = polygonFormed.contains(marker.getLatLng());
      let isTrue = isMarkerInsidePolygon([dat.longitude, dat.latitude], selectedWardBoundary);
      return isContains;
    });
  }
  console.log(param + " " + sub_param);
  let dataToShow = dataToReturn.map((dat) => {
    let ward_name_curr = undefined;
    let ward_number = undefined;
    for (let i = 0; i < wardDivision.length; i++) {
      let ward = wardDivision[i];
      let isInside = isMarkerInsidePolygon([dat.longitude, dat.latitude], ward.geometry);
      if (isInside === true) {
        ward_name_curr = ward["Ward Name"];
        ward_number = ward["Ward Numbe"];
        break;
      }
    }
    // console.log(dataToShow);
    let score = dat.score[param][sub_param];
    let preparedData = {
      "ward": ward_name_curr,
      "score": (Number)(score),
      "date": dat.date,
      "file_name": dat.image_name,
      "status": dat.scoring_completed,
      "latitude": dat.latitude,
      "longitude": dat.longitude,
      "ward_number": ward_number
    };
    return preparedData;
  });
  let dataCleaned = dataToShow.filter((dat) => !Number.isNaN(dat.score) && dat.score != -10);
  if (scoreValue !== "any") {
    if (scoreValue === "good") {
      dataCleaned = dataCleaned.filter((dat) => (Number)(dat.score) > 75);
    } else if (scoreValue === "acceptable") {
      dataCleaned = dataCleaned.filter((dat) => (Number)(dat.score) > 50 && (Number)(dat.score) <= 75);
    } else {
      dataCleaned = dataCleaned.filter((dat) => (Number)(dat.score) <= 50);
    }
  }
  dataCleaned = dataCleaned.filter(dat => dat.score > 0);
  return dataCleaned;
}


function IntiateAction() {
  // Define a state to track whether the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu state when the menu button is clicked
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let wards = getWardsWithName(wardDivision);
  const parameter_names = ["cleaniness_score", "sidewalk_score", "road_score", "public_space_utilization"]
  const sub_parameters = [
    ["overall_cleaniness_score", "garbage_and_litter", "tobacco_spit", "dust", "dustbins_dumpsters", "drain", "toilet_urination"],
    ["overall_sidewalk_score", "construction_material", "sidewalk_availability", "sidewalk_usability", "parking_on_sidewalk", "street_furniture_and_amenities", "walking_space"],
    ["overall_road_score", "road_motorable_space", "surface_quality", "repair_quality", "type_of_road", "blacktop_quality", "lane_markings", "parking_on_road", "cycling_infrastructure"],
    ["overall_public_space_utilization_score", "general_occupation", "occupants"]
  ]
  const [scoreValue, setScoreValue] = useState("any");
  const [city, setCity] = useState("Jhansi");
  const [mapData, setmapData] = useState({
    currWard: "any",
    zoom: 11,
    position: [25.4484, 78.5685]
  });
  const [parameter, setParameter] = useState(0);
  const [sub_parameter, setSubParameter] = useState({
    subParameters: sub_parameters[`${parameter}`],
    currSubParameter: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(mockData.data);
  const [position, setPosition] = useState([25.4484, 78.5685])
  const [filteredOutput, setFilteredOutput] = useState({
    data: [],
    colorRep: "white",
  });
  const [sdgImpactParam, setsdgImpact] = useState("any");
  // useEffect(() => {
  //     async function fetchData() {
  //         setLoading(true);
  //         let res = await axios.get("http://localhost:5000/data/");
  //         if (res) {
  //             if (res.status === 200) {
  //                 let newData = res.data.data;
  //                 let dataAfterSelected = wardSelection(newData, currWard,parameter_names[parameter],sub_parameters[parameter][sub_parameter]);
  //                 setFilteredOutput(dataAfterSelected);
  //                 setData(res.data.data);
  //             } else if (res.status === 400) {
  //                 setError("Data Not Found")
  //             }
  //             setLoading(false);
  //         }
  //     }
  //     fetchData();
  // }, []);
  // console.log("data" + data);

  useEffect(() => {
    console.log(parameter);
    const filteredOutput = wardSelection(data, mapData.currWard, parameter_names[parameter], sub_parameter.subParameters[sub_parameter.currSubParameter], scoreValue);
    console.log(filteredOutput);
    console.log(parameter_names[parameter])
    let avg = calculateAverage(filteredOutput);
    let colRep = getColRep(avg);
    setFilteredOutput({
      data: filteredOutput,
      colorRep: colRep
    });
  }, [loading, mapData, parameter, sub_parameter, scoreValue]);

  useEffect(() => {
    const parameter_name = parameter_names[parameter];
    console.log(parameter_name);
    if (sdgImpactParam !== "any") {
      let subs = sub_parameters[parameter];
      if (sdgImpactParam === "standard") {
        subs = subs.filter((sub, idx) => {
          if (idx === 0) return true;
          else return (sdgImpact[`${parameter_name}`][`${sub}_score`] <= 1.5);
        });
      } else if (sdgImpactParam === "high") {
        subs = subs.filter((sub, idx) => {
          if (idx === 0) return true;
          else return (sdgImpact[`${parameter_name}`][`${sub}_score`] > 1.5 && sdgImpact[`${parameter_name}`][`${sub}_score`] <= 3);
        });
      } else {
        subs = subs.filter((sub, idx) => {
          if (idx === 0) return true;
          else {
            console.log(sdgImpact);
            return (sdgImpact[`${parameter_name}`][`${sub}_score`] > 3);
          }
        });
      }
      setSubParameter({
        subParameters: subs,
        currSubParameter: 0
      });
    } else {
      setSubParameter({
        subParameters: sub_parameters[`${parameter}`],
        currSubParameter: 0
      });
    }
  }, [sdgImpactParam, parameter]);

  const handleDownloadButtonClick = () => {
    exportToExcel(filteredOutput.data, 'PinPoints');
  }
  const handleWardChange = (e) => {
    let wardValue = e.target.value;
    let currPosition = [];
    let currZoom = 12;
    if (wardValue !== "any") {
      wardDivision.map((feature) => {
        if (wardValue === feature["Ward Numbe"]) {
          currPosition = [feature.geometry[0][1], feature.geometry[0][0]];
        }
      });
      currZoom = 13;
    } else {
      currPosition = [25.4484, 78.5685];
      currZoom = 11;
    }
    setmapData(() => {
      return {
        currWard: wardValue,
        zoom: currZoom,
        position: currPosition
      }
    });
  }
  return (
    loading ? <div>Loading...</div> :
      <div className='p-2 flex justify-between w-[100%] relative'>
        <div className='md:w-[100%] w-[100%]'>
          <div className=''>
          <div className='py-4 space-y-2 sm:space-y-0 w-full shadow-lg rounded-t-lg px-2 sm:flex items-center justify-between'>
              <div className="hidden sm:space-x-2 space-y-2 sm:space-y-0 sm:flex flex-shrink">
                <FormControl >
                  <InputLabel>Ward</InputLabel>
                  <Select
                    className='w-[100px]'
                    value={mapData.currWard}
                    size='small'
                    onChange={handleWardChange}
                    label='Ward'
                  >
                    <MenuItem value={"any"}>All Wards</MenuItem>
                    {
                      wards.map(ward => {
                        return <MenuItem value={ward.ward_number}>{ward.ward_name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl >
                  <InputLabel>Parameter</InputLabel>
                  <Select
                    className='w-[150px]'
                    value={parameter}
                    onChange={(e) => {
                      setParameter(e.target.value);
                    }}
                    label='Parameter'
                    size='small'
                  >
                    {
                      parameter_names.map((para, idx) => {
                        return <MenuItem value={idx}>{caseChange(para)}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl >
                  <InputLabel>Sub Parameter</InputLabel>
                  <Select
                    className='w-[150px]'
                    value={sub_parameter.currSubParameter}
                    onChange={(e) => setSubParameter({
                      ...sub_parameter,
                      currSubParameter: e.target.value
                    })}
                    label='Sub Parameter'
                    size='small'
                  >
                    {
                      sub_parameter.subParameters.map((sub_para, idx) => {
                        return <MenuItem value={idx}>{caseChange(sub_para)}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl >
                  <InputLabel>Score</InputLabel>
                  <Select
                    className='w-[120px]'
                    value={scoreValue}
                    label="Score"
                    onChange={(e) => setScoreValue(e.target.value)}
                    size='small'
                  >
                    <MenuItem value={"any"}>Any</MenuItem>
                    <MenuItem value={"good"}>Good</MenuItem>
                    <MenuItem value={"acceptable"}>Manageable</MenuItem>
                    <MenuItem value={"poor"}>Poor</MenuItem>
                  </Select>
                </FormControl>
                <FormControl >
                  <InputLabel>SDG Impact</InputLabel>
                  <Select
                    sx={{
                      width: '120px',
                      color: '#333', // Adjusted text color for better contrast
                    }}
                    value={sdgImpactParam}
                    onChange={(e) => {
                      setsdgImpact(e.target.value);
                    }}
                    size='small'
                    label="SDG Impact"
                  >
                    <MenuItem value={"any"}>Any</MenuItem>
                    <MenuItem value={"standard"}>Standard</MenuItem>
                    <MenuItem value={"high"}>High</MenuItem>
                    <MenuItem value={"significant"}>Significant</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="sm:hidden">
                <Button onClick={toggleMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </Button>
              </div>
              <div>
                <Button variant='outlined' onClick={handleDownloadButtonClick} className='space-x-2'>
                  <p>Download</p>
                  <CloudDownloadRoundedIcon />
                </Button>
              </div>
            </div>
            <Drawer
              anchor="bottom"
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              BackdropComponent={Backdrop}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div className='p-2 flex  border-b items-center justify-between'>
                <h1 className='text-xl'>Filters</h1>
                <IconButton onClick={() => setIsMenuOpen(false)}>
                  <CloseIcon/>
                </IconButton>
              </div>
              <div className='space-y-4 p-4'>
                <FormControl fullWidth>
                  <InputLabel>Ward</InputLabel>
                  <Select
                    value={mapData.currWard}
                    size='small'
                    onChange={handleWardChange}
                    label='Ward'
                  >
                    <MenuItem value={"any"}>All Wards</MenuItem>
                    {
                      wards.map(ward => {
                        return <MenuItem value={ward.ward_number}>{ward.ward_name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Parameter</InputLabel>
                  <Select
                    value={parameter}
                    onChange={(e) => {
                      setParameter(e.target.value);
                    }}
                    label='Parameter'
                    size='small'
                  >
                    {
                      parameter_names.map((para, idx) => {
                        return <MenuItem value={idx}>{caseChange(para)}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Sub Parameter</InputLabel>
                  <Select
                    value={sub_parameter.currSubParameter}
                    onChange={(e) => setSubParameter({
                      ...sub_parameter,
                      currSubParameter: e.target.value
                    })}
                    label='Sub Parameter'
                    size='small'
                  >
                    {
                      sub_parameter.subParameters.map((sub_para, idx) => {
                        return <MenuItem value={idx}>{caseChange(sub_para)}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Score</InputLabel>
                  <Select
                    value={scoreValue}
                    label="Score"
                    onChange={(e) => setScoreValue(e.target.value)}
                    size='small'
                  >
                    <MenuItem value={"any"}>Any</MenuItem>
                    <MenuItem value={"good"}>Good</MenuItem>
                    <MenuItem value={"acceptable"}>Manageable</MenuItem>
                    <MenuItem value={"poor"}>Poor</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>SDG Impact</InputLabel>
                  <Select
                    
                    value={sdgImpactParam}
                    label="SDG Impact"
                    onChange={(e) => {
                      setsdgImpact(e.target.value);
                    }}
                    size='small'
                  >
                    <MenuItem value={"any"}>Any</MenuItem>
                    <MenuItem value={"standard"}>Standard</MenuItem>
                    <MenuItem value={"high"}>High </MenuItem>
                    <MenuItem value={"significant"}>Significant</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Drawer>
          </div>
          <MapTableSpecific filteredOutput={filteredOutput} loading={loading} currWard={mapData.currWard} city={city} scoreValue={scoreValue} parameter={parameter} sub_parameter={sub_parameter} />
        </div>

        {/* <RightSideBar /> */}
      </div>
  )
}

export default IntiateAction