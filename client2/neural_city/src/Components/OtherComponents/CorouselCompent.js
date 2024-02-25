import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function CorouselComponent() {
    return (
        <div className='w-[full] flex items-center justify-center'>
        <div className='md:w-[40%] sm:w-[70%] w-[95%]'>
            <Carousel dynamicHeight autoPlay>
                <div>
                    <img src="/images/frame_1704116275349_0005.jpg" alt="Not Available"/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="/images/IMG_20231110_135628.jpg" alt="Not Available"/>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="/images/IMG_20231110_135429.jpg" alt="Not Available"/>
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="/images/IMG_20231110_133833.jpg" alt="Not Available"/>
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="/images/IMG_20231110_140144.jpg"  alt="Not Available"/>
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="/images/IMG_20231110_134652.jpg"  alt="Not Available"/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </div>
        </div >
    );
}

export default CorouselComponent