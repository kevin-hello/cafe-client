import React from 'react';
import propTypes from 'prop-types';

//UI elements
import { Row, Container, Col, Button} from 'react-bootstrap';

import { CafeCard } from '../cafe-card/cafe-card';
//styling
import "./area-view.scss";

export function AreaView ({cafes, cafe, onBackClick}) {

  return(
    <Container>
      <Row>
    <Col className="area-view">
      <div className="area-name">
        <h1>{cafe.Area.Name}</h1>
      </div>
      <div className="area-description">
        <span>{cafe.Area.Description}</span>
      </div>
      <Button id="return" variant="primary" onClick={() => onBackClick()}>Back</Button>
    </Col>
    </Row>
    <Row className='area-cafes'>
      <h3>{cafe.Area.Name} Cafes</h3>
    </Row>
    <Row>
    { cafes && cafes.map((cafe) => (
    <Col className='area-cafe-cards' md={4} key={cafe._id}>
    <CafeCard cafe={cafe} />
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
