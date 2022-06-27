import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import { Link } from 'react-router-dom';
//UI components 
import {Col, Row, Button} from 'react-bootstrap';
//styling
import './cafe-view.scss';


export class CafeView extends React.Component {

constructor(props) {
  super(props);
}

  addFavoriteCafe() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://cafe-app-la.herokuapp.com/users/${username}/cafes/${this.props.cafe._id}`, {}, {
      headers: { Authorization: `Bearer ${token}`},
      method: 'POST'
    })
    .then(response => {
      alert(`${this.props.cafe.Name} has been added to your favorites`)
    })
    .catch(function(error){
      console.log(error);
    });
  };

  render() {
    const {cafe, onBackClick} = this.props;

    return (
      <Row className="cafe-view">
        <Col sm={12} md={4} className="cafe-exterior">
          <img height = "auto" width="100%"  src={cafe.ImagePathExterior}/>
          </Col>
          <Col sm={12} md={8}>
          <h2>{cafe.Name}</h2>
        <div className="cafe-area">
          <span className="value">{cafe.Area.Name}</span>
        </div>
        <div className="cafe-hours">
          <span className="label">Hours: {cafe.Hours}</span>
        </div>
        <div className="cafe-website">
        <a href={cafe.Website} target="_blank">Cafe's Website</a>
        </div>
        <Button variant="primary" id="back" onClick={() => { onBackClick(null);}}>Back</Button>
        <Button variant="danger" id="favcafe" value={cafe._id} onClick={(e) => this.addFavoriteCafe(e, cafe)}>Add to favorites</Button>
        </Col>
       </Row>
    );
  }
}

CafeView.propTypes = {
  cafe: propTypes.shape({
    Name: propTypes.string.isRequired,
    Area: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string,
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
  }).isRequired,
  user: propTypes.shape({
    Username: propTypes.string.isRequired,
    FavoriteCafes: propTypes.array.isRequired
  }).isRequired,
  addFavoriteCafe: propTypes.func.isRequired,
  onBackClick: propTypes.func.isRequired
};