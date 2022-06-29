import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

function AreasList(props) {
return(<>
    {cafes.map((cafe, index)=> <Col key={cafe.Area.Name}>
        <AreaCard cafe={cafe}/>
        </Col>)}
</>)
}
export default AreasList;

