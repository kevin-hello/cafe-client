import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

function AreasList(props) {

const uniqueAreas = [...new Set(props.cafes.Area)];

console.log(uniqueAreas);
return ( <>
    {uniqueAreas.map((cafe, index)=> <Col>
        <AreaCard cafe={cafe}/>
        </Col>)}
</>
)}
export default AreasList;
