import React from 'react';
import propTypes from 'prop-types';

//UI elements
import { Row, Col, Button, Container} from 'react-bootstrap';

import { AreaCard } from '../area-card/area-card';
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
      <Button id="return" variant="primary" onClick={() => onBackClick()}>Back</Button>
    </Col>
    </Row>
    <Row className='movie-div'>
    { cafes && cafes.map((cafe) => (
    <Col className='area-cafe-cards' md={3} key={cafe.Area.Name}>
    <AreaCard cafe={cafe} />
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
      Description: propTypes.string,
      StreetAddress: propTypes.string.isRequired,
      City: propTypes.string.isRequired,
      ZipCode: propTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
}
