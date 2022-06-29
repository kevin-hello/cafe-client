import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

export class AreasList extends React.Component {

constructor(props) {
  super(props);
}

RemoveDuplicateAreas(data) {
        return data.filter((value, index) => data.indexOf(value) === index);
}


  render() {
    const {cafes} = this.props;

    return (
      <>
    {this.RemoveDuplicateAreas(props.cafes).map((cafe, index)=> <Col key={cafe.Area.Name}>
        <AreaCard cafe={cafe}/>
        </Col>)}
</>
    );
  }
}
