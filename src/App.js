import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Table, Pagination, Alert } from "react-bootstrap";
import SWAPIClient from "./SWAPIClient";
import { getCache, refreshCache, isExpired } from "./cache";
import ProjectHeader from "./components/ProjectHeader";
import SearchInput from "./components/SearchInput";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import LoadingOverlay from "./components/LoadingOverlay";
import "./App.css";

const App = () => {
  const [tableType, setTableType] = useState("people");
  const [tableData, setTableData] = useState([]);
  const [tableVisible, setTableVisibility] = useState(true);

  const [alertText, setAlertText] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [alertVisible, setAlertVisibility] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const [paginationVisible, setPaginationVisiblity] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState("cache");

  useEffect(() => {
    if (dataSource === "cache" && tableData.length === 0) {
      renderCacheData();
    }
  }, [tableData]); // eslint-disable-line

  async function renderCacheData() {
    let cache = getCache();

    if (!cache || isExpired(cache.expirationDate)) {
      setIsLoading(true);
      const response = await SWAPIClient.getPage("people", 1);
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
    setDataSource("cache");
    setTableType("people");
    setTableData(cache.data);
    setPaginationVisiblity(true);
    setAlertVisibility(false);
  }

  async function searchQuerySubmitHandler(category, queryStr) {
    setAlertVisibility(false);
    setPaginationVisiblity(false);

    setIsLoading(true);
    const response = await SWAPIClient.get(category, queryStr);
    setIsLoading(false);

    setDataSource("api");
    setTableType(category);
    setTableVisibility(true);

    if (Array.isArray(response)) {
      if (response.length > 0) {
        setTableData(response);
      } else {
        setTableData([]);
        renderNoResultsAlert();
      }
    } else {
      setTableData([]);
      renderErrorAlert(response);
    }
  }

  function renderNoResultsAlert() {
    setAlertVariant("secondary");
    setAlertText("No Results...");
    setAlertVisibility(true);
    setPaginationVisiblity(false);
  }

  function renderErrorAlert(errorMsg) {
    setAlertVariant("danger");
    setAlertText(errorMsg);
    setAlertVisibility(true);
    setPaginationVisiblity(false);
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

  function onCancelBtnClick() {
    // trigger cache data to be loaded
    setDataSource("cache");
    setTableData([]);
    setPageIndex(1);
  }

  return (
    <Fragment>
      <main>
        <Container>
          <Row>
            <Col>
              <ProjectHeader />
              <section className="section">
                <SearchInput
                  dataSource={dataSource}
                  onSearchQuerySubmit={searchQuerySubmitHandler}
                  onCancelBtnClick={onCancelBtnClick}
                />
                <Table
                  className={tableVisible ? "" : "hidden"}
                  variant="dark"
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
      <LoadingOverlay isLoading={isLoading} />
    </Fragment>
  );
};

export default App;
