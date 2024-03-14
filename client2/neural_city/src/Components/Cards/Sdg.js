import React from 'react'
import Button from '@mui/material/Button'
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoButton from '../ui/InfoButton';
function Sdg() {
    const aboutSDG = 
    "Sustainable Development Goal (SDG) 11 aims to make cities inclusive, safe, resilient, and sustainable. It targets improved urban planning, management, and infrastructure, promoting access to safe and affordable housing, public transport, green spaces, and cultural heritage preservation. SDG 11 strives for cities that are equitable, resilient, and environmentally friendly."    
    const [selectedIdx, setSelectedIdx] = useState(0);
    const headings = [
        "City Intelligence for 22 parameters out of 100 + total parameters",
        "Data model defined for 100 + parameters across city infrastructure and services",
        "Parameters mapped against the UN's SDG Goal 11 - Sustainable Cities and Communities",
        "Recommendations based on SDG impact and on - ground feasibility"
    ]
    return (
        <div className='bg-white h-[150px] rounded-sm w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] '>
            <div className='space-x-4 p-2 border-b flex items-center justify-between'>
                <div className='flex space-x-2 items-center'>
                    <img src="/sdg_logo.png" className='w-[50px] h-[50px]' />
                    <div className='flex items-center text-lg font-semibold'>Sustainable Development Goals<span><InfoButton text={aboutSDG}></InfoButton></span></div>
                </div>

                <div>
                    <Button><Link to="/infra/monitering/sustainability">Details</Link></Button>
                </div>
            </div>
            <div className='text-lg text-center w-full'>
                <Carousel className='w-full p-2' onChange={
                    (idx) => {
                        setSelectedIdx(idx);
                    }
                } centerMode={true}
                    showIndicators={false}
                    showThumbs={false}
                    showArrows={false}
                    axis='horizontal'
                    autoPlay
                    centerSlidePercentage={75}
                    infiniteLoop
                >

                    {
                        headings.map((head, idx) => {
                            return (selectedIdx === idx) ? <div className='font-bold text-lg py-2 backdrop-blur-xl backdrop-brightness-100 bg-white'>
                                <p>{head}</p>
                            </div> :
                                <div className='text-sm mt-3 py-2 overflow-hidden bg-white'>
                                    <p>{head}</p>
                                </div>
                        })
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default Sdg