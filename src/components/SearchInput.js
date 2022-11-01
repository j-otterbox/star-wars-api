import { useState } from "react";
import { InputGroup, Dropdown, DropdownButton, Form } from "react-bootstrap";
import "./SearchInput.css";

const SearchInput = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const searchQuerySubmitHandler = (category) => {
    if (searchQuery) {
      props.onSearchQuerySubmit(category, searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <InputGroup className="mb-5">
      <DropdownButton
        variant="primary"
        title="Search in..."
        onSelect={searchQuerySubmitHandler}
        disabled={isDisabled}
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
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter search terms here..."
      />
    </InputGroup>
  );
};

export default SearchInput;
