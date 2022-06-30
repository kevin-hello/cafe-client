import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CafeCard } from '../cafe-card/cafe-card';
import SearchBarFilterCafes from '../search-bar-filter/search-bar-filter-cafes';

const mapStateToProps = state => {
  const { searchBarFilterCafes } = state;
  return { searchBarFilterCafes };
};

function CafesList(props) {
  const { cafes, searchBarFilterCafes } = props;
  let filteredCafes = cafes;


if (searchBarFilterCafes !== '' ) {
  filteredCafes = cafes.filter(c=> c.Name.toLowerCase().includes(searchBarFilterCafes.toLowerCase()));
}

if (!cafes) return <div className="main-view"/>;

return <>
    <Col md={12} className="search-bar-small-screen">
    <SearchBarFilterCafes searchBarFilterCafes={searchBarFilterCafes} />
    </Col>
    {filteredCafes.map(c=> (
    <Col className="card-div"sm={12} md={6} lg={4} key={c._id}>
      <CafeCard cafe={c}/>
    </Col>
))}
</>;
}
export default connect(mapStateToProps)(CafesList);
