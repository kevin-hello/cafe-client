import React from 'react';
import propTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
//UI elements
import { Row, Container, Col, Button} from 'react-bootstrap';

import { BasicCafeCard } from '../basic-cafe-card/basic-cafe-card';
import { AreaMarker } from '../area-marker/area-marker';

//styling
import "./area-view.scss";

export function AreaView ({area, cafes, cafe, onBackClick}) {
  
  const arealat = (area.Lat);
  const arealng = (area.Long);
   const defaultPropsArea = {
    center: { lat: parseFloat(arealat), lng: parseFloat(arealng)},
    zoom: 13 
  };
  console.log(cafes);

  return(
    <Container>
    <div style={{ height: '35vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultPropsArea.center}
        defaultZoom={defaultPropsArea.zoom}
      >
      {cafes && cafes.map((c) => {
        <AreaMarker
          lat={parseFloat(c.Lat)}
          lng={parseFloat(c.Long)}
          cafe={c.Name}
          key={c._id}
        />
      })}
      </GoogleMapReact>
    </div>
      <Row>
      <div className="area-name">
        <h2>{cafe.Area.Name}</h2>
      </div>
      <div className="area-description">
        <span>{cafe.Area.Description}</span>
      </div>
      <Button
      id="return"
      variant="primary"
      onClick={() => onBackClick()}>Back</Button>
    </Row>
    <Row className='area-cafes'>
      <h4>{cafe.Area.Name} Cafes</h4>
    </Row>
    <Row>
    { cafes && cafes.map((cafe) => (
    <Col className='area-cafe-cards' md={12} lg={4} key={cafe._id}>
    <BasicCafeCard cafe={cafe} />
    </Col> ))}
    </Row>
    </Container>
  );
}

AreaView.propTypes = {
  cafe: propTypes.shape({
    Name: propTypes.string.isRequired,
    Area: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
      StreetAddress: propTypes.string.isRequired,
      City: propTypes.string.isRequired,
      ZipCode: propTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
}
