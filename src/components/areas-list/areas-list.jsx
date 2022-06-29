import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

function AreasList(props) {

console.log(props.cafes);

const uniqueAreasSet = new Set(props.cafes.map((c) => c.Area.Name));
const uniqueAreas = Array.from(uniqueAreasSet).sort();

console.log(uniqueAreas);

return ( <>
    {props.cafes.map((cafe, index)=> <Col key={cafe.Area.Name}>
        <AreaCard cafe={cafe}/>
        </Col>)}
</>
)}
export default AreasList;
