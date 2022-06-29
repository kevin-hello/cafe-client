import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

function AreasList(props) {
console.log(props.cafes);

const uniqueAreas = props.cafes.Area.filter((value,index)=>{
        return props.cafes.Area.indexOf(value) === index;
})

console.log(uniqueAreas);
return ( <>
    {uniqueAreas.map((cafe, index)=> <Col>
        <AreaCard cafe={cafe}/>
        </Col>)}
</>
)}
export default AreasList;
