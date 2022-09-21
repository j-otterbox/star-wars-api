import { useState } from "react";
import { Container, Row, Col, Table, Pagination } from "react-bootstrap";
import SearchInput from "./components/SearchInput";
import "./App.css";

const tableCols = {
  people: ["Name", "Birthdate", "Height", "Mass", "Species", "Homeworld"],
  films: ["Title", "Episode #", "Director", "Producer", "Release Date"],
  starships: ["Name", "Model", "Class", "Manufacturer", "Length", "Max Speed"],
  vehicles: ["Name", "Model", "Class", "Manufacturer", "Length", "Max Speed"],
  species: ["Name", "Class", "Designation", "Language", "Homeworld"],
  planets: [
    "Name",
    "Rotation Period",
    "Orbital Period",
    "Diameter",
    "Climate",
    "Gravity",
  ],
};

const App = () => {
  const [tableType, setTableType] = useState(tableCols.people);

  const searchQuerySubmitHandler = (category, searchQuery) => {
    // make the search here
    setTableType(tableCols[category]);

    // make the API call
  };

  return (
    <main>
      <Container>
        <Row>
          <Col>
            <header>
              <h1>Star Wars API</h1>
              <span>Built with React.js</span>
            </header>
            <section>
              <SearchInput onSearchQuerySubmit={searchQuerySubmitHandler} />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {tableType.map((col) => {
                      return <th key={col}>{col}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>{/* conditional rows */}</tbody>
              </Table>
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </section>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default App;
