import React, { useEffect } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { toast } from 'react-toastify';
import { useState } from 'react';
import api from '../lib/axiosClient';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useContext } from 'react';
import { CityContext } from '../Context/CityContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import RingLoaderComp from '../Components/Loaders/RingLoaderComp';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function CityLogin() {
    const authUser = useAuthUser();
    const user_id = authUser.user_id;
    const cities = authUser.cities;
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    return (
        <div className='w-full space-y-4 min-h-[90vh] flex flex-col items-center py-10 justify-start'>
            {loading ? <RingLoaderComp /> : err ? <div>{err}</div> :
                <div className='w-full flex flex-col items-center justify-center space-y-4'>
                    <div className='w-[90%]'>
                        <TextField
                            variant="outlined"
                            placeholder="Search City"
                            sx={{
                                width: '40%',
                                backgroundColor: 'gray-100',
                                border: '1px solid gray-400',
                                borderRadius: '8px',
                                padding: '2px',
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <Table sx={{
                        width: '90%',
                        borderRadius: '5px', // Apply border radius to the table
                        overflow: 'hidden',   // Ensures the rounding applies properly
                    }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>City Name</StyledTableCell>
                                <StyledTableCell align="center">Overall Score</StyledTableCell>
                                <StyledTableCell align="center">Cleaniness Score</StyledTableCell>
                                <StyledTableCell align="center">Public Space Utilization</StyledTableCell>
                                <StyledTableCell align="center">Road Score</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cities.map((city) => (
                                <CityRow city_id={city}/>
                            ))}
                        </TableBody>
                    </Table>
                </div>}
        </div>
    )
}

function camelCase(word) {
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    return firstLetterCap + remainingLetters;
}

function CityRow({ city_id}) {
    const [city, setCity] = useState(null);
    const cityContext = useContext(CityContext)
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);

    const handleMoveToDashboard = () => {
        cityContext.setCurrentCity(city_id);
        Cookies.set('curr_city', city_id, { expires: 1 / 48 });
        navigate("/infra/monitoring");
    }


    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await api.get(`/city/?city_id=${city_id}`);
                setCity(res.data);
                console.log(res);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [city_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!city) {
        return <div>No data available</div>;
    }

    return (
        <StyledTableRow
            key={city.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <StyledTableCell align='center' component="th" scope="row">
                {camelCase(city.name)}
            </StyledTableCell>
            <StyledTableCell align="center">{city.overall_score}</StyledTableCell>
            <StyledTableCell align="center">{city.cleaniness_score}</StyledTableCell>
            <StyledTableCell align="center">{city.public_space_utilization}</StyledTableCell>
            <StyledTableCell align="center">{city.road_score}</StyledTableCell>
            <StyledTableCell align="center">
                <button onClick={handleMoveToDashboard} className='p-2 rounded-lg bg-black text-white space-x-2 flex items-center justify-center'><span>Go to Dashboard</span><span><ArrowForwardIcon /></span></button>
            </StyledTableCell>
        </StyledTableRow>
    )
}


export default CityLogin