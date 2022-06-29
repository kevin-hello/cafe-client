import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import './area-card.scss';

import { Link } from 'react-router-dom';

export class AreaCard extends React.Component {

  render() {
    const { area } = this.props;
    return (
  <Link to={`/areas/${area.Name}`} className="area-card-content">
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{area.Name}</Card.Title>
        <Card.Text>{area.Description}</Card.Text>
        <Link to={`/areas/${area.Name}`}>
          <Button id="seemore" variant="link" >See More</Button>
        </Link>
      </Card.Body>
    </Card>
  </Link>
    );
  }
} 

AreaCard.propTypes = {
    Area: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
      StreetAddress: propTypes.string.isRequired,
      City: propTypes.string.isRequired,
      ZipCode: propTypes.string.isRequired,
    }).isRequired
};