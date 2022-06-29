import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

export class AreasList extends React.Component {

constructor(props) {
  super(props);
}

RemoveDuplicateAreas(data, key) {
        return [
                ...new Map(
                        data.map(c => [key(c), c])
                ).values()
        ]
}

  render() {
    const {cafes} = this.props;
    return (
      <>
    { (JSON.stringify(this.RemoveDuplicateAreas(cafes, c => c.Area.Name))).map((cafe, index)=> <Col key={cafe.Area.Name}>
        <AreaCard cafe={cafe}/>
        </Col>)}
</>
    );
  }
}
