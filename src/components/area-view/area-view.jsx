import React from 'react';
import propTypes from 'prop-types';

//UI elements
import { Row, Col, Button, Container} from 'react-bootstrap';

import { CafeCard } from '../cafe-card/cafe-card';
//styling
import "./area-view.scss";

export function AreaView ({cafes, cafe, onBackClick}) {
  
  return(
    <>
    <Col className="area-view">
      <div className="area-name">
        <h1>{cafe.Area.Name}</h1>
      </div>
    </Col>
    { cafes && cafes.map((cafe) => (
    <Col className='area-cafe-cards' md={3} key={cafe._id}>
    <CafeCard cafe={cafe} />
    </Col> ))}
          <Button id="return" variant="primary" onClick={() => onBackClick()}>Back</Button>
    </>
  );
}

AreaView.propTypes = {
  cafe: propTypes.shape({
    Name: propTypes.string.isRequired,
    Area: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string,
      StreetAddress: propTypes.string.isRequired,
      City: propTypes.string.isRequired,
      ZipCode: propTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
}
