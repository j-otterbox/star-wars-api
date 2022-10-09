import "./Overlay.css";

function Overlay(props) {
  return (
    <div className={props.isLoading ? "overlay overlay-on" : "overlay"}>
      {props.children}
    </div>
  );
}

export default Overlay;
