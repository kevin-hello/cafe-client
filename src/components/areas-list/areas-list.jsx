import React from 'react';
import { Col } from 'react-bootstrap';
import { AreaCard } from "../area-card/area-card";


function AreasList(props) {
  const { areas } = props;

return <>
    {areas.map((c)=> (
    <Col className="area-div" md={4} key={c.Area.Name}>
      <AreaCard cafe={c}/>
    </Col>
    ))}
</>;
}
export default AreasList;
