import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function CorouselComponent() {
    return (
        <div className='w-[full] flex items-center justify-between'>
        <div className='md:w-[40%] sm:w-[60%] w-[95%]'>
            <Carousel dynamicHeight autoPlay>
                <div>
                    <img src="images/frame_1696238315439_0001.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="images/frame_1696238315439_0001.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="images/frame_1696238315439_0001.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </div>
        </div >
    );
}

export default CorouselComponent