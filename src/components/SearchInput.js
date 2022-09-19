import React from "react";
import { InputGroup, Form, Dropdown, DropdownButton } from "react-bootstrap";

class SearchInput extends React.Component {
  render() {
    return (
      <InputGroup className="mb-3">
        <DropdownButton variant="outline-secondary" title="Search in...">
          <Dropdown.Item>People</Dropdown.Item>
          <Dropdown.Item>Films</Dropdown.Item>
          <Dropdown.Item>Starships</Dropdown.Item>
          <Dropdown.Item>Vehicles</Dropdown.Item>
          <Dropdown.Item>Species</Dropdown.Item>
          <Dropdown.Item>Planets</Dropdown.Item>
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" />
      </InputGroup>
    );
  }
}

export default SearchInput;
