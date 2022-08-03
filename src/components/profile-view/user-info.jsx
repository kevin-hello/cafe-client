import React from 'react';
import { Col} from 'react-bootstrap';
// styling 
import './profile-view.scss';

export default function UserInfo ({username, email, birthday}) {

  return(
    <Col className="profileContent">
    <h1>Account Details</h1>
    <h4>Username: {username}</h4>
    <h4>Email: {email}</h4>
    <h4>Birthday: {birthday}</h4>
    </Col>
  )
}