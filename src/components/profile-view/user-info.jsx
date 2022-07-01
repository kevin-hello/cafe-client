import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
// styling 
import './profile-view.scss';

export function UserInfo({Username, Email, Birthday}){

  return(
    <Row className="justify-content-md-center">
    <Col>
    <div className="profileContent">
      <h1>My Profile</h1>
    </div>
    <h4>Username: {Username}</h4>
    <h4>Password: ******</h4>
    <h4>Email: {Email}</h4>
    <h4>Birthday: 
        {Birthday}
      </h4>
    </Col>
    </Row>
  )
}