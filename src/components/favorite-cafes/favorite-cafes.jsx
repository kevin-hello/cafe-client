import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

// UI elements 
import { Col } from 'react-bootstrap';
import LoadingSpinner from '../loading-spinner/loading-spinner';
//card components 
import { FavoriteCafeCard } from '../favorite-cafe-card/favorite-cafe-card';

// styling 
import './favorite-cafes.scss';

export class FavoriteCafes extends React.Component {
  constructor() {
    super();
    this.state={
      FavoriteCafesList: [],
      isLoading: false,
      isRemoving: false,
    };
  }

  componentDidMount() {
    this.getFavorites()
  }

  getFavorites() {
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
    this.setState({
            isLoading: true
          });
      axios
        .get(`https://cafe-app-la.herokuapp.com/users/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
            isLoading: false
          });
          this.setState({
            FavoriteCafesList: response.data.FavoriteCafes
          });
        })
        .catch(function (error) {
          this.setState({
            isLoading: false
          });
          console.log(error);
        });
    }

  onRemoveFavorite = (e, cafe) => {
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
    this.setState({
            isRemoving: true
          });
    axios.delete(`https://cafe-app-la.herokuapp.com/users/${userID}/cafes/${cafe._id}`, 
    { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      this.setState({
            isRemoving: false
          });
      console.log(response);
      alert(`${cafe.Name} has been removed from favorites`);
      this.componentDidMount();
    })
    .catch(function (error) {
      this.setState({
            isRemoving: false
          });
      console.log(error);
    });
  }
  render() {
    const { FavoriteCafesList, isLoading, isRemoving } = this.state;
    return (
        <>
        <Col lg={12} className="text-center"><h3>Favorite Cafes</h3></Col>    
        {isLoading && <LoadingSpinner text={'Loading Favorites...'}/>}
        {isRemoving && <LoadingSpinner text={'Removing Cafe...'}/>}
        {FavoriteCafesList && FavoriteCafesList.map((cafe) => (
        <Col className="favoriteCafeCardDiv" md={12} lg={4} key={cafe._id}>
        <FavoriteCafeCard cafe={cafe} onRemoveFavorite={this.onRemoveFavorite}/>
        </Col> ))}
        </>
    );
  }
}

FavoriteCafes.propTypes = {
  user: propTypes.shape({
    FavoriteCafes: propTypes.array
  }).isRequired
}