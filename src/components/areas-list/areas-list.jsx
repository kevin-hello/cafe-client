import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

function AreasList(props) {
  const { areas } = props;

return(<>
    {props.areas.map(a => (
    <Col sm={12} md={6} key={a._id}>
      <AreaCard areas={a}/>
    </Col>
    ))}
    </>
    )
}
export default AreasList;
