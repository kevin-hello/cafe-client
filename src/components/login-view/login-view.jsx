import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import { Link } from 'react-router-dom';
// UI Elements
import { Form, Button } from 'react-bootstrap';
//styling
import './login-view.scss';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault();
    // send a request to the server for authentication 
    axios.post("https://cafe-app-la.herokuapp.com/login",
    {
      Username: username,
      Password: password

    })
    .then(response=>{
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log("no such user");
      alert("User does not exist")
    });
  };


  return (
        <Form id="login-form">
            <h1>Login</h1>
            <div className="form-group" id="float-label-user">
              <input type="text" value={username} id="username" name="Username" className="form-control" onChange={e => setUsername(e.target.value)} required/>
              <label className={username && 'filled'} htmlFor="username">Username</label>
            </div>
            <div className="form-group" id="float-label-pass">
              <input type="password" value={password} id="password" name="Password" className="form-control" onChange={e => setPassword(e.target.value)} required/>
              <label className={password && 'filled'}  htmlFor="password">Password</label>
            </div>
            <Button
            id= "submit"
            variant="primary link"
            type="submit"
            onClick={handleSubmit}>Login</Button>
            <Link to={`/register`} >
              <Button id="register" variant="secondary">Register</Button> 
            </Link>
        </Form>
  );
}

LoginView.propTypes = {
  login: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
  }),
  onLoggedIn: propTypes.func.isRequired,
}; 
