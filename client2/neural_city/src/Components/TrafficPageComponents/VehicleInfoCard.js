import React from 'react'
import { Button, Modal, Box, FormControl, InputLabel, Select, MenuItem, TextField, IconButton } from '@mui/material'
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
function VehicleInfoCard() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };
    const [vehicleinfo, setVehicleInfo] = useState({
        rno: "MH 40 BE 2665",
        dateandTime: "20/07/2022-11:30",
        speed: "40kmph",
        class: "car",
        redLightViolation: "No"
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className='w-full sm:h-[300px] h-[280px] bg-gray-300 space-y-2 px-2 pt-2'>
            <div>
                <img className='w-full h-[60px]' src="https://cpimg.tistatic.com/06564048/b/4/Car-Number-Plate.jpg" />
            </div>
            <div className='flex text-left w-full sm:h-[170px] h-[150px] bg-gray-400 p-1 rounded-lg overflow-y-scroll'>
                <div className='w-[50%]'>
                    <p className='font-bold text-slate-600'>Registration Number</p>
                    <p className='text-white font-bold'>{vehicleinfo.rno}</p>

                    <p className='font-bold text-slate-600'>Date and Time</p>
                    <p className='text-white font-bold'>{vehicleinfo.dateandTime}</p>

                    <p className='font-bold text-slate-600'>Speed</p>
                    <p className='text-red-500 font-bold'>{vehicleinfo.speed}</p>
                </div>
                <div className='w-[50%]'>
                    <p className='font-bold text-slate-600'>Vehicle Class</p>
                    <p className='text-white font-bold'>{vehicleinfo.class}</p>

                    <p className='font-bold text-slate-600'>Red Light Violation</p>
                    <p className='text-white font-bold'>{vehicleinfo.redLightViolation}</p>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <Button variant='contained' color='error' onClick={handleOpen}>Edit</Button>
                <Button variant='contained'>Verify</Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='space-y-6 sm:w-[50%] w-[100%]'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold'>Update Vehicle Details</h1>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>

                    <form className='space-y-2'>
                        <TextField className='w-[100%]' variant='outlined' label='Registration Number' value={vehicleinfo.rno}
                            onChange={(e) => {
                                setVehicleInfo((vehicleinfo) => {
                                    return {
                                        ...vehicleinfo,
                                        rno: e.target.value
                                    }
                                })
                            }}
                        />

                        <TextField className='w-[100%]' variant='outlined' label='Speed' value={vehicleinfo.speed}
                            onChange={(e) => {
                                setVehicleInfo((vehicleinfo) => {
                                    return {
                                        ...vehicleinfo,
                                        speed: e.target.value
                                    }
                                })
                            }}
                        />

                        <TextField className='w-[100%]' variant='outlined' label='Registration Number' value={vehicleinfo.class}
                            onChange={(e) => {
                                setVehicleInfo((vehicleinfo) => {
                                    return {
                                        ...vehicleinfo,
                                        class: e.target.value
                                    }
                                })
                            }}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Red Light Violation</InputLabel>
                            <Select
                                value={vehicleinfo.redLightViolation}
                                label="Red Light Violation"
                                onChange={(e) => {
                                    setVehicleInfo((vehicleinfo) => {
                                        return {
                                            ...vehicleinfo,
                                            redLightViolation: e.target.value
                                        }
                                    })
                                }}
                            >
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <Button className="contained">
                            Verify Details
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default VehicleInfoCard