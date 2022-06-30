import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import './area-card.scss';

import { Link } from 'react-router-dom';

export class AreaCard extends React.Component {

  render() {
    const { area } = this.props;
    return (
  <Link to={`/areas/${area.AreaName}`} className="area-card-content">
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{area.AreaName}</Card.Title>
        <Card.Text>{area.AreaDescription}</Card.Text>
        <Link to={`/areas/${area.AreaName}`}>
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
      AreaName: propTypes.string.isRequired,
      AreaDescription: propTypes.string.isRequired
    }).isRequired
};