import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import './cafe-card.scss';

import { Link } from 'react-router-dom';

export class CafeCard extends React.Component {

  render() {
    const { cafe } = this.props;
    return (
  <Link to={`/cafes/${cafe._id}`} className="card-content">
    <Card className="h-100">
      <Card.Img variant="top" src={cafe.ImagePathExterior}/>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{cafe.Name}</Card.Title>
        <Card.Text>{cafe.Area.Name}</Card.Text>
        <Link to={`/cafes/${cafe._id}`}>
          <Button id="seemore" variant="link" >See More</Button>
        </Link>
      </Card.Body>
    </Card>
  </Link>
    );
  }
} 

CafeCard.propTypes = {
  cafe: propTypes.shape({
    Name: propTypes.string.isRequired,
    Area: propTypes.shape({
      Name: propTypes.string.isRequired,
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