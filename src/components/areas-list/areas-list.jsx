import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

function AreasList(props) {
  const { areas } = props;

return( <>
    <Col md={12} className="search-bar-small-screen">
    </Col>
    {props.areas.map(a => (
    <Col className="card-div"sm={12} md={6} lg={4} key={a._id}>
      <AreaCard areas={areas}/>
    </Col>
))}
</>)
}
export default AreasList;
