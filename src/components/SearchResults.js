import "./SearchResults.css";

const SearchResults = (props) => {
  let currRange;

  // ranges are based on the default response size of 10
  if (props.data.count <= 10) {
    currRange = `Showing ${props.data.count} of ${props.data.count}`;
  } else {
    const lowerBound = (props.data.pageIndex - 1) * 10 + 1;

    if (props.data.count - lowerBound <= 10) {
      currRange = `Showing ${lowerBound}-${props.data.count} of ${props.data.count}`;
    } else {
      currRange = `Showing ${lowerBound}-${lowerBound + 9} of ${
        props.data.count
      }`;
    }
  }

  return (
    <ul
      className={`search-results__container ${
        props.data.alertVariant === "danger" && props.data.alertVisible
          ? "hidden"
          : ""
      }`}
    >
      <span>
        {props.data.count} Result{props.data.count !== 1 ? "s" : ""} Found
      </span>
      <span>{currRange}</span>
    </ul>
  );
};

export default SearchResults;
