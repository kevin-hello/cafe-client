import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

import '../basic-cafe-card/basic-cafe-card.scss';

import { Link } from 'react-router-dom';

export class FavoriteCard extends React.Component {

  render() {
    const { cafes } = this.props;
    return (
  <Link to={`/cafes/${cafes._id}`} className="card-content">
    <Card className="h-100">
      <Card.Img variant="top" src={cafes.ImagePathExterior}/>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="simple-cafe-title">{cafes.Name}</Card.Title>
        <Link to={`/cafes/${cafes._id}`}>
          <Button id="details" variant="link" >Learn More<MdOutlineKeyboardArrowRight/></Button>
        </Link>
      </Card.Body>
    </Card>
  </Link>
    );
  }
} 

FavoriteCard.propTypes = {
  cafes: propTypes.shape({
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