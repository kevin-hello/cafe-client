import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './registration-view.scss'
import propTypes from 'prop-types';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
//hook for input validation
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
    setUsernameErr('Username Required');
    isReq = false;
    }else if(username.length < 4){
    setUsernameErr('Username must be at least 4 characters long');
    isReq = false;
    }
    if(!password){
    setPasswordErr('Password Required');
    isReq = false;
    }else if(password.length < 6){
    setPasswordErr('Password must be 6 characters long');
    isReq = false;
    }
    if(!email){
      setEmailErr('Email Required');
      isReq = false;
    }else if(email.indexOf('@') === -1){
      setEmailErr('Please enter a valid email');
      isReq = false;
    }
    return isReq;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq  = validate();
    if(isReq) {
      axios.post('https://cafe-app-la.herokuapp.com/users',
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful, please login');
        window.open("/",'_self');  
        //_self is needed to open page in the current tab
      })
      .catch(response => {
        console.error(response);
        alert('unable to register');
      });
    }
  };

  return (
    <Container fluid id="register-form">
            <Form >
            <h1>Create Account</h1>

            <div className="float-label">
              <input
                type="text"
                value={username}
                id="username"
                name="Username"
                className="form-control"
                onChange={e => setUsername(e.target.value)}
                required
              />
              <label
                className={username && 'filled'}
                htmlFor="username">
                Username
              </label>
              {usernameErr && <p className="error-message" >{usernameErr}</p>}
            </div>
            <div className="float-label">
              <input
                type="password"
                value={password}
                id="password"
                name="Password"
                className="form-control"
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label
                className={password && 'filled'}
                htmlFor="password">
                Password
              </label>
              {passwordErr && <p className="error-message" >{passwordErr}</p>}
            </div>
            <div className="float-label">
              <input
                type="email"
                value={email}
                id="email"
                name="Email"
                className="form-control"
                onChange={e => setEmail(e.target.value)}
                required
              />
              <label
                className={email && 'filled'}
                htmlFor="email">
                Email
              </label>
              {emailErr && <p className="error-message" >{emailErr}</p>}
            </div>
            <div className="float-label">
              <input
                type="date"
                value={birthday}
                id="birthday"
                name="Birthday"
                className="form-control"
                onChange={e => setBirthday(e.target.value)}
                required
              />
              <label
                className={birthday && 'filled'}
                htmlFor="birthday">
                Birthday
              </label>
            </div>
            <Button
            id="submit"
            type="submit"
            onClick={handleSubmit}>
            Submit
            </Button>
            </Form>
            <div className='login-text'>
              <span>Already have an account? </span>
            <Link to={`/`} >
              <a id="login-link">Login</a> 
            </Link>
            </div>
    </Container>
  );
}