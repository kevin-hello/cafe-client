import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SearchBarFilter from '../search-bar-filter/search-bar-filter';

const mapStateToProps = state => {
  const { searchBarFilter } = state;
  return { searchBarFilter };
};

function AreasList(props) {
  const { areas, searchBarFilter } = props;
  let filteredAreas = areas;


if (searchBarFilter !== '' ) {
  filteredAreas = areas.filter(c=> c.Area.Name.toLowerCase().includes(searchBarFilter.toLowerCase()));
}

if (!areas) return <div className="main-view"/>;

return <>
    <Col md={12} className="search-bar-small-screen">
    <SearchBarFilter searchBarFilter={searchBarFilter} />
    </Col>
    {filteredAreas.map(c=> (
      <li area={c.Area.Name}/>
))}
</>;
}
export default connect(mapStateToProps)(AreasList);
