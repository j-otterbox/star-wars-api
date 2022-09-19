import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  Dropdown,
  DropdownButton,
  Form,
  Pagination,
} from "react-bootstrap";
import "./App.css";

function App() {
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
              <InputGroup className="mb-3">
                <DropdownButton
                  variant="outline-secondary"
                  title="Search in..."
                >
                  <Dropdown.Item>People</Dropdown.Item>
                  <Dropdown.Item>Films</Dropdown.Item>
                  <Dropdown.Item>Starships</Dropdown.Item>
                  <Dropdown.Item>Vehicles</Dropdown.Item>
                  <Dropdown.Item>Species</Dropdown.Item>
                  <Dropdown.Item>Planets</Dropdown.Item>
                </DropdownButton>
                <Form.Control aria-label="Text input with dropdown button" />
              </InputGroup>
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
                  <tr>
                    <td>Anakin Skywalker</td>
                    <td>19BBY</td>
                    <td>6'0"</td>
                    <td>180lbs</td>
                    <td>Human</td>
                    <td>Tatooine</td>
                  </tr>
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
}

export default App;
