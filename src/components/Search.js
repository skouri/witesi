import React from 'react';
import { FormControl } from 'react-bootstrap';

// Note: Originally I intended this to be a search by item name. However, that
// would entail loading WAY too many items, causing WAY more network operations
// than I want to deal with at the moment. So, to prove this seach component works,
// I currently have it search by either start or end location of the system.
class Search extends React.Component {
    onChange = (event) => {
        event.preventDefault();
        let text = event.target.value;
        this.props.handleSearch(text);
    }

    render() {
      return (
            <FormControl
                placeholder="Search location..."
                aria-label="Search location..."
                aria-describedby="basic-addon2"
                onChange={ this.onChange }
                />
      );
    }
  }

export default Search;

