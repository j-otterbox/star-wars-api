import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Table, Pagination, Alert } from "react-bootstrap";
import SWAPIClient from "./SWAPIClient";
import { getCache, refreshCache, isExpired } from "./cache";
import ProjectHeader from "./components/ProjectHeader";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import LoadingOverlay from "./components/LoadingOverlay";
import "./App.css";

const App = () => {
  const [tableType, setTableType] = useState("people");
  const [tableData, setTableData] = useState([]);

  const [alertText, setAlertText] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [alertVisible, setAlertVisibility] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [paginationVisible, setPaginationVisiblity] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState("cache");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (dataSource === "cache" && tableData.length === 0) {
      renderCacheData();
    }
  }, [tableData]); // eslint-disable-line

  async function renderCacheData() {
    let cache = getCache();

    if (!cache || isExpired(cache.expirationDate)) {
      setIsLoading(true);
      const response = await SWAPIClient.get("https://swapi.dev/api/people/");
      setIsLoading(false);

      if (response.status === 200) {
        refreshCache(response.data);
        cache = getCache();
      } else {
        // renderErrorAlert(response);
        renderAlert("danger", response);
        return;
      }
    }

    // cache exists or has been created/refreshed
    setDataSource("cache");
    setCount(cache.data.count);
    setTableType("people");
    setTableData(cache.data.results);
    setPrevPage(cache.data.previous);
    setNextPage(cache.data.next);
    setPageIndex(1);
    setPaginationVisiblity(true);
    setAlertVisibility(false);
  }

  async function searchQuerySubmitHandler(category, searchParam) {
    setAlertVisibility(false);

    setIsLoading(true);
    const response = await SWAPIClient.get("https://swapi.dev/api/", category, {
      search: searchParam,
    });
    setIsLoading(false);

    // set these values regardless of any response properties`
    setDataSource("api");
    setTableType(category);

    if (response.status === 200) {
      setCount(response.data.count);
      setTableData(response.data.results);
      setPrevPage(response.data.previous);
      setNextPage(response.data.next);

      if (response.data.results.length === 0) {
        renderAlert("secondary", "No Results...");
      } else {
        setPageIndex(1);
        setPaginationVisiblity(true);
      }
    } else {
      setTableData([]);
      // renderErrorAlert(response);
      renderAlert("danger", response);
    }
  }

  async function paginationNavBtnClickHandler(btnClicked) {
    let url;
    let newIndex;

    if (btnClicked === "next") {
      newIndex = pageIndex + 1;
      url = nextPage;
    } else if (btnClicked === "prev") {
      newIndex = pageIndex - 1;
      url = prevPage;
    }

    // get new page data
    setIsLoading(true);
    const response = await SWAPIClient.get(url);
    setIsLoading(false);

    setDataSource("api"); // always set regardless of response

    if (response.status === 200) {
      setTableData(response.data.results);
      setPrevPage(response.data.previous);
      setNextPage(response.data.next);
      setPageIndex(newIndex);
    } else {
      setTableData([]);
      // renderErrorAlert(response);
      renderAlert("danger", response);
    }
  }

  function renderAlert(variant, text) {
    setAlertVariant(variant);
    setAlertText(text);
    setAlertVisibility(true);
    setPaginationVisiblity(false);
  }

  function onCancelBtnClick() {
    // trigger cache data to be loaded in useEffect
    setDataSource("cache");
    setTableData([]);
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
                <SearchResults
                  data={{ count, pageIndex, alertVariant, alertVisible }}
                />
                <Table variant="dark" striped bordered hover>
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
                    className={prevPage ? "" : "hidden"}
                    onClick={() => paginationNavBtnClickHandler("prev")}
                  />
                  <Pagination.Item>{pageIndex}</Pagination.Item>
                  <Pagination.Next
                    className={nextPage ? "" : "hidden"}
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
