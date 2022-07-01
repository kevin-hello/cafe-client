import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

// UI elements 
import {Button, Col, Form, Row, Container } from 'react-bootstrap';

//profile view components 
import { UserInfo } from './user-info';

import { CafeCard } from '../cafe-card/cafe-card';


// styling 
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state={
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteCafes: [],
    };
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
      axios
        .get(`https://cafe-app-la.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
            Username: response.data.Username,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthday: response.data.Birthday,
            FavoriteCafes: response.data.FavoriteCafes
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  onRemoveFavorite = (e, cafe) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://cafe-app-la.herokuapp.com/${username}/cafes/${cafe._id}`, 
    { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      alert(`${this.props.cafe.Name} has been removed from favorites`);
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  deleteUser() {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      axios.delete(`https://cafe-app-la.herokuapp.com/users/${username}`,
      { headers: {Authorization: `Bearer ${token}`} }
      )
      .then(() => {
        alert(`${username} has been deleted.`);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.open("/",'_self'); 
      })
      .catch(function(error) {
        console.log(error);
      })};
  }

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://cafe-app-la.herokuapp.com/users/${username}`,
    {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    },
    { headers: {Authorization: `Bearer ${token}`} 
  })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday
      });
      localStorage.setItem('user', response.data.Username);
      const data = response.data;
      this.setState({
        Username: data.Username,
        Password: data.Password,
        Email: data.Email,
        Birthday: data.Birthday
      });
      alert('Profile updated');
    })
    .catch( function(error){
      console.log(error);
    })
  }

  setUsername(value) {
    this.state.Username= value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { Username, Email, Birthday, FavoriteCafes } = this.state;
    return (
      <Container className="profile-view">
        <UserInfo Username={ Username } Email={ Email } Birthday={ Birthday ? Birthday.split("T")[0] : Birthday }/>
      <div className="profile-info">
        <Form className="user-form" onSubmit={(e) => this.editUser(e)}>
          <h3>Update Profile</h3>
          <Col>
            <div className="form-group">
              <input type="text" id="username" name="Username" className="form-control" onChange={(e) => this.setUsername(e.target.value)} required/>
              <label className="form-control-placeholder" htmlFor="username">New Username</label>
            </div>
            <div className="form-group">
              <input type="password" id="password" name="Password" className="form-control" onChange={(e) => this.setPassword(e.target.value)} required/>
              <label className="form-control-placeholder" htmlFor="password">New Password</label>
            </div>
            <div className="form-group">
              <input type="email" id="email" name="Email" className="form-control" onChange={(e) => this.setEmail(e.target.value)} required/>
              <label className="form-control-placeholder" htmlFor="email">New Email</label>
            </div>
            <div className="form-group">
              <input type="date" id="birthday" name="Birthday" className="form-control" onChange={(e) => this.setBirthday(e.target.value)} required/>
              <label className="form-control-placeholder" htmlFor="birthday">New Birthday</label>
            </div>
          </Col>
          <Button id="update" variant="primary" type="submit">Update</Button>
          </Form>
        </div>
          <Row>
            <Col>
              <Button id="delete" variant="danger" type="submit" onClick={(e) => this.deleteUser()}>Delete Account</Button>
            </Col>
          </Row>
        <div>
        <h3>Favorite Cafes</h3>
        <Row>
         { FavoriteCafes && FavoriteCafes.map((cafe) => (
        <Col md={4} key={cafe._id}>
        <div className="favoriteCafesDiv" >
        <CafeCard cafe={cafe} />
        <Button bg="danger" variant="danger" className="unfav-button" value={cafe._id} onClick={(e) => this.onRemoveFavorite(e, cafe)}>
        Delete From Favorites
        </Button>
        </div>
        </Col> ))}
        </Row>
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.date,
    FavoriteCafes: propTypes.array
  }).isRequired,
  editUser: propTypes.func.isRequired,
  deleteUser: propTypes.func.isRequired,
}