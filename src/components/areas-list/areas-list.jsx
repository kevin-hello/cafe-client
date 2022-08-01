import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

function AreasList({areas}) {
console.log(areas);
return(<>
    {areas.map(a => (
    <Col className ="area-card-col"sm={12} md={6} key={a._id}>
      <AreaCard areas={a}/>
    </Col>
    ))}
    </>
    )
}
export default AreasList;
