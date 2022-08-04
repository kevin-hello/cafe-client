import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import './area-card.scss';

import { Link } from 'react-router-dom';

export class AreaCard extends React.Component {

  render() {
    const { areas } = this.props;
    return (
    <Card className="h-100 area-card">
      <Card.Body className="d-flex flex-column">
        <Link to={`/areas/${areas.AreaName}`} className="card-content">
        <Card.Title className="area-title">{areas.AreaName}</Card.Title>
        <Card.Text className="area-description">{areas.AreaDescription}</Card.Text>
        </Link>
        <Link to={`/areas/${areas.AreaName}`}>
          <Button
          id="details"
          variant="link"
            >Learn More
            <MdOutlineKeyboardArrowRight/>
          </Button>
        </Link>
      </Card.Body>
    </Card>
    );
  }
} 

AreaCard.propTypes = {
    areas: propTypes.shape({
      AreaName: propTypes.string.isRequired,
      AreaDescription: propTypes.string.isRequired
    }).isRequired
};