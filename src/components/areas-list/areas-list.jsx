import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

export class AreasList extends React.Component {

constructor(props) {
  super(props);
}

RemoveDuplicateAreas(data) {
        return data.filter((value,index) => data.indexOf(value) === index);
}

  render() {
    const {areas} = this.props;
    return (
      <>
    { this.RemoveDuplicateAreas(areas).map((area, index)=> <Col key={area.Name}>
        <AreaCard area={area}/>
        </Col>)}
</>
    );
  }
}
