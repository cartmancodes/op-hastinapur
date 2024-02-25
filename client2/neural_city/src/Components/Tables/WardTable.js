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
  TableFooter,
  TextField,
  FormControl,
  InputLabel,
  InputBase
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { mockScore } from '../../mockData/MapData';
import WardTableRow from './WardTableRow';
import { alpha } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { avgData } from '../../mockData/MapData';
const columns = [
  { id: 'ward_number', label: 'Ward Number', minWidth: 100, align: 'center', },
  { id: 'ward_name', label: 'Ward Name', minWidth: 170, align: 'center', },
  {
    id: 'overall_score',
    label: 'Overall Score',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'cleaniness_score',
    label: 'Cleaniness Score',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'sidewalk_score',
    label: 'Walkability Score',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'encroachment_score',
    label: 'Encroachment',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'road_score',
    label: 'Road',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  }
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
    if(page !== 0){
      setPage(0);
    }
    data.sort((dat1, dat2) => dat1.overall_score - dat2.overall_score);
    rows = data.slice(0, 5);
  } else if (filter === "top_five") {
    if(page !== 0){
      setPage(0);
    }
    data.sort((dat1, dat2) => dat2.overall_score - dat1.overall_score);
    rows = data.slice(0, 5);
  }


  if (searchText != "") {
    if (filter != "all") {
      setFilter("all");
    }
    console.log("Here");
    rows = data.filter((dat) => {
      return dat.ward_name.toUpperCase().includes(searchText.toUpperCase()) || dat.ward_number.toString().includes(searchText);
    });
    console.log(rows);
  }




  let styleUnactive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer';
  let styleActive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer bg-sky-100 text-black'
  return (
    <div className='flex items-center justify-center h-[80vh] w-[100%] mb-[60px]'>
      <Paper sx={{ width: '100%', overflow: 'scroll', scrollbarWidth: '0px'}}>
        <div className='py-4 space-y-2 sm:space-y-0 w-full shadow-lg rounded-t-lg px-2 sm:flex items-center justify-between'>
          <div className='text-2xl w-[50%] flex items-center font-bold space-x-8'>
            {/* <h1>Wards</h1> */}
            <FormControl variant="standard">
              <BootstrapInput className='w-[300px]' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search Wards" />
            </FormControl>
          </div>
          <div className='flex space-x-2'>
            <button onClick={() => setFilter("all")} className={filter == "all" ? styleActive : styleUnactive}>All</button>
            <button onClick={() => setFilter("top_five")} className={filter == "top_five" ? styleActive : styleUnactive}>Top 5 Wards</button>
            <button onClick={() => setFilter("bottom_five")} className={filter == "bottom_five" ? styleActive : styleUnactive}>Bottom 5 Wards</button>
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
              {rows
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