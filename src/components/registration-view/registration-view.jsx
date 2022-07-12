import axios from 'axios';
import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Container, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheck, FaInfoCircle, FaTimes  } from 'react-icons/fa';
import './registration-view.scss'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9·-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

export function RegistrationView() {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername ] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword ] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [birthday, setBirthday ] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
        userRef.current.focus();
  }, [])

  useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
  }, [username])

  useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatchPassword(password === matchPassword);
  }, [password, matchPassword])

  useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
        setErrMsg('');
  }, [username, password, matchPassword, email])

  const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post('https://cafe-app-la.herokuapp.com/users',
                JSON.stringify({ username, password, email, birthday }),
                {
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUsername('');
            setPassword('');
            setMatchPassword('');
            setEmail('');
            setBirthday('');
            } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
      }

  return (
    <>
            {success ? (
                <Card>
                    <h1>Success!</h1>
                    <Link to={`/`} >
                          <a id="login-link">Login</a> 
                    </Link>
                </Card>
            ) : (
                <Container>
                    <Form className="register-form" onSubmit={handleSubmit}>
                      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                      <div className="float-label">
                        <label
                        className={username && 'filled'}
                        htmlFor="username">
                            Username: 
                            <FaCheck className={validUsername ? "valid" : "hide"} />
                            <FaTimes className={validUsername || !username ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            name="Username"
                            required
                            aria-invalid={validUsername ? "false" : "true"}
                            aria-describedby="usernamenote"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p id="usernamenote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                            <FaInfoCircle />
                            4 to 16 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                      </div>
                      <div className="float-label">
                        <label
                        className={password && 'filled'}
                        htmlFor="password">
                            Password: 
                            <FaCheck className={validPassword ? "valid" : "hide"} />
                            <FaTimes className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="Password"
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passwordnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FaInfoCircle />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                      </div>
                      <div className="float-label">
                        <label
                        className={matchPassword && 'filled'}
                        htmlFor="confirm_password">
                            Confirm Password: 
                            <FaCheck className={validMatchPassword && matchPassword ? "valid" : "hide"} />
                            <FaTimes className={validMatchPassword || !matchPassword  ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatchPassword ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchPasswordFocus(true)}
                            onBlur={() => setMatchPasswordFocus(false)}
                        />
                        <p id="confirmnote" className={matchPasswordFocus && !validMatchPassword ? "instructions" : "offscreen"}>
                            <FaInfoCircle />
                            Must match the first password input field.
                        </p>
                      </div>
                      <div className="float-label">
                        <label
                        className={email && 'filled'}
                        htmlFor="email">
                            Email: 
                            <FaCheck className={validEmail ? "valid" : "hide"} />
                            <FaTimes className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="Email"
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                            <FaInfoCircle />
                            Please enter a valid email
                        </p>
                      </div>
                      <div className="float-label">
                        <label
                        className={birthday && 'filled'}
                        htmlFor="birthday">
                            Birthday:
                        </label>
                        <input
                            type="date"
                            id="birthday"
                            onChange={(e) => setBirthday(e.target.value)}
                            value={birthday}
                            name="Birthday"
                            required
                        />
                      </div>
                        <Button disabled={!validUsername || !validPassword || !validMatchPassword || !validEmail ? true : false} className="register-button" type="submit">Sign Up</Button>
                    </Form>
                      <div className='secondary-text'>
                        <span>Already have an account? </span>
                        <div>
                        <Link to={`/`} >
                          <a id="secondary-link">Login</a> 
                        </Link>
                        </div>
                      </div>
                </Container>
            )}
        </>
    )
}