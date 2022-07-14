import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

import './basic-cafe-card.scss';

import { Link } from 'react-router-dom';

export class BasicCafeCard extends React.Component {

  render() {
    const { cafe } = this.props;
    return (
  <Link to={`/cafes/${cafe._id}`} className="card-content">
    <Card className="h-100">
      <Card.Img variant="top" src={cafe.ImagePathExterior}/>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="simple-cafe-title">{cafe.Name}</Card.Title>
        <Link to={`/cafes/${cafe._id}`}>
          <Button id="details" variant="link" >Learn More<MdOutlineKeyboardArrowRight/></Button>
        </Link>
      </Card.Body>
    </Card>
  </Link>
    );
  }
} 

BasicCafeCard.propTypes = {
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
    Restroom: propTypes.boolean,
    Instagram: propTypes.string,
  }).isRequired
};