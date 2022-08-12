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

export function ProfileView() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');

  const getUser = () => {
    const userID = localStorage.getItem('userID');
    axios
      .get(`https://cafe-app-la.herokuapp.com/users/${userID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('username',response.data.Username);
        localStorage.setItem('userID', response.data._id)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpdate = (newUserData) => {
    setUser(newUserData);
  };

  useEffect(() => {
      getUser();
  }, []);

  const deleteUser = () => {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
      const userID = localStorage.getItem('userID');
      const username = localStorage.getItem('username')
      axios.delete(`https://cafe-app-la.herokuapp.com/users/${userID}`,
      { headers: {Authorization: `Bearer ${token}`} }
      )
      .then((response) => {
        console.log(response);

        alert(`${username} has been deleted.`);
        localStorage.removeItem('user');
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
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
        <UpdateUserForm handleUpdate={handleUpdate}/>
        <div className="delete-div">
          <h5>Delete Account</h5>
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