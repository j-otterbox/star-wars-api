import React from "react";

class TableRow extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <tr>
        <td>Anakin Skywalker</td>
        <td>19BBY</td>
        <td>6'0"</td>
        <td>180lbs</td>
        <td>Human</td>
        <td>Tatooine</td>
      </tr>
    );
  }
}

export default TableRow;
