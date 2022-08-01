import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

// UI elements 
import {Button, Col, Row } from 'react-bootstrap';

//card components 

import { CafeCard } from '../cafe-card/cafe-card';

// styling 
import './favorite-cafes.scss';

export class FavoriteCafes extends React.Component {
  constructor() {
    super();
    this.state={
      FavoriteCafesList: [],
    };
  }

  componentDidMount() {
    this.getFavorites()
  }

  getFavorites() {
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
      axios
        .get(`https://cafe-app-la.herokuapp.com/users/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
            FavoriteCafesList: response.data.FavoriteCafes
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  onRemoveFavorite = (e, cafe) => {
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
    axios.delete(`https://cafe-app-la.herokuapp.com/users/${userID}/cafes/${cafe._id}`, 
    { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response);
      alert(`${cafe.Name} has been removed from favorites`);
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    const { FavoriteCafesList } = this.state;
    return (
        <div>
        <h3>Favorite Cafes</h3>
        <Row>
         { FavoriteCafesList && FavoriteCafesList.map((cafe) => (
        <Col md={4} key={cafe._id}>
        <div className="favoriteCafeDiv" >
        <CafeCard cafe={cafe} />
        <Button bg="danger" variant="danger" className="removefav-button" value={cafe._id} onClick={(e) => this.onRemoveFavorite(e, cafe)}>
        Delete From Favorites
        </Button>
        </div>
        </Col> ))}
        </Row>
        </div>
    );
  }
}

FavoriteCafes.propTypes = {
  user: propTypes.shape({
    FavoriteCafes: propTypes.array
  }).isRequired
}