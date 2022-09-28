import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Container, Row, Col, Table, Pagination, Alert } from "react-bootstrap";
import SWAPIClient from "./SWAPIClient";
import { getCache, refreshCache, isExpired } from "./cache";
import SearchInput from "./components/SearchInput";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import "./App.css";

const App = () => {
  const [tableType, setTableType] = useState("people");
  const [tableData, setTableData] = useState([]);
  const [tableVisible, setTableVisibility] = useState(true);
  const [alertText, setAlertText] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [alertVisible, setAlertVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [paginationVisible, setPaginationVisiblity] = useState(false);

  useEffect(() => {
    renderCacheData();
  }, []); // eslint-disable-line

  async function renderCacheData() {
    let cache = getCache();

    if (!cache || isExpired(cache.expirationDate)) {
      setIsLoading(true);
      const response = await SWAPIClient.getPage(tableType, pageIndex);
      setIsLoading(false);

      if (Array.isArray(response)) {
        refreshCache(response);
        cache = getCache();
      } else {
        renderErrorAlert(response);
        return;
      }
    }

    // cache exists or has been created/refreshed
    setTableData(cache.data);
    setPaginationVisiblity(true);
  }

  async function searchQuerySubmitHandler(category, queryStr) {
    // hide previous table entries or alerts
    if (tableData.length > 0) setTableData([]);
    setAlertVisibility(false);
    setPaginationVisiblity(false);

    // show table header before loading data
    setTableType(category);
    setTableVisibility(true);

    // get data
    setIsLoading(true);
    const response = await SWAPIClient.get(category, queryStr);
    setIsLoading(false);

    // finally, handle response
    if (Array.isArray(response)) {
      if (response.length > 0) {
        setTableData(response);
      } else {
        renderNoResultsAlert();
      }
    } else {
      renderErrorAlert(response);
    }
  }

  function renderNoResultsAlert() {
    setAlertVariant("secondary");
    setAlertText("No Results...");
    setAlertVisibility(true);
  }

  function renderErrorAlert(errorMsg) {
    setAlertVariant("danger");
    setAlertText(errorMsg);
    setAlertVisibility(true);
  }

  async function paginationNavBtnClickHandler(btnClicked) {
    // update nav index
    let newIndex;
    if (btnClicked === "next") newIndex = pageIndex + 1;
    else if (btnClicked === "prev") newIndex = pageIndex - 1;
    setPageIndex(newIndex);

    // get new page data
    setIsLoading(true);
    const response = await SWAPIClient.getPage(tableType, newIndex);
    setIsLoading(false);

    // render the response
    if (Array.isArray(response)) {
      setTableData(response);
    } else {
      renderErrorAlert(response);
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
