import React, { useState, useEffect } from "react";
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

export function ProfileView (props) {
  const [user, setUser] = useState(props);
  const token = localStorage.getItem('token');
  console.log(props);
  
  const getUser = () => {
    axios
        .get(`https://cafe-app-la.herokuapp.com/users/${props._id}`, {
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


  const deleteUser = () => {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
      axios.delete(`https://cafe-app-la.herokuapp.com/users/${props._id}`,
      { headers: {Authorization: `Bearer ${token}`} }
      )
      .then((response) => {
        console.log(response);

        alert("Account has been deleted.");
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
        <UserInfo user={user} deleteUser={deleteUser}/>
        <UpdateUserForm />
        <div className="delete-div">
          <h5>Danger Zone</h5>
          <p>Do you want to delete your account?</p>
          <Button id="delete" variant="danger" type="button" onClick={(e) => deleteUser()}><BsTrash /> Delete Account</Button>
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