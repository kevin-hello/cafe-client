import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AreaCard } from "../area-card/area-card";


function AreasList(props) {
  const { cafes } = props;
  let filteredAreas = cafes;


if (!cafes) return <div className="main-view"/>;

return <>
    {filteredAreas.map(c=> (
    <Col className="card-div"sm={12} md={6} lg={4} key={c.Area.Name}>
      <AreaCard cafe={c}/>
    </Col>
    ))}
</>;
}
export default AreasList;
