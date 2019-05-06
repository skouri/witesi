import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

class CharacterSearch extends React.Component {
    onClick = (event) => {
        event.preventDefault();
        let text = ReactDOM.findDOMNode(this.refs.characterName).value;
        this.props.handleCharacterSearch(text);
    }

    render() {
      return (
        <InputGroup>
          <FormControl
            ref="characterName"
            placeholder="Search character..."
            aria-label="Search character..."
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={ this.onClick }>Search</Button>
          </InputGroup.Append>
        </InputGroup>
      );
    }
  }

export default CharacterSearch;

