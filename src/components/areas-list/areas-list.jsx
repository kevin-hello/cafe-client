import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AreaCard } from '../area-card/area-card';
import SearchBarFilter from '../search-bar-filter/search-bar-filter';

const mapStateToProps = state => {
  const { searchBarFilter } = state;
  return { searchBarFilter };
};

function AreasList(props) {
  const { areas, searchBarFilter } = props;
  let filteredAreas = areas;


if (searchBarFilter !== '' ) {
  filteredAreas = areas.filter(a=> a.AreaName.toLowerCase().includes(searchBarFilter.toLowerCase()));
}

if (!areas) return <div className="main-view"/>;

return <>
    <Col md={12} className="search-bar-small-screen">
    <SearchBarFilter searchBarFilter={searchBarFilter} />
    </Col>
    {filteredAreas.map(a=> (
    <Col className="card-div"sm={12} md={6} lg={4} key={a._id}>
      <AreaCard area={area}/>
    </Col>
))}
</>;
}
export default connect(mapStateToProps)(AreasList);
