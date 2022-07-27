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
  const [userData, setUserData] = useState();
  const token = localStorage.getItem('token');
  const userID = localStorage.getitem('userID');
  
  const getUser = () => {
    axios
      .get(`https://cafe-app-la.herokuapp.com/users/${userID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
        console.log(userData.Username);
        console.log(userData.Email);
        console.log(userData.Birthday);
        localStorage.setItem('username',response.data.Username);
        localStorage.setItem('userID', response.data._id)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
      getUser();
      console.log(userData);
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
        {/* <UserInfo username={userData.Username} email={userData.Email} birthday={userData.Birthday}/> */}
        <UpdateUserForm/>
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