import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import LoadingSpinner from '../loading-spinner/loading-spinner';

import { Link } from 'react-router-dom';
// UI Elements
import { Form, Button, Container } from 'react-bootstrap';
//styling
import './login-view.scss';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();
    setIsLoading(true);
    // send a request to the server for authentication 
    axios.post("https://cafe-app-la.herokuapp.com/login",
    {
      Username: username,
      Password: password

    })
    .then(response=>{
      const data = response.data;
      props.onLoggedIn(data);
      setIsLoading(false);
    })
    .catch(e => {
      setIsLoading(false);
      console.log("no such user");
      alert("Something broke! Please check your username and password")
    });
  };


  return (
    <Container>
      {isLoading && <LoadingSpinner text={'Loading...'}/>}
        <Form id="login-form">
            <h1>Login</h1>
            <div className="float-label">
              <input type="text" value={username} id="username" name="Username" className="form-control" onChange={e => setUsername(e.target.value)} required/>
              <label className={username && 'filled'} htmlFor="username">Username</label>
            </div>
            <div className="float-label">
              <input type="password" value={password} id="password" name="Password" className="form-control" onChange={e => setPassword(e.target.value)} required/>
              <label className={password && 'filled'}  htmlFor="password">Password</label>
            </div>
            <Button
            id= "submit"
            variant="primary link"
            type="submit"
            onClick={handleSubmit}>Login
            </Button>
        </Form>
        <div className='secondary-text'>
          <div>Don't have an account? </div>
              <Link to={`/register`} >
                <Button variant="link" className="secondary-link">Register</Button> 
              </Link>
        </div>
        </Container>
  );
}

LoginView.propTypes = {
  login: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
  }),
  onLoggedIn: propTypes.func.isRequired,
}; 
