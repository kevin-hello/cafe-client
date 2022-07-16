import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import propTypes from 'prop-types';

// UI elements 
import {Button, Container } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
//profile view components 
import  UserInfo  from './user-info';
import  UpdateUserForm from './update-user-form';

// styling 
import './profile-view.scss';

export function ProfileView () {
  const [user, setUser] = useState({});

// [] is used for an Array object such as FaveCafes, {} is used for a plain object such as user data.
  
  const getUser = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
        .get(`https://cafe-app-la.herokuapp.com/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect(() => {
    getUser();
  }, [])

  const onRemoveFavorite = (e, cafe) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://cafe-app-la.herokuapp.com/users/${user._id}/cafes/${cafe._id}`, 
    { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response);

      alert(`${cafe.Name} has been removed from favorites`);
      setFavoriteCafes(FavoriteCafes.filter(c => c._id != id));
    })
    .catch(function (error) {

      console.log(error);
    });
  }


  const deleteUser = () => {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      console.log(user);
      axios.delete(`https://cafe-app-la.herokuapp.com/users/${user}`,
      { headers: {Authorization: `Bearer ${token}`} }
      )
      .then((response) => {
        console.log(response);
        alert(`Account has been deleted.`);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open("/",'_self'); 
      })
      .catch(function(error) {

        console.log(error);
      })};
  }

    return (
      <Container className="profile-view">
        <UserInfo user={user}/>
        <UpdateUserForm />
        <div className="delete-div">
          <h5>Danger Zone</h5>
          <p>Do you want to delete your account?</p>
          <div><Button id="delete" variant="danger" type="button" onClick={(e) => deleteUser()}><BsTrash /> Delete Account</Button></div>
        </div>
      </Container>
    );

    }
ProfileView.propTypes = {
  user: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.date,
    FavoriteCafes: propTypes.array
  }).isRequired,
}