import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { newRecomandationModel } from '../../mockData/MapData';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

function caseChange(str) {
  let sepe = str.split("_");
  let ans = sepe.map((s) => {
    return s[0].toUpperCase() + s.substring(1);
  }).join(" ");
  return ans;
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div class="p-2 max-h-[500px] overflow-y-scroll ">
          <ul class="divide-y divide-gray-200">
            {
              props.data.map((point) => {
                return (
                  <li class="py-4">
                    <h3 class="text-lg font-semibold underline text-green-500">{point.sub_topic}</h3>
                    <p class="text-gray-600"><span className='font-bold'>Objective:</span> {point.objective}</p>
                    <p class="text-gray-600"><span className='font-bold'>Rationale:</span> {point.rationale}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Planning() {

  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currIdx, setcurrIdx] = useState(0);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100)
  }, [loading]);
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleChange = (e) => {
    setcurrIdx(e.target.value);
    setLoading(true);
    setSearchParams({ id: currIdx });
  }

  return (
    <div className='space-y-4 p-4 w-full min-h-[100vh]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Suggested Recommendations</h1>
        <div className="w-64">
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="demo-simple-select-label">Parameter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currIdx}
              onChange={handleChange}
              label="Parameter"
            >
              {newRecomandationModel.map((recom, idx) => (
                <MenuItem key={idx} value={idx}>{caseChange(recom.topic)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-full'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs allowScrollButtonsMobile scrollButtons variant="scrollable" value={value} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Immediate Measures" {...a11yProps(0)} />
            <Tab label="Short Term Solutions" {...a11yProps(1)} />
            <Tab label="Foundational Changes" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} data={newRecomandationModel[currIdx].immediate_measures}>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} data={newRecomandationModel[currIdx].short_term_solutions}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} data={newRecomandationModel[currIdx].foundational_changes} >
          Item Three
        </CustomTabPanel>
      </div>
    </div>
  );
}