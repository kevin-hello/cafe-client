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

export function ProfileView ({user}) {
  const [newUser, setNewUser] = useState();
  const token = localStorage.getItem('token');
  
  const getUser = () => {
    axios
        .get(`https://cafe-app-la.herokuapp.com/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setNewUser(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }


    useEffect(() => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (token !== null && user !== null) {
      getUser(user, token);
    }
  }, []);

    if (!user) return <p>No User data</p>;


  const deleteUser = () => {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      axios.delete(`https://cafe-app-la.herokuapp.com/users/${user._id}`,
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
        <UserInfo username={user.Username} email={user.Email} birthday={user.Birthday}/>
        <UpdateUserForm user={user}/>
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