import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { mockScore } from '../MapComponents/MockData';
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
    id: 'cleanliness_score',
    label: 'Cleaniness Score',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'walkability_score',
    label: 'Walkability Score',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'encroachment',
    label: 'Encroachment',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'road_basic',
    label: 'Road Basic',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'congestion',
    label: 'Congestion',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'air_pollution',
    label: 'Air Pollution',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },


];

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


export default function WardTable() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [filter, setFilter] = React.useState("all");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let data = mockScore;
  data.sort((dat1, dat2) => dat1.ward_number - dat2.ward_number);
  let rows = data;
  if (filter == "top_five") {
    data.sort((dat1, dat2) => dat1.overall_score - dat2.overall_score);
    rows = data.slice(0, 5);
  } else if (filter === "bottom_five") {
    data.sort((dat1, dat2) => dat2.overall_score - dat1.overall_score);
    rows = data.slice(0, 5);
  }

  let styleUnactive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer';
  let styleActive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer bg-sky-100 text-black'
  return (
    <div className='flex items-center justify-center h-[80vh] w-[100%] mb-[60px]'>
      <Paper sx={{width: '100%', overflow: 'scroll',scrollbarWidth: '0px' }}>
        <div className='h-[50px] w-full shadow-lg rounded-t-lg p-2 flex items-center justify-between'>
          <div className='text-2xl font-bold'>Wards</div>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}