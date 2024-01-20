import React, { useEffect } from 'react'
import { mockRecommendation } from './MapComponents/MockData';
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
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl'>Suggested Recommendations</h1>
        <FormControl sx={{ width: '400px' }}>
          <InputLabel id="demo-simple-select-label">Parameter</InputLabel>
          <Select
            value={currIdx}
            label="Parameter"
            onChange={handleChange}
            size='small'
          >
            {
              mockRecommendation.map((recom, idx) => {
                return <MenuItem value={idx}>{recom.main_topic}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </div>
      <div className="bg-gray-100 h-[80vh] overflow-y-scroll p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">{mockRecommendation[currIdx].main_topic}</h2>
        <div>
          {
            mockRecommendation[currIdx].points.map((recom) => {
              return (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{recom.topic}</h3>
                  <ul className="list-disc pl-6">
                    {
                      recom.description.map((pt) => {
                        return <li>
                          {pt}
                        </li>
                      })
                    }
                  </ul>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Planning