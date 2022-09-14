import React from "react";
import GoogleMapReact from 'google-map-react';
import Marker from "./cafe-marker/marker";


export default function CafeMap({cafeName, lat, lng}){
  const defaultProps = {
    center: { lat: parseFloat(lat), lng: parseFloat(lng)},
  zoom: 15
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '35vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={parseFloat(lat)}
          lng={parseFloat(lng)}
          name={cafeName}
          color="blue"
          />
        
      </GoogleMapReact>
    </div>
  );
}