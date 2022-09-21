import { useState } from "react";
import { InputGroup, Dropdown, DropdownButton, Form } from "react-bootstrap";

const SearchInput = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchQuerySubmitHandler = (category) => {
    if (searchQuery) {
      props.onSearchQuerySubmit(category, searchQuery);
      setSearchQuery("");
    }
  };

  const searchChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <InputGroup className="mb-5">
      <DropdownButton
        variant="outline-secondary"
        title="Search in..."
        onSelect={searchQuerySubmitHandler}
      >
        <Dropdown.Item eventKey="people">People</Dropdown.Item>
        <Dropdown.Item eventKey="films">Films</Dropdown.Item>
        <Dropdown.Item eventKey="starships">Starships</Dropdown.Item>
        <Dropdown.Item eventKey="vehicles">Vehicles</Dropdown.Item>
        <Dropdown.Item eventKey="species">Species</Dropdown.Item>
        <Dropdown.Item eventKey="planets">Planets</Dropdown.Item>
      </DropdownButton>
      <Form.Control
        value={searchQuery}
        onChange={searchChangeHandler}
        placeholder="Enter search terms here..."
      />
    </InputGroup>
  );
};

export default SearchInput;
