import axios from 'axios';
import React, { useRef, useState, useEffect } from "react";
import { Row, Form, Button } from 'react-bootstrap';
import { FaCheck, FaInfoCircle, FaTimes  } from 'react-icons/fa';
import LoadingSpinner from '../loading-spinner/loading-spinner';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const BDAY_REGEX = /^(?:(?:19|20)[0-9]{2})-(0[1-9]|[12][0-9]|3[01])/;


export default function UpdateUserForm({handleUpdate}) {
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
  const [validBirthday, setValidBirthday] = useState(false);
  const [birthdayFocus, setBirthdayFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const [isLoading, setIsLoading] = useState(false);

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
        setValidBirthday(BDAY_REGEX.test(birthday));
  }, [birthday])

  useEffect(() => {
        setErrMsg('');
  }, [username, password, matchPassword, email, birthday])

  const editUser = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = BDAY_REGEX.test(birthday);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
            setIsLoading(true);
            const token = localStorage.getItem('token');
            const userID = localStorage.getItem('userID');
            axios.put(`https://cafe-app-la.herokuapp.com/users/${userID}`,
                {
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday
                },
            { headers: {Authorization: `Bearer ${token}`} }
    )
    .then((response => {
      setIsLoading(false);
      console.log(response.data);
      handleUpdate(response.data);
      setUsername('');
      setPassword('');
      setMatchPassword('');
      setEmail('');
      setBirthday('');
      alert('Profile updated');
      localStorage.setItem('username',response.data.Username);
      localStorage.setItem('userID', response.data._id)
      // window.open(`/profile`,'_self'); 
    }))       
    .catch(function (error){
      setIsLoading(false);  
      console.log(error);
      alert('Unable to update');
    }) 
    errRef.current.focus();
  }

  return (
    <>
                    {isLoading && <LoadingSpinner text={'Loading...'}/>}
                    <Form className="update-user-form" onSubmit={editUser}>
                      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Update Account</h1>
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
                            <FaCheck className={validBirthday ? "valid" : "hide"} />
                            <FaTimes className={validBirthday || !birthday ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="date"
                            id="birthday"
                            onChange={(e) => setBirthday(e.target.value)}
                            value={birthday}
                            name="Birthday"
                            required
                            aria-invalid={validBirthday ? "false" : "true"}
                            aria-describedby="bdaynote"
                            onFocus={() => setBirthdayFocus(true)}
                            onBlur={() => setBirthdayFocus(false)}
                        />
                        <p id="bdaynote" className={birthdayFocus && !validBirthday ? "instructions" : "offscreen"}>
                            <FaInfoCircle />
                            Please enter a valid date between the years (1900-2099)
                        </p>
                      </div>
                        <Button className="register-button" type="submit">Update</Button>
                    </Form>
        </>
    )
}