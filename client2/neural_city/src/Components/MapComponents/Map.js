import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { Box, FormControl, Select, MenuItem } from '@mui/material'
import "./mapstyle.css";
import { wardDivision } from './wardDivisionData';
import { getSelectedWardBoundary, calculateZoom, getWardsWithName, getMaskedBoundary, getFilteredGeoJSON } from '../../utils/MapUtils';
import { isMobile } from 'react-device-detect';
import ImageModal from '../Modals/ImageModal';
import { avgData } from '../../mockData/MapData';
import { getColRep } from '../../utils/MapUtils';
import WardPolygon from './ui/WardPolygon';
import { getCityBoundary } from '../../utils/MapUtils';
import InfoButton from '../ui/InfoButton';

function getColor(curr_ward, parameter) {
	const findData = avgData.find((dat) => dat.ward_number === curr_ward);
	if(findData === undefined) {
		return "gray";
	}
	if (curr_ward === "any") return;
	let data = avgData.filter((dat) => dat.ward_number === curr_ward)[0];
	let score = null;
	if (parameter === "any") {
		score = data.overall_score;
	} else if (parameter === "Cleaniness") {
		score = data.cleaniness_score;
	} else if (parameter === "enchrochment") {
		score = data.encroachment_score;
	} else if (parameter === "road") {
		score = data.road_score;
	} else if (parameter = "walkability") {
		score = 50;
	}
	console.log(score);
	return getColRep(score);
}


function MapComponent() {
	// States
	const [scoreValue, setScoreValue] = useState("any");
	const [loading, setLoading] = useState(false);
	const [parameter, setparameter] = useState("any");
	const [imgsrc, setImgsrc] = useState("");
	const [open, setOpen] = React.useState(false);
	const [mapData, setmapData] = useState({
		currWard: "any",
		zoom: 12,
		position: [25.4484, 78.5685]
	});


	// Input Handler Functions
	let wards = getWardsWithName(wardDivision);
	const handleWardChange = (e) => {
		let wardValue = e.target.value;
		let currPosition = [];
		let currZoom = 11.5;
		if (wardValue !== "any") {
			wardDivision.map((ward) => {
				if (wardValue === ward["Ward Numbe"]) {
					currPosition = [ward['Y Centroid'], ward['X centroid']];
					let area = ward.Area;
					// let height = document.getElementById('map').offsetHeight;
					// let width = document.getElementById('map').offsetWidth;
					currZoom = calculateZoom(area, 650, 600) - 9.5;
					console.log(currZoom);
				}
			});
		} else {
			currPosition = [25.4484, 78.5685];
			currZoom = 12;
		}
		setmapData(() => {
			return {
				currWard: wardValue,
				zoom: currZoom,
				position: currPosition
			}
		})

	}
	const handleParameterChange = (e) => {
		setparameter(e.target.value);
		console.log("Parameter=" + e.target.value);
	}
	// const handleOpen = (e) => {
	// 	setImgsrc(() => e.target.getAttribute('src'));
	// 	setOpen(true);
	// }
	const handleClose = () => setOpen(false);
	let selectedWardBoundary = getSelectedWardBoundary(mapData.currWard, wardDivision);
	let allBoundary = getMaskedBoundary(wardDivision);
	let cityBoundary = getCityBoundary(wardDivision);
	// let markerjson = getFilteredGeoJSON(geojson,mapData.currWard,selectedWardBoundary);
	const toolTipText = "Explore the map component to visualize urban parameters ward-wise, filterable by parameter and score. Color-coded wards display conditions: red for poor, blue for medium, and green for good";
	let mapColoring = getColor(mapData.currWard, parameter);
	return (
		loading ? <div>Loading...</div> :
			<div className='bg-white mb-2 flex flex-col shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-sm md:w-[50%] w-[100%] '>
				<div className='flex items-center justify-between'>
					<div className='w-[100%] border-b item-center justify-between sm:flex sm:space-x-4 space-y-2 sm:space-y-0'>
						<div className='sm:flex p-3 item-center space-y-2 sm:space-y-0 sm:space-x-4'>
							<Box sx={{ minWidth: 120 }}>
								<FormControl fullWidth>
									<Select
										size='small'
										value={mapData.currWard}
										onChange={handleWardChange}
									>
										<MenuItem value={"any"}>All Wards</MenuItem>
										{wards.map((ward) => {
											return (<MenuItem value={ward.ward_number}>{ward.ward_name}</MenuItem>)
										})}
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ minWidth: 120 }}>
								<FormControl fullWidth>
									<Select
										size='small'
										value={parameter}
										onChange={handleParameterChange}
									>
										<MenuItem value={"any"}>All Parameter</MenuItem>
										<MenuItem value={"cleaniness_score"}>Cleaniness</MenuItem>
										<MenuItem value={"public_space_utilization_score"}>Public Space Utilization</MenuItem>
										<MenuItem value={"road_score"}>Road</MenuItem>
										<MenuItem value={"sidewalk_score"}>Walkability</MenuItem>
									</Select>
								</FormControl>
							</Box>

							<Box sx={{ minWidth: 120 }}>
								<FormControl fullWidth>
									<Select
										size='small'
										value={scoreValue}
										onChange={(e) => setScoreValue(e.target.value)}
									>
										<MenuItem value={"any"}>Score</MenuItem>
										<MenuItem value={"poor"}>Poor</MenuItem>
										<MenuItem value={"managable"}>Manageable</MenuItem>
										<MenuItem value={"good"}>Good</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</div>
						<div className='flex items-center'>
							<InfoButton text={toolTipText}></InfoButton>
						</div>
					</div>
				</div>
				<div className='p-2 h-[605px]'>
					<MapContainer
						maxBounds={cityBoundary}
						id='map'
						className='w-full h-full'
						center={mapData.position}
						zoom={mapData.zoom}
						zoomSnap={0.5}
						minZoom={isMobile ? 10 : 12}
						// dragging={false}
						scrollWheelZoom={true}
						key={mapData.position[0] + "$" + mapData.position[1] + "$" + parameter + "$"}
					>
						{/* <PrintCon */}
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
						{/* <Polygon color='black' positions={allBoundary} pathOptions={{
							fillColor: 'white',
							fillOpacity: 1,
							color: '#808080',
							weight: 2,
							lineJoin: 'miter',
							// dashArray:7
						}} /> */}
						{selectedWardBoundary.map((ward) => {
							return <WardPolygon setMapData={setmapData} mapData={mapData} number={ward.scores.ward_number} name={ward.scores.ward_name} boundary={ward.boundary} fillColor={getColRep(parameter === "any" ? ward.scores.overall_score : ward.scores[`${parameter}`])}/>
						})}
					</MapContainer>
					<ImageModal handleClose={handleClose} open={open} imgsrc={imgsrc} />
				</div>
			</div>
	)
}

export default MapComponent