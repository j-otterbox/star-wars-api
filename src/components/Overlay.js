import "./Overlay.css";

function Overlay(props) {
  return (
    <div className={`overlay ${props.isLoading ? "overlay-on" : ""}`}>
      {props.children}
    </div>
  );
}

export default Overlay;
