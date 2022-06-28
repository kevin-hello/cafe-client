import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from '../area-card/area-card';

function AreasList(props) {

return ( 
<>
    {props.map(c => ( <Col key={cafe.Area.Name}>
          <AreaCard cafe={c}/>
        </Col>))}
</>
)
}
export default AreasList;
