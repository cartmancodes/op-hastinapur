import React, { useState, useEffect } from 'react'
import ReactImageZoom from 'react-image-zoom';
import { MapContainer, Marker, Polygon, Polyline, Popup, TileLayer } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css';
import { geojson } from './heatmap';
import { IconButton } from '@mui/material';
import { Box, FormControl, InputLabel, Select, MenuItem, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { data } from './latlongPoints'
import L, { divIcon } from "leaflet";
import "./mapstyle.css";
import { wardDivision } from './wardDivisionData';
import { isMarkerInsidePolygon } from './UtilityFunctions';

const LeafIcon = L.Icon.extend({
	options: {}
});

const redIcon = new LeafIcon({
	iconUrl:
		"redMarker.png"
});


const earthRadius = 6371; // Earth's radius in kilometers

// Function to calculate the appropriate zoom level for a given area and map dimensions
function calculateZoom(areaInSqKm, mapWidth, mapHeight) {
    // Calculate the aspect ratio of the map viewport
    const aspectRatio = mapWidth / mapHeight;

    // Convert area to an equivalent geographical extent in degrees
    const extentInDegrees = Math.sqrt(areaInSqKm) / earthRadius * (180 / Math.PI);

    // Determine the scale of the map at zoom level 0 (pixels per degree)
    const scale = Math.pow(2, 0) / 360;

    // Adjust extent for aspect ratio
    const extentX = extentInDegrees * aspectRatio;
    const extentY = extentInDegrees / aspectRatio;

    // Calculate the zoom level based on the adjusted size of the extent relative to the map's viewport
    const zoomX = Math.log(mapWidth / (extentX * scale)) / Math.LN2;
    const zoomY = Math.log(mapHeight / (extentY * scale)) / Math.LN2;

    // Use the smaller of the two zoom levels to ensure that the entire area fits within the viewport
    return Math.min(zoomX, zoomY);
}


const customMarkerIcon = (name) =>
	divIcon({
		html: name,
		className: "icon"
	});

const setIcon = ({ properties }, latlng) => {
	return L.marker(latlng, { icon: customMarkerIcon("") });
};
let wards = [];

wardDivision.features.map((ward) => {
	wards.push({ "ward_name": ward.properties["Ward Name"], "ward_number": ward.properties["Ward Numbe"] })
})

function MapComponent() {
	const [scoreValue, setScoreValue] = useState("Any");
	const [loading, setLoading] = useState(false);
	const [mapData, setmapData] = useState({
		currWard: "any",
		zoom: 11.5,
		position: [25.4484, 78.5685]
	});

	// useEffect(() => {
	// 	setLoading(true);
	// 	let timeId = setTimeout(() => {
	// 		setLoading(false);
	// 	},1000);
	// },[mapData])


	const handleWardChange = (e) => {
		let wardValue = e.target.value;
		let currPosition = [];
		let currZoom = 11.5;
		if (wardValue !== "any") {
			wardDivision.features.map((feature) => {
				if (wardValue === feature.properties["Ward Numbe"]) {
					currPosition = [feature.properties['Y Centroid'],feature.properties['X centroid']];
					let area = feature.properties.Area;
					// let height = document.getElementById('map').offsetHeight;
					// let width = document.getElementById('map').offsetWidth;
					currZoom = calculateZoom(area,650,600) - 9.5;
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
	const [parameter, setparameter] = useState("Cleaniness");
	const handleParameterChange = (e) => {
		setparameter(e.target.value);
	}
	let max = -1;
	let min = 1;
	let filteredgeoJson = geojson.filter((json) => json.score > 0);
	const newgeojson = [];
	for (let i = 0; i < filteredgeoJson.length; i++) {
		let json = filteredgeoJson[i];
		max = Math.max(max, json.score);
		min = Math.min(min, json.score);
		newgeojson.push(json);
	}

	// let markerjson = newgeojson.filter((json) => json.score > 0.2);
	let markerjson = newgeojson;

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		bgcolor: 'background.paper',
		p: 2,
		boxShadow: 24,
	};
	const [imgsrc, setImgsrc] = useState("");
	const [open, setOpen] = React.useState(false);
	const handleOpen = (e) => {
		setImgsrc(() => e.target.getAttribute('src'));
		setOpen(true);
	}
	const handleClose = () => setOpen(false);

	let selectedWardBoundary = [];
	let allBoundary = [
		[
			[90, -180],
			[90, 180],
			[-90, 180],
			[-90, -180]
		]
	]
	wardDivision.features.map((ward) => {
		let boundary1 = [];
		ward.geometry.coordinates[0][0].map((point) => {
			boundary1.push([point[1], point[0]]);
		});
		allBoundary.push(boundary1);
	});
	if (mapData.currWard === "any") {
		wardDivision.features.map((ward) => {
			let boundary = [];
			ward.geometry.coordinates[0][0].map((point) => {
				boundary.push([point[1], point[0]]);
			});
			selectedWardBoundary.push(boundary);
		});
	} else {
		wardDivision.features.map((ward) => {
			if (mapData.currWard === ward.properties["Ward Numbe"]) {
				let boundary = [];
				ward.geometry.coordinates[0][0].map((point) => {
					boundary.push([point[1], point[0]]);
				});
				selectedWardBoundary.push(boundary);
			}
		});
	}

	if (mapData.currWard !== "any") {
		markerjson = markerjson.filter((dat) => {
			var polygonFormed = L.polygon(selectedWardBoundary);
			var marker = L.marker([dat.longitude, dat.latitude])
			let isContains = polygonFormed.contains(marker.getLatLng());
			let isTrue = isMarkerInsidePolygon([dat.longitude, dat.latitude], [selectedWardBoundary]);
			return isContains;
		});
	}


	return (
		loading ? <div>Loading...</div> :
			<div className='mb-2 p-2 flex flex-col shadow-md rounded-lg w-[50%]'>
				<div className='flex p-2 items-center justify-between'>
					<div className='sm:flex sm:space-x-4 space-y-2 sm:space-y-0'>
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Ward</InputLabel>
								<Select
									value={mapData.currWard}
									label="Ward"
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
								<InputLabel id="demo-simple-select-label">Parameter</InputLabel>
								<Select
									value={parameter}
									label="Parameter"
									onChange={handleParameterChange}
								>
									<MenuItem value={"Cleaniness"}>Cleaniness</MenuItem>
									<MenuItem value={"Tourism"}>Tourism</MenuItem>
									<MenuItem value={"Health"}>Health</MenuItem>
								</Select>
							</FormControl>
						</Box>

						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Score</InputLabel>
								<Select
									value={scoreValue}
									label="Score"
									onChange={(e) => setScoreValue(e.target.value)}
								>
									<MenuItem value={"Any"}>Any</MenuItem>
									<MenuItem value={1}>1</MenuItem>
									<MenuItem value={2}>2</MenuItem>
									<MenuItem value={3}>3</MenuItem>
									<MenuItem value={4}>4</MenuItem>
									<MenuItem value={5}>5</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>
				</div>
				<div>
					<MapContainer
						id='map'
						className='w-[100%] h-[600px]'
						center={mapData.position}
						zoom={mapData.zoom}
						zoomSnap={0.5}
						minZoom={12.2}
						// dragging={false}
						scrollWheelZoom={true}
						key={mapData.position[0] + "$" + mapData.position[1]}
					>
						{/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/> */}
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />

						{/* {wardDivision.features.map((feature) => {
						if (wardValue !== feature.properties["Ward Numbe"]) {
							return (<Polyline positions={feature.geometry.coordinates[0][0].map((cord) => [cord[1], cord[0]])} color={'purple'} />)
						}
					})} */}
						<Polygon color='black' positions={allBoundary} pathOptions={{
							fillColor: ' #D9D9D9',
							fillOpacity: 1,
							color: 'black',
							weight: 0.5,
							lineJoin: 'miter'
						}} />
						<Polygon positions={selectedWardBoundary} color='blue'></Polygon>

						{
							markerjson.map((pos) => {
								return (
									<Marker position={[pos.latitude, pos.longitude]}
										eventHandlers={{
											mouseover: (event) => event.target.openPopup(),
										}} icon={redIcon}>
										<Popup>
											<p>Latitude:- {pos.latitude}</p>
											<p>Longitude:- {pos.longitude}</p>
											<p>Here is XYZ Information</p>
											<img src={`/images/${pos.filename}`} className='w-20 h-20' onClick={handleOpen} />
										</Popup>
									</Marker>
								)
							})
						}
					</MapContainer>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<div className='flex items-center justify-between'>
								<h1 className='text-center'> Image </h1>
								<IconButton onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</div>
							<div>
								<ReactImageZoom zoomWidth={800} img={imgsrc} height={400} width={500} className='w-100 h-100 cursor-pointer' />
							</div>
						</Box>
					</Modal>
				</div>
			</div>
	)
}

export default MapComponent