import React from 'react'
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';

function MapMarker({ pos, handleOpen }) {
  return (
    <Marker position={[pos.latitude, pos.longitude]}
      eventHandlers={{
        mouseover: (event) => event.target.openPopup(),
        mouseout: (event) => {
          setTimeout(() => {
            event.target.closePopup()
          }, 1000);
        }
      }}>
      <Popup>
        <p>Latitude:- {pos.latitude}</p>
        <p>Longitude:- {pos.longitude}</p>
        <p>Here is XYZ Information</p>
        <img src={`/images/${pos.file_name}`} className='w-20 h-20' onClick={handleOpen} />
      </Popup>
    </Marker>
  )
}

export default MapMarker