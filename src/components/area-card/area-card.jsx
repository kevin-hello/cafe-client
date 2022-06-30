import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import './area-card.scss';

import { Link } from 'react-router-dom';

export class AreaCard extends React.Component {

  render() {
    const { areas } = this.props;
    return (
  <Link to={`/areas/${areas.AreaName}`} className="area-card-content">
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{areas.AreaName}</Card.Title>
        <Card.Text>{areas.AreaDescription}</Card.Text>
        <Link to={`/areas/${areas.AreaName}`}>
          <Button id="seemore" variant="link" >See More</Button>
        </Link>
      </Card.Body>
    </Card>
  </Link>
    );
  }
} 

AreaCard.propTypes = {
    areas: propTypes.shape({
      AreaName: propTypes.string.isRequired,
      AreaDescription: propTypes.string.isRequired
    }).isRequired
};