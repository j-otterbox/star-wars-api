import React, { useState } from "react";
// import axios from "axios";
import SWAPIClient from "./SWAPIClient";
import { ThreeCircles } from "react-loader-spinner";
import { Container, Row, Col, Table, Pagination, Alert } from "react-bootstrap";
import SearchInput from "./components/SearchInput";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import "./App.css";

const App = () => {
  const [tableType, setTableType] = useState("people"); // for header components
  const [tableData, setTableData] = useState([]);
  const [tableVisible, setTableVisibility] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [alertVisible, setAlertVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchQuerySubmitHandler = async (category, queryStr) => {
    // clear previous table data when needed
    if (tableData.length > 0) setTableData([]);

    // trigger loading spinner while waiting for response
    setIsLoading(true);
    const response = await SWAPIClient.get(category, queryStr)
      .then((resp) => resp)
      .catch((err) => err);
    setIsLoading(false);

    // handle response
    if (response.status === 200) {
      setTableType(category);
      setTableVisibility(true);

      if (response.data.results.length > 0) {
        setAlertVisibility(false);
        setTableData(response.data.results);
      } else {
        setAlertVariant("secondary");
        setAlertText("No Results...");
        setAlertVisibility(true);
      }
    } else {
      setTableVisibility(false);
      setAlertVariant("danger");
      setAlertText("Uh-oh, something went wrong...");
      setAlertVisibility(true);
    }
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
                <Table
                  className={tableVisible ? "" : "hidden"}
                  striped
                  bordered
                  hover
                >
                  <thead>
                    <tr>
                      <TableHeader type={tableType} />
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((elem) => {
                      return <TableRow type={tableType} data={elem} />;
                    })}
                  </tbody>
                </Table>
                <Alert
                  className={alertVisible ? "" : "hidden"}
                  variant={alertVariant}
                >
                  {alertText}
                </Alert>
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
