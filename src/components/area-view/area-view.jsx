import React from 'react';
import propTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
//UI elements
import { Row, Container, Col, Button} from 'react-bootstrap';

import { BasicCafeCard } from '../basic-cafe-card/basic-cafe-card';
import AreaMarker from '../area-map-marker/area-marker';

//styling
import "./area-view.scss";

export function AreaView ({area, cafes, cafe, onBackClick}) {
  
  const arealat = (area.Lat);
  const arealng = (area.Long);
   const defaultPropsArea = {
    center: { lat: parseFloat(arealat), lng: parseFloat(arealng)},
    zoom: 15 
  };
  console.log(cafes);

  return(
    <Container fluid className='area-view-container'>
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultPropsArea.center}
        defaultZoom={defaultPropsArea.zoom}
      >
      {cafes && cafes.map((cafe) => {
        <AreaMarker
          lat={parseFloat(cafe.Lat)}
          lng={parseFloat(cafe.Long)}
          cafeName={cafe.Name}
          key={cafe._id}
        />
      })}
      </GoogleMapReact>
    </div>
      <Row>
      <div className="area-name">
        <h2>{cafe.Area.Name}</h2>
      </div>
      <div className="area-description">
        <h4>{cafe.Area.Description}</h4>
      </div>
      <div>
      <Button
      id="return"
      variant="primary"
      onClick={() => onBackClick()}>Back</Button>
      </div>
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
