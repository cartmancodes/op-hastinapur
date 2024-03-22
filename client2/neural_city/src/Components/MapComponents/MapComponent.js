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
})

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
	// const [loading, setLoading] = useState(true);
	const [mapData, setmapData] = useState({
		currWard: "any",
		zoom: 12.2,
		position: [25.4484, 78.5685]
	});


	const handleWardChange = (e) => {
		let wardValue = e.target.value;
		let currPosition = [];
		let currZoom = 12;
		if (wardValue !== "any") {
			wardDivision.features.map((feature) => {
				if (wardValue === feature.properties["Ward Numbe"]) {
					currPosition = [feature.geometry.coordinates[0][0][parseInt((feature.geometry.coordinates[0][0].length) / 2)][1], feature.geometry.coordinates[0][0][parseInt((feature.geometry.coordinates[0][0].length) / 2)][0]];
				}
			});
			currZoom = 15;
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

	let selectedWardBoundary = [[[90, -180],
	[90, 180],
	[-90, 180],
	[-90, -180]]];
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
	console.log(selectedWardBoundary);

	if (mapData.currWard !== "any") {
		markerjson = markerjson.filter((dat) => {
			var polygonFormed = L.polygon(selectedWardBoundary[0][0][0]);
			console.log(polygonFormed);
			console.log(selectedWardBoundary[0][0]);
			var marker = L.marker([dat.longitude, dat.latitude])
			console.log(marker);
			let isContains = polygonFormed.contains(marker.getLatLng());
			let isTrue = isMarkerInsidePolygon([dat.longitude, dat.latitude], selectedWardBoundary[0]);
			return isContains;
		});
	}


	return (
		// loading ? <div>Loading...</div> : 
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
					className='w-[100%] h-[600px]'
					center={mapData.position}
					zoom={mapData.zoom}
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
					<Polygon positions={selectedWardBoundary} pathOptions={{
						fillColor:' #D9D9D9',
						fillOpacity: 1,
						
					}} />
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