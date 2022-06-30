import React from "react";
import { connect } from "react-redux";

import { Form } from "react-bootstrap";

import { setFilter } from "../../actions/actions";

function SearchBarFilterAreas(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.searchBarFilterAreas}
      placeholder="Search for Areas..."
    />
  );
}

export default connect(null, { setFilter })(SearchBarFilterAreas);
