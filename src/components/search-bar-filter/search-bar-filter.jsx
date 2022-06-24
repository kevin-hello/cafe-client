import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function SearchBarFilter(props) {
  return ( <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.searchBarFilter}
    placeholder="Search for Cafes..."
  />
  );  
}

export default connect(null, { setFilter })(SearchBarFilter);
