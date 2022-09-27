import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Container, Row, Col, Table, Pagination, Alert } from "react-bootstrap";
import SWAPIClient from "./SWAPIClient";
import SearchInput from "./components/SearchInput";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import "./App.css";

const App = () => {
  const [tableType, setTableType] = useState("people");
  const [tableData, setTableData] = useState([]);
  const [tableVisible, setTableVisibility] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [alertVisible, setAlertVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [paginationVisible, setPaginationVisiblity] = useState(true);

  useEffect(() => {
    renderCacheData();
  }, []);

  async function renderCacheData() {
    let cachedData = JSON.parse(localStorage.getItem("cache"));

    console.log("on load:", cachedData);

    if (!cachedData || isExpired(cachedData.expirationDate)) {
      console.log("no cached data, create a new one");

      setIsLoading(true);
      const results = await SWAPIClient.getPage(tableType, pageIndex);
      setIsLoading(false);

      if (Array.isArray(results)) {
        cachedData = {
          results,
          expirationDate: getExpirationDate(),
        };
        localStorage.setItem("cache", JSON.stringify(cachedData));
        renderDefaultTable(cachedData.results);
      } else {
        renderErrorAlert();
      }
    } else {
      renderDefaultTable(cachedData.results);
    }
  }

  function isExpired(expirationDate) {
    // console.log("checking expiration", date);

    //console.log(today, date);

    // const today = new Date(
    //   "Thu Sep 25 2022 23:23:01 GMT-0700 (Pacific Daylight Time)"
    // );

    const today = new Date();

    const expiryDate = new Date(expirationDate);

    console.log(expiryDate);

    console.log(expiryDate, today);

    console.log(today < expiryDate);
    // return ;
  }

  function getExpirationDate() {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 3));
  }

  function renderDefaultTable(cachedData) {
    setTableType(tableType);
    setTableData(cachedData);
    setTableVisibility(true);
  }

  function renderErrorAlert() {
    setTableVisibility(false);
    setAlertVariant("danger");
    setAlertText("Uh-oh, something went wrong...");
    setAlertVisibility(true);
  }

  function renderNoResultsAlert() {
    setAlertVariant("secondary");
    setAlertText("No Results...");
    setAlertVisibility(true);
  }

  const searchQuerySubmitHandler = async (category, queryStr) => {
    // clear previous table data when needed
    if (tableData.length > 0) setTableData([]);
    setTableType(category);
    setTableVisibility(true);
    setPaginationVisiblity(false);

    // trigger loading spinner while waiting for response
    setIsLoading(true);
    const results = await SWAPIClient.get(category, queryStr);
    setIsLoading(false);

    searchResultsHandler(results);
  };

  function searchResultsHandler(results) {
    if (Array.isArray(results)) {
      if (results.length > 0) {
        setAlertVisibility(false); // hide any prev alerts after successful requests
        setTableData(results);
      } else {
        renderNoResultsAlert();
      }
    } else {
      renderErrorAlert();
    }
  }

  async function paginationNavBtnClickHandler(btnClicked) {
    // update nav index
    let newIndex;
    if (btnClicked === "next") newIndex = pageIndex + 1;
    else if (btnClicked === "prev") newIndex = pageIndex - 1;
    setPageIndex(newIndex);

    // get new page data
    setIsLoading(true);
    const results = await SWAPIClient.getPage(tableType, newIndex);
    setIsLoading(false);

    // render that data
    if (Array.isArray(results)) {
      setTableData(results);
    } else {
      renderErrorAlert();
    }
  }

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
                      return (
                        <TableRow
                          key={elem.name || elem.title}
                          type={tableType}
                          data={elem}
                        />
                      );
                    })}
                  </tbody>
                </Table>
                <Alert
                  className={alertVisible ? "" : "hidden"}
                  variant={alertVariant}
                >
                  {alertText}
                </Alert>
                <Pagination className={paginationVisible ? "" : "hidden"}>
                  <Pagination.Prev
                    className={pageIndex > 1 ? "" : "hidden"}
                    onClick={() => paginationNavBtnClickHandler("prev")}
                  />
                  <Pagination.Item>{pageIndex}</Pagination.Item>
                  <Pagination.Next
                    className={tableData.length < 10 ? "hidden" : ""}
                    onClick={() => paginationNavBtnClickHandler("next")}
                  />
                </Pagination>
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
