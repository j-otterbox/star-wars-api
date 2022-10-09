import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { ThreeCircles } from "react-loader-spinner";
import Overlay from "./Overlay";

function LoadingOverlay(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Overlay isLoading={props.isLoading}>
          <ThreeCircles
            height="100"
            width="100"
            color="#2C8BCE"
            wrapperStyle={{}}
            wrapperClass=""
            visible={props.isLoading}
            ariaLabel="three-circles-rotating"
          />
        </Overlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
}

export default LoadingOverlay;
