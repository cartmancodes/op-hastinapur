import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FormControl,
  InputBase
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import WardTableRow from './WardTableRow';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { avgData } from '../../mockData/MapData';
import { areaData } from '../../mockData/area_scores';
import { Box } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';

const columns = [
  { id: 'area_name', label: 'Area Name', minWidth: 170, align: 'center', },
  { id: 'area_type', label: 'Area Type', minWidth: 170, align: 'center', },
  {
    id: 'overall',
    label: 'Overall',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Cleanliness_and_Waste_Management',
    label: 'Cleaniness',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Walkability_and_Inclusivity',
    label: 'Walkability',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Encroachment',
    label: 'Encroachment',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Health_and_Environment',
    label: 'Health and Env.',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Mobility_and_Congestion',
    label: 'Mob. and Cong.',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Public_Safety',
    label: 'Public Safety',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Aesthetics',
    label: 'Aesthetics',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Road_Quality',
    label: 'Road Quality',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '300',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));


export default function WardTable() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [filter, setFilter] = React.useState("all");
  const [areaType, setAreaType] = useState("wards");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let data = avgData;
  data.sort((dat1, dat2) => dat1.ward_number - dat2.ward_number);
  let rows = data;
  if (filter == "bottom_five") {
    if (page !== 0) {
      setPage(0);
    }
    data.sort((dat1, dat2) => dat1.overall_score - dat2.overall_score);
    rows = data.slice(0, 5);
  } else if (filter === "top_five") {
    if (page !== 0) {
      setPage(0);
    }
    data.sort((dat1, dat2) => dat2.overall_score - dat1.overall_score);
    rows = data.slice(0, 5);
  }


  if (searchText != "") {
    if (filter != "all") {
      setFilter("all");
    }
    rows = data.filter((dat) => {
      return dat.area_name.toUpperCase().includes(searchText.toUpperCase());
    });
    console.log(rows);
  }

  let styleUnactive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer';
  let styleActive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer bg-sky-100 text-black'
  return (
    <div className='flex items-center justify-center w-[100%] rounded-xl'>
      <Paper sx={{ width: '100%', overflow: 'scroll', scrollbarWidth: '0px' }}>
        <div className='py-4 space-y-2 sm:space-y-0 w-full shadow-lg rounded-t-lg px-2 sm:flex items-center justify-between'>
          <div className='text-2xl w-[50%] flex items-center font-bold space-x-2'>
            {/* <h1>Wards</h1> */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  size='small'
                  value={areaType}
                  onChange={(e) => setAreaType(e.target.value)}
                >
                  <MenuItem value={"wards"}>Wards</MenuItem>
                  <MenuItem value={"roads"}>Roads</MenuItem>
                  <MenuItem value={"intersections"}>Intersections</MenuItem>
                  <MenuItem value={"parks"}>Parks</MenuItem>
                  <MenuItem value={"markets"}>Markets</MenuItem>
                  <MenuItem value={"tourist_area"}>Tourist Area</MenuItem>
                  <MenuItem value={"transport_hub"}>Transport Hub</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className='flex space-x-2'>
            <button onClick={() => setFilter("all")} className={filter == "all" ? styleActive : styleUnactive}>All</button>
            <button onClick={() => setFilter("top_five")} className={filter == "top_five" ? styleActive : styleUnactive}>Top 5 Area</button>
            <button onClick={() => setFilter("bottom_five")} className={filter == "bottom_five" ? styleActive : styleUnactive}>Bottom 5 Area</button>
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell
                  key={'images'}
                  align={'center'}
                >
                  {'Images'}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {areaData
              .filter((column) => column.area_type === areaType)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
              <WardTableRow row={row} columns={columns} />
              );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          align='bottom'
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          colSpan={3}
        />
      </Paper>
    </div>
  );
}