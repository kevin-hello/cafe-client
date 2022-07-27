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

export function ProfileView({}) {
  const [userData, setUserData] = useState();

  
  const token = localStorage.getItem('token');

  const getUser = () => {
    const user = localStorage.getItem('user');
    axios
      .get(`https://cafe-app-la.herokuapp.com/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        console.log(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    let userData = localStorage.getItem("user");
    if (accessToken !== null && userData !== null) {
      getUser(userData._id, accessToken);
      console.log(userData);
    }
  }, []);

  const deleteUser = () => {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      axios.delete(`https://cafe-app-la.herokuapp.com/users/${userData._id}`,
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
        <UserInfo username={userData.Username} email={userData.Email} birthday={userData.Birthday}/>
        <UpdateUserForm user={userData}/>
        <div className="delete-div">
          <h5>Danger Zone</h5>
          <p>Do you want to delete your account?</p>
          <Button id="delete" variant="danger" type="button" onClick={(e) => deleteUser()}><BsTrash /> Delete Account</Button>
          </div>
      </Container>
    );

    }
// ProfileView.propTypes = {
//   user: propTypes.shape({
//     Username: propTypes.string.isRequired,
//     Password: propTypes.string.isRequired,
//     Email: propTypes.string.isRequired,
//     Birthday: propTypes.date,
//     FavoriteCafes: propTypes.array
//   }).isRequired,
// }