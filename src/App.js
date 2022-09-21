import { useState } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { Container, Row, Col, Table, Pagination, Alert } from "react-bootstrap";
import SearchInput from "./components/SearchInput";
import TableHeaders from "./components/TableHeaders";
import "./App.css";

const client = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 10000,
});

const App = () => {
  const [tableHeader, setTableHeader] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchQuerySubmitHandler = async (category, queryStr) => {
    // update table header
    setTableHeader(TableHeaders[category]);

    // in case of request failure
    const controller = new AbortController();
    client.signal = controller.signal;

    const path = `${category}/?search=${encodeURIComponent(queryStr)}`;

    setIsLoading(true);
    const results = await client
      .get(path)
      .then((resp) => {
        setError(false);
        return resp.data.results;
      })
      .catch((err) => {
        controller.abort();
        setError(true);
      });
    setIsLoading(false);

    // setTableType(tableCols[category]);
    setTableData(results);
  };
  return (
    <>
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
                <Alert className={error ? "" : "hidden"} variant="danger">
                  Uh-oh, something went wrong...
                </Alert>
                <Table className={error ? "hidden" : ""} striped bordered hover>
                  <thead>
                    <tr>{tableHeader}</tr>
                  </thead>
                  <tbody></tbody>
                </Table>
                {/* <Pagination>
                  <Pagination.Prev />
                  <Pagination.Item>{1}</Pagination.Item>
                  <Pagination.Next />
                </Pagination> */}
              </section>
            </Col>
          </Row>
        </Container>
      </main>
      <div className={isLoading ? "overlay overlay-on" : "overlay"}>
        <ThreeCircles
          height="100"
          width="100"
          color="#2C8BCE"
          wrapperStyle={{}}
          wrapperClass=""
          visible={isLoading}
          ariaLabel="three-circles-rotating"
        />
      </div>
    </>
  );
};

export default App;
