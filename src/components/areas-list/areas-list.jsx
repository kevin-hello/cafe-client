import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

export class AreasList extends React.Component {

constructor(props) {
  super(props);
}

  render() {
    const {areas} = this.props;
    return (
      <>
    { this.props.areas.map((area, index)=> <Col key={area.Name}>
        <AreaCard area={area}/>
        </Col>)}
</>
    );
  }
}
