import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

function AreasList({areas}) {
console.log(areas);
return(<>
    <Col lg={12} className="text-center areas-header"><h2>Areas</h2></Col> 
    {areas.map(a => (
    <Col className ="area-card-col p-2"sm={12} md={6} key={a._id}>
      <AreaCard areas={a}/>
    </Col>
    ))}
    </>
    )
}
export default AreasList;
