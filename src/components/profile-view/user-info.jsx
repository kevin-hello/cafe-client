import React from 'react';
import { Col, Row } from 'react-bootstrap';

// styling 
import './profile-view.scss';

export default function UserInfo({user}){

  return(
    <Row className="justify-content-md-center">
    <Col>
    <div className="profileContent">
      <h1>Account Details</h1>
    </div>
    <h4>Username: {user.Username}</h4>
    <h4>Email: {user.Email}</h4>
    <h4>Birthday: {user.Birthday}</h4>
    </Col>
    </Row>
  )
}