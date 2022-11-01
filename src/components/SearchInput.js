import { useState } from "react";
import {
  InputGroup,
  Button,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import "./SearchInput.css";

const SearchInput = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchQuerySubmitHandler = (category) => {
    if (searchQuery) {
      props.onSearchQuerySubmit(category, searchQuery);
    }
  };

  const cancelBtnClickHandler = () => {
    setSearchQuery("");
    props.onCancelBtnClick();
  };

  return (
    <InputGroup className="search-input-group mb-5">
      <DropdownButton
        variant="primary"
        title="Search in..."
        onSelect={searchQuerySubmitHandler}
        disabled={!searchQuery}
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
      <Button
        variant="danger"
        onClick={cancelBtnClickHandler}
        disabled={props.dataSource === "cache"}
      >
        Cancel
      </Button>
    </InputGroup>
  );
};

export default SearchInput;
