import { useState } from "react";
import axios from "axios";
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

const client = axios.create({
  baseURL: "https://swapi.dev/api/",
});

const App = () => {
  const [tableType, setTableType] = useState(tableCols.people);

  const getData = async (path) => {
    const data = await client.get(path);
    return data;
  };

  const searchQuerySubmitHandler = async (category, queryStr) => {
    const path = `${category}/?search=${encodeURIComponent(queryStr)}`;
    const data = await getData(path);

    console.log(data);

    setTableType(tableCols[category]);
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
