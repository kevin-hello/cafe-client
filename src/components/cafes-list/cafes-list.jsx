import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CafeCard } from '../cafe-card/cafe-card';
import SearchBarFilter from '../search-bar-filter/search-bar-filter';

const mapStateToProps = state => {
  const { searchBarFilter } = state;
  return { searchBarFilter };
};

function CafesList(props) {
  const { cafes, searchBarFilter } = props;
  let filteredCafes = cafes;


if (searchBarFilter !== '' ) {
  filteredCafes = cafes.filter(c=> c.Name.toLowerCase().includes(searchBarFilter.toLowerCase()));
}

if (!cafes) return <div className="main-view"/>;

return <>
    <Col md={12} className="search-bar-small-screen">
    <SearchBarFilter searchBarFilter={searchBarFilter} />
    </Col>
    {filteredCafes.map(c=> (
    <Col className="cafe-card-div" md={12} lg={4} key={c._id}>
      <CafeCard cafe={c}/>
    </Col>
))}
</>;
}
export default connect(mapStateToProps)(CafesList);
