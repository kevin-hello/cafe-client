import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

export class AreasList extends React.Component {

constructor(props) {
  super(props);
}

  render() {
    const {cafes} = this.props;
    return (
      <>
    {props.cafes.map((cafe, index)=> <Col key={cafe.Area.Name}>
        <AreaCard cafe={cafe}/>
        </Col>)}
</>
    );
  }
}
