/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import "./Element.css";

const getBackgroundColor = (classification) => {
  switch (classification) {
    case "noble-gas":
      return "rgb(234, 218, 36)";
    case "diatomic-nonmetal":
      return "rgb(57, 165, 118)";
    case "alkali-metal":
      return "hsl(326, 52%, 84%)";
    case "hydrogen":
      return "rgb(163, 199, 210)";
    case "alkaline":
      return "rgb(235, 93, 11)";
    case "lanthanide":
      return "hsl(183, 54%, 84%)";
    case "actinide":
      return "hsl(82, 60%, 56%)";
    case "metalloid":
      return "hsl(142, 60%, 56%)";
    case "polyatomic-non-metal":
      return "rgb(20, 128, 136)";
    case "transition-metal":
      return "rgb(255, 227, 0)";
    case "post-transition-metals":
      return "rgb(91, 194, 234)";
    case "unknown":
      return "rgb(13, 173, 173)";
    default:
      return "transparent";
  }
};

const Element = ({ element }) => {
  const { atomicNumber, symbol, name, position, classification, isGap } =
    element;

  const backgroundColor = getBackgroundColor(classification);

  const elementStyle = {
    gridRow: position.row,
    gridColumn: position.column,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgroundColor,
    cursor: "pointer",
  };

  return (
    <li style={elementStyle} className="card">
      <div className="card-inner">
        {!element.isGap && (
          <div className="card-front">
            <span>{atomicNumber}</span>
            <abbr title={name}>{symbol}</abbr>
          </div>
        )}
       {!element.isGap && (<div className="card-back">
          <p>Big O</p>
        </div>)}
      </div>
    </li>
  );
};

export default Element;
