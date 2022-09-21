import React from "react";
import GoogleMapReact from 'google-map-react';
import Marker from '../cafe-marker/marker';

export default function AreaMap({arealat, arealng, cafes}){
  
  const defaultPropsArea = {
    center: { lat: parseFloat(arealat), lng: parseFloat(arealng)},
    zoom: 16 
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '35vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultPropsArea.center}
        defaultZoom={defaultPropsArea.zoom}
      >
      {cafes.map(({ Lat, Long, _id, Name }) => {
        <Marker
          lat={parseFloat(Lat)}
          lng={parseFloat(Long)}
          cafeName={Name}
          key={_id}
        />
      })}
      </GoogleMapReact>
    </div>
  );
}