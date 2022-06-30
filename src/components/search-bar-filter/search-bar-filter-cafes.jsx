import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function SearchBarFilterCafes(props) {
  return ( <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.searchBarFilterCafes}
    placeholder="Search for Cafes..."
  />
  );  
}

export default connect(null, { setFilter })(SearchBarFilterCafes);