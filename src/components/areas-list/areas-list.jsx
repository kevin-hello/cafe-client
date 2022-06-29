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
    const {areas} = this.props;
    return (
      <>
    { (JSON.stringify(this.RemoveDuplicateAreas(areas, c => c.Name))).map((area, index)=> <Col key={cafe.Area.Name}>
        <AreaCard area={area}/>
        </Col>)}
</>
    );
  }
}
