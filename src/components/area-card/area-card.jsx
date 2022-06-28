import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import './area-card.scss';

import { Link } from 'react-router-dom';

export class AreaCard extends React.Component {

  render() {
    const { cafe } = this.props;
    return (
  <Link to={`/areas/${cafe.Area.Name}`} className="area-card-content">
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{cafe.Area.Name}</Card.Title>
        <Link to={`/areas/${cafe.Area.Name}`}>
          <Button id="seemore" variant="link" >See More</Button>
        </Link>
      </Card.Body>
    </Card>
  </Link>
    );
  }
} 

AreaCard.propTypes = {
  cafe: propTypes.shape({
    Name: propTypes.string.isRequired,
    Area: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
      StreetAddress: propTypes.string.isRequired,
      City: propTypes.string.isRequired,
      ZipCode: propTypes.string.isRequired,
    }), 
    Hours: propTypes.string.isRequired,
    Phone: propTypes.string,
    Seating: propTypes.string,
    Parking: propTypes.string,
    Website: propTypes.string,
    ImagePathExterior: propTypes.string.isRequired,
    ImagePathInterior: propTypes.string.isRequired,
    ImagePathMisc: propTypes.string,
    TakeOutOnly: propTypes.boolean,
    Wifi: propTypes.boolean,
    Beans: propTypes.boolean,
  }).isRequired
};