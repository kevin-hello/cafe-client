import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AreaCard } from '../area-card/area-card';
import SearchBarFilterAreas from '../search-bar-filter/search-bar-filter-areas';

const mapStateToProps = state => {
  const { SearchBarFilterAreas } = state;
  return { searchBarFilterAreas };
};

function AreasList(props) {
  const { areas, searchBarFilterAreas } = props;
  let filteredAreas = areas;


if (searchBarFilter !== '' ) {
  filteredAreas = areas.filter(a=> a.AreaName.toLowerCase().includes(searchBarFilterAreas.toLowerCase()));
}

if (!areas) return <div className="main-view"/>;

return <>
    <Col md={12} className="search-bar-small-screen">
    <SearchBarFilterAreas searchBarFilterAreas={searchBarFilterAreas} />
    </Col>
    {filteredAreas.map(a=> (
    <Col className="card-div"sm={12} md={6} lg={4} key={a._id}>
      <AreaCard area={area}/>
    </Col>
))}
</>;
}
export default connect(mapStateToProps)(AreasList);
