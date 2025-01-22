import React from 'react'
import SpecificPageMapComponent from '../../Components/MapComponents/SpecificPageMap'
import { Button, IconButton, Select, FormControl, Box, MenuItem, InputLabel, Drawer, Backdrop } from '@mui/material'
import { useState } from 'react'
import MapTableSpecific from '../../Components/Tables/MapTableSpecific'
import { useEffect } from 'react'
import { exportToExcel } from 'react-json-to-excel'
import { mockData } from '../../mockData/MapData'
import { sdgImpact } from '../../mockData/MapData'
import { calculateAverage, getColRep } from '../../utils/MapUtils';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useContext } from 'react'
import { CityContext } from '../../Context/CityContext'
import api from '../../lib/axiosClient'
import RingLoaderComp from '../../Components/Loaders/RingLoaderComp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import MinimizeIcon from '@mui/icons-material/Minimize';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Dropdown from 'react-multilevel-dropdown';


function caseChange(str) {
    let sepe = str.split("_");
    let ans = sepe.map((s) => {
        return s[0].toUpperCase() + s.substring(1);
    }).join(" ");
    return ans;
}

async function wardSelection(currWard, param, sub_param, scoreValue, currWardName) {
    console.log(param)
    let res = await api.get(`/workflows/?ward_id=${currWard}&parameter=${param}&sub_parameter=${sub_param}&score=${scoreValue}`);


    let dataToReturn = [];
    res.data.map((workflow) => {
        dataToReturn.push(
            {
                ...workflow,
                "ward": currWardName
            }
        );
    });


    return dataToReturn;
}



function FeatureDrill() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const area_types = ["Ward", "Road", "Inter"];
    const parameter_names = ["cleaniness_score", "sidewalk_score", "road_score", "public_space_utilization"]
    const sub_parameters = [
        ["garbage_and_litter", "tobacco_spit", "dust", "dustbins_dumpsters", "drain", "toilet_urination"],
        ["construction_material", "sidewalk_availability", "sidewalk_usability", "parking_on_sidewalk", "street_furniture_and_amenities", "walking_space"],
        ["road_motorable_space", "surface_quality", "repair_quality", "type_of_road", "blacktop_quality", "lane_markings", "parking_on_road", "cycling_infrastructure"],
        ["general_occupation", "occupants"]
    ]
    const [scoreValue, setScoreValue] = useState("any");
    const [data, setData] = useState(mockData.data);
    const [position, setPosition] = useState([25.4484, 78.5685])
    const [filteredOutput, setFilteredOutput] = useState({
        data: [],
        colorRep: "white",
    });

    const [currentAreaType, setcurrentAreaType] = useState("Ward");

    const [sdgImpactParam, setsdgImpact] = useState("any");
    const [curr_city, set_curr_city] = useState("");
    const cityContext = useContext(CityContext);
    const city = cityContext.current_city;
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(null);

    const [filterOpen, setFilterOpen] = useState(false);
    // const [scores,setScores] = useState(null);
    const [mapData, setmapData] = useState({
        curr_city: null,
        currWard: null,
        currWardName: null,
        zoom: 16,
        position: [25.4484, 78.5685]
    });

    const wards = mapData.curr_city ? mapData.curr_city.wards : [];

    const [parameter, setParameter] = useState(0);
    const [sub_parameter, setSubParameter] = useState({
        currParameter: 0,
        subParameters: sub_parameters,
        currSubParameter: 0
    });
    const [metaDataHidden, setMetaDatHidden] = useState(false);


    const handleScoreToggleChange = (event, newAlignment) => {
        setScoreValue(newAlignment);
    };

    const [alignment, setAlignment] = React.useState('all');
    const [searchTerm, setSearchTerm] = useState(''); // State to track the search term
    const [dropdownOpen, setDropDownOpen] = useState(false); // State to control the dropdown visibility

    // Filter the wards based on the search term
    const filteredWards = wards.filter((ward) =>
        ward.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Custom styles for the dropdown menu
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 300, // Limit the height of the dropdown
                overflowY: 'auto', // Add scroll if content overflows
                marginTop: 8, // Add some spacing below the input
            },
        },
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
    };
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    useEffect(() => {
        (async function get_data() {
            setLoading(true);
            try {
                const res = await api.get(`/city/?city_id=${city}&depth=2`);
                const curr_wards = res.data.wards;
                const curr_ward = curr_wards[0];
                setmapData({
                    curr_city: res.data,
                    currWard: curr_ward._id,
                    currWardName: curr_ward.name,
                    zoom: 15,
                    position: [curr_ward.y_centroid, curr_ward.x_centroid]
                })
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        })();
    }, []);

    useEffect(() => {
        (async function get_data() {
            setLoading(true);
            try {
                console.log(sub_parameter.currParameter);
                const filteredOutput = await wardSelection(mapData.currWard, parameter_names[sub_parameter.currParameter], sub_parameter.subParameters[parameter][sub_parameter.currSubParameter], scoreValue, mapData.currWardName);

                let avg = calculateAverage(filteredOutput);
                let colRep = getColRep(avg);

                setFilteredOutput({
                    data: filteredOutput,
                    colorRep: colRep
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [mapData, parameter, sub_parameter, scoreValue]);

    useEffect(() => {
        if (sdgImpactParam !== "any") {
            let newSubParameter = [];
            for (let i = 0; i < parameter_names.length; i++) {
                const param_name = parameter_names[i];
                let subs = sub_parameters[i];

                if (sdgImpactParam === "standard") {
                    subs = subs.filter((sub, idx) => {
                        if (idx === 0) return true;
                        else return (sdgImpact[`${param_name}`][`${sub}_score`] <= 1.5);
                    });
                } else if (sdgImpactParam === "high") {
                    subs = subs.filter((sub, idx) => {
                        if (idx === 0) return true;
                        else return (sdgImpact[`${param_name}`][`${sub}_score`] > 1.5 && sdgImpact[`${param_name}`][`${sub}_score`] <= 3);
                    });
                } else {
                    subs = subs.filter((sub, idx) => {
                        if (idx === 0) return true;
                        else return (sdgImpact[`${param_name}`][`${sub}_score`] > 3);
                    });
                }
                newSubParameter.push(subs);
            }
            setSubParameter({
                currParameter: 0,
                subParameters: newSubParameter,
                currSubParameter: 0
            });
        } else {
            setSubParameter({
                currParameter: 0,
                subParameters: sub_parameters,
                currSubParameter: 0
            });
        }
    }, [sdgImpactParam]);

    const handleDownloadButtonClick = () => {
        exportToExcel(filteredOutput.data, 'PinPoints');
    }


    const handleWardChange = (e) => {
        let wardValue = e.target.value;
        let currPosition = [];
        let currZoom = 12;
        let oldState = mapData;
        let curr_ward_name = "";
        wards.map((ward) => {
            if (wardValue === ward._id) {
                currPosition = [ward.y_centroid, ward.x_centroid];
                curr_ward_name = ward.name;
            }
        });
        currZoom = 15;

        setmapData(() => {
            return {
                curr_city: mapData.curr_city,
                currWardName: curr_ward_name,
                currWard: wardValue,
                zoom: currZoom,
                position: currPosition
            }
        });
    }

    const [dataMode, setDataMode] = useState("map");


    return (
        loading ? <RingLoaderComp></RingLoaderComp> :
            <div className='p-2 flex justify-between w-[100%] relative'>
                <div className='md:w-[100%] w-[100%] flex space-x-[10px]'>
                    <div className='h-[620px] border rounded-md w-[25%]'>
                        <div className="flex w-[100%] h-[100%] flex-col justify-between items-center">
                            <div className="hidden h-[100%] relative md:w-[100%] space-y-4 sm:space-y-0 md:flex flex-col sm:grid sm:grid-cols-4 gap-2">
                                <div className="w-[100%] h-[10%] space-x-4 border-b p-4 flex items-center justify-between ">
                                    <FormControl className='w-[30%]'>
                                        <InputLabel>Type</InputLabel>
                                        <Select
                                            label="Type"
                                            size="small"
                                            value={currentAreaType}
                                            onChange={(e) => {
                                                setcurrentAreaType(e.target.value);
                                            }}
                                        >
                                            {
                                                area_types.map((type, idx) => {
                                                    return <MenuItem disabled={type !== "Ward"} key={idx} value={type}>{type}</MenuItem>
                                                })
                                            }
                                        </Select>

                                    </FormControl>
                                    <FormControl className='w-[65%]'>
                                        <InputLabel>Area</InputLabel>
                                        <Select
                                            value={mapData.currWard}
                                            onChange={handleWardChange}
                                            label="Ward"
                                            size="small"
                                            open={dropdownOpen}
                                            onOpen={() => setDropDownOpen(true)}
                                            onClose={() => setDropDownOpen(false)}
                                            MenuProps={MenuProps}
                                            renderValue={(selected) => {
                                                const selectedWard = wards.find((ward) => ward._id === selected);
                                                return selectedWard ? selectedWard.name : 'Select a Ward';
                                            }}
                                        >

                                            {/* Render filtered wards */}
                                            {filteredWards.map((ward) => (
                                                <MenuItem key={ward._id} value={ward._id}>
                                                    {ward.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className='h-[80%] overflow-y-scroll space-y-4'>
                                    <div className={'space-y-4 p-4 z-[1005] border-b'}>
                                        <div className='w-full'>
                                            <FormControl fullWidth>
                                                <InputLabel>SDG Impact</InputLabel>
                                                <Select
                                                    sx={{ color: 'black' }}
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

                                        <FormControl fullWidth>
                                            <Typography id="track-false-slider" gutterBottom>
                                                Score Range
                                            </Typography>
                                            <ToggleButtonGroup
                                                size='small'
                                                value={scoreValue}
                                                exclusive
                                                onChange={handleScoreToggleChange}
                                                aria-label="Platform"
                                            >
                                                <ToggleButton color="secondary" value="any">All</ToggleButton>
                                                <ToggleButton color="success" value="good">Good</ToggleButton>
                                                <ToggleButton color="info" value="manageable">Manageable</ToggleButton>
                                                <ToggleButton color="error" value="poor">Poor</ToggleButton>
                                            </ToggleButtonGroup>


                                        </FormControl>

                                    </div>
                                    <div className='space-y-4 w-[100%] p-4'>
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
                                                    sub_parameter.subParameters[parameter].map((sub_para, idx) => {
                                                        return <MenuItem value={idx}>{caseChange(sub_para)}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>

                                        {/* {
                                            <Dropdown menuClassName='z-[10000]' position='right' title={caseChange(parameter_names[sub_parameter.currParameter]) + "," + caseChange(sub_parameter.subParameters[sub_parameter.currParameter][sub_parameter.currSubParameter])}>
                                                {parameter_names.map((para, idx) => {
                                                    return (
                                                        <Dropdown.Item>
                                                            {caseChange(para)}
                                                            <Dropdown.Submenu className='z-[1005]' position='right'>
                                                                {
                                                                    sub_parameter.subParameters[idx].map((sub, idx2) => {
                                                                        return <Dropdown.Item onClick={() => {
                                                                            setSubParameter((subparameter) => {
                                                                                return {
                                                                                    currParameter: idx,
                                                                                    subParameters: [...subparameter.subParameters],
                                                                                    currSubParameter: idx2
                                                                                }
                                                                            })
                                                                        }}>{caseChange(sub)}</Dropdown.Item>
                                                                    })
                                                                }
                                                            </Dropdown.Submenu>
                                                        </Dropdown.Item>
                                                    )
                                                })}
                                            </Dropdown>

                                        } */}
                                    </div>


                                    {/* <FormControl fullWidth>
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
                                        </FormControl> */}
                                </div>


                            </div>
                            <div className="sm:hidden">
                                <Button onClick={toggleMenu}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
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
                                    <CloseIcon />
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
                                                return <MenuItem value={idx}>{para}</MenuItem>
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
                                                return <MenuItem value={idx}>{sub_para}</MenuItem>
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
                                        sx={{ backgroundColor: '#A5D6A7', color: 'black' }}
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


                    <div className='w-[74%] h-fit rounded-lg border'>
                        <div className='p-2 border-b flex items-center justify-between'>
                            <div>

                                <ToggleButtonGroup
                                    size='small'
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={handleChange}
                                    aria-label="Platform"
                                >
                                    <ToggleButton color='primary' value="all">ALL</ToggleButton>
                                    <ToggleButton color='success' value="top_perf">TOP Performers</ToggleButton>
                                    <ToggleButton color='error' value="under_perf">Under Perrformers</ToggleButton>
                                    <ToggleButton color='success' value="up_trend">Upwards Trends</ToggleButton>
                                    <ToggleButton color='error' value="down_trend">Downward Spiral</ToggleButton>

                                </ToggleButtonGroup>

                            </div>
                            <div className='flex space-x-4 items-center'>

                                <Button variant='outlined' onClick={handleDownloadButtonClick} className='space-x-2'>

                                    <CloudDownloadIcon />
                                </Button>
                                <ToggleButtonGroup
                                    size="small"
                                    color="primary"
                                    value={dataMode}
                                    exclusive
                                    onChange={(e) => {
                                        setDataMode(e.target.value)
                                    }}
                                    aria-label="Platform"
                                >
                                    <ToggleButton value="map">Map</ToggleButton>
                                    <ToggleButton value="table">Table</ToggleButton>

                                </ToggleButtonGroup>


                            </div>
                        </div>
                        <div className={!(dataMode === "map") ? "hidden" : "p-2"}>
                            <SpecificPageMapComponent
                                currWard={mapData.currWard}
                                wards={wards}
                                mapData={mapData}
                                position={position}
                                zoom={mapData.zoom}
                                geojson={filteredOutput}
                                pos={mapData.currWard + "@" + parameter + "@" + sub_parameter}
                            />
                        </div>

                        <div className={!(dataMode === "table") ? "hidden" : ""}>
                            <MapTableSpecific filteredOutput={filteredOutput} loading={loading} currWard={mapData.currWard} city={city} scoreValue={scoreValue} parameter={parameter} sub_parameter={sub_parameter} />
                        </div>
                    </div>

                </div>



                <div className={(dataMode === "map") ? 'bg-white w-[300px] shadow-lg top-[12%] absolute rounded-lg right-[2%] z-[1005]' : 'hidden'}>
                    <div className='border-b flex p-4 items-center justify-between'>
                        <p className='font-bold'>{mapData.currWardName}</p>
                        <div onClick={() => setMetaDatHidden(!metaDataHidden)} className='font-bold cursor-pointer shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-sm'>
                            {metaDataHidden ? <ExpandMoreIcon /> : <MinimizeIcon />}
                        </div>
                    </div>

                    <div className={(metaDataHidden) ? "hidden" : 'p-4'}>
                        Here Meta Data of the Map will come
                    </div>
                </div>
                {/* <RightSideBar /> */}
            </div>
    )
}

function DropDownMenu(para, value, subParameters, setSubParameter) {
    const [open, setOpen] = useState(false);

    const handleChange = () => {
        setOpen(!open);
    }

    console.log(para)

    return <div
        className='p-4 cursor-pointer hover:bg-gray-100 border-b'>
        <div className='flex items-center justify-between' value={value}>
            <p className='font-bold'>{caseChange(para.para)}</p>
            <IconButton onClick={handleChange}><KeyboardArrowDownIcon /></IconButton>
        </div>
        <div className={open ? '' : 'hidden'}>
            {
                para.subParameters.map((sub_para, idx) => {
                    return <MenuItem onClick={() => {
                        para.setSubParameter((subparameter) => {
                            return {
                                currParameter: para.value,
                                subParameters: [...subparameter.subParameters],
                                currSubParameter: idx
                            }

                        })
                    }} value={idx}>{caseChange(sub_para)}</MenuItem>
                })
            }
        </div>
    </div>
}

export default FeatureDrill