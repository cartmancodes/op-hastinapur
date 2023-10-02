import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import { geojson } from './heatmap';
import { useTheme } from '@mui/material/styles';
import SelectBox from '../Utility/SelectBox'
import { Button, IconButton } from '@mui/material';
import { Box, FormControl, InputLabel, Select, MenuItem, Modal } from '@mui/material'
import L from 'leaflet';
import CloseIcon from '@mui/icons-material/Close';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function MapComponent() {
    const position = [12.9716, 77.5946];
    let newgeojson = geojson.filter(geo => (parseFloat(geo.lat) >= 12.95) && parseFloat(geo.lon) >= 77.56 && parseFloat(geo.lat) <= 13.10 && parseFloat(geo.lon) <= 77.7);
    console.log(newgeojson);
    const [wardValue, setwardValue] = useState("Ward1");
    const handleWardChange = (e) => {
        setwardValue(e.target.value);
    }
    const [parameter, setparameter] = useState("Cleaniness");
    const handleParameterChange = (e) => {
        setparameter(e.target.value);
    }

    const handleApplyClick = () => {

    }

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
    return (
        <div className='mb-2 p-2 flex flex-col shadow-md rounded-lg'>
            <div className='flex p-2 items-center justify-between'>
                <div className='flex space-x-4'>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Ward</InputLabel>
                            <Select
                                value={wardValue}
                                label="Ward"
                                onChange={handleWardChange}
                            >
                                <MenuItem value={"Ward1"}>Ward1</MenuItem>
                                <MenuItem value={"Ward2"}>Ward2</MenuItem>
                                <MenuItem value={"Ward3"}>Ward3</MenuItem>
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

                </div>
                <div>
                    <Button variant='contained' onClick={handleApplyClick} disableElevation>Apply</Button>
                </div>
            </div>
            <div>
                <MapContainer
                    className='w-[100%] h-[400px]'
                    center={position}
                    zoom={12}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* <HeatmapLayer
                        radius={10}
                        minOpacity={2}
                        fitBoundsOnLoad
                        fitBoundsOnUpdate
                        zoom={15}
                        points={newgeojson}
                        longitudeExtractor={m => parseFloat(m.lon)}
                        latitudeExtractor={m => parseFloat(m.lat)}
                        intensityExtractor={m => parseFloat(m.avg_rating)}
                    /> */}
                    {
                        newgeojson.map((pos) => {
                            return (
                                <Marker position={pos}
                                    eventHandlers={{
                                        mouseover: (event) => event.target.openPopup(),
                                    }}>
                                    <Popup>
                                        <p>Latitude:- {pos.lat}</p>
                                        <p>Longitude:- {pos.lon}</p>
                                        <p>Here is XYZ Information</p>
                                        <img src="https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092_1280.png" className='w-20 h-20' onClick={handleOpen} />
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
                            <img src={imgsrc} className='w-100 h-100 cursor-pointer' />
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default MapComponent