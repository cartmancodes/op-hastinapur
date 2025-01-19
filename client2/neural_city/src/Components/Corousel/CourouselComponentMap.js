import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function CourouselComponentMap({ datapoints }) {
    return (
        <div className='w-[full] flex items-center justify-center'>
            <div className='w-[50%]'>
                <Carousel dynamicHeight autoPlay showThumbs={true} showIndicators={false}>
                    {
                        datapoints.map((dat) => {
                            return (
                                <div>
                                    <img src={`/images/${dat.media_url}`}/>
                                    <p className="legend">Legend 1</p>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
        </div >
    );
}

export default CourouselComponentMap