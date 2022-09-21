// import { useState } from "react";
import { Container, Row, Col, Table, Pagination } from "react-bootstrap";
import SearchInput from "./components/SearchInput";
import TableRow from "./components/TableRow";
import "./App.css";

const App = () => {
  // const [tableType, setTableType] = useState("");

  const searchQuerySubmitHandler = (category, searchQuery) => {
    console.log(category, searchQuery);
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
                    <th>Name</th>
                    <th>Birthdate</th>
                    <th>Height</th>
                    <th>Mass</th>
                    <th>Species</th>
                    <th>Homeworld</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow></TableRow>
                </tbody>
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
