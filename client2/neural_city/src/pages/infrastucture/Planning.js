import React, { useEffect } from 'react'
import { mockRecommendation } from '../../mockData/MapData';
import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

function Planning() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const idx = searchParams.get('id');
  const [currIdx, setcurrIdx] = useState(idx);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100)
  }, [loading]);
  const handleChange = (e) => {
    setcurrIdx(e.target.value);
    setLoading(true);
    setSearchParams({ id: currIdx });
  }
  return (
    <div className='space-y-4 p-4'>
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
              {mockRecommendation.map((recom, idx) => (
                <MenuItem key={idx} value={idx}>{recom.main_topic}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="bg-white h-[80vh] overflow-y-scroll p-6 rounded-sm shadow-[inset_0px_0px_2000px_10px_#00000024,0px_3px_8px_0px_#00000024]">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 underline">Recommended Topic: {mockRecommendation[currIdx].main_topic}</h2>
        <div className="space-y-4">
          {mockRecommendation[currIdx].points.map((recom, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 w-[88vw]">
              <h3 className="text-lg font-bold mb-2 text-green-700 underline">{recom.topic}</h3>
              <ul className="list-disc pl-6">
                {recom.description.map((pt, idx) => (
                  <li key={idx} className="text-gray-800">{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Planning