import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { GiCoffeeBeans } from 'react-icons/gi';
import { FiWifi, FiWifiOff } from 'react-icons/fi';
import { FaMapMarkerAlt, FaRestroom } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

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
        <Card.Text className="area-text">
          <FaMapMarkerAlt
          className="area-icon"
          color="#b8b7b7"
          size="0.85em"
          />{cafe.Area.Name}</Card.Text>
        <Card.Text className="hours-text">
          {cafe.Hours}
        </Card.Text>
        <div className="cafe-details">
        <Card.Text>
          <GiCoffeeBeans
          className="card-icons"
          color={cafe.Beans == true ? '#816550' : '#b8b7b7'}
          size= "1.2em"
          />
          {""}
              {cafe.Beans == true ? <span>Sells Beans</span> : <span>Does not sell Beans</span>}
          {""}
        </Card.Text>  
        <Card.Text>
            {""}
              {cafe.Wifi == true ? 
              <FiWifi
              className="card-icons"
              color="#007BFF"
              size="1.2em"
              /> : 
              <FiWifiOff
              className="card-icons"
              color="#b8b7b7"
              size="1.2em"
              />}
            {""}
            {""}
              {cafe.Wifi == true ? <span>Wifi available</span> : <span>No Wifi</span>}
            {""}
        </Card.Text>
        <Card.Text>
          <FaRestroom
          className="card-icons"
          color={cafe.Restroom == true ? 'mediumseagreen' : '#b8b7b7'}
          size= "1.2em"
          />
            {""}
              {cafe.Restroom == true ? <span>Restroom available</span> : <span>No Restroom</span>}
            {""}
        </Card.Text>
        </div>
        <Link to={`/cafes/${cafe._id}`}>
          <Button id="details" variant="link" >Learn More<MdOutlineKeyboardArrowRight/></Button>
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