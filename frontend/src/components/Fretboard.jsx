import React from "react";

const Fretboard = (props) => {
  const drawSeparators = (spacing) => {
    let separators = [];
    let posX = 85;
    for (let sep = 0; sep <= props.frets; sep++) {
      separators.push(
        <rect
          key={sep}
          x={String(posX)}
          y="35"
          width="5"
          height={
            {
              6: "210",
              7: "250",
              8: "290",
            }[props.strings]
          }
          fill={sep === 0 ? "black" : "gray"}
          stroke="grey"
          strokeWidth="1"
        ></rect>
      );
      posX += spacing;
    }
    return separators.map((item) => item);
  };

  const drawMarkers = (spacing) => {
    const positions = [1, 3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    let markers = [];
    let posX = 220;
    positions.forEach((element) => {
      markers.push(
        <circle
          r="10"
          cx={String(posX + element * 40)}
          cy="275"
          fill="lightgrey"
          stroke="none"
        ></circle>
      );
    });
    return markers;
  };

  const drawStrings = (spacing) => {
    let strings = [];
    let posX = 20;
    for (let string = 0; string < props.strings; string++) {
      strings.push(
        <g transform={`translate(0, ${posX})`}>
          <line
            x1="90"
            y1="20"
            x2={
              {
                22: "1640",
                24: "1780",
              }[props.frets]
            }
            y2="20"
            stroke="white"
            stroke-width="2"
          ></line>
        </g>
      );
      posX += spacing;
    }
    return strings;
  };

  return (
    <div className="Fretboard">
      <svg className="Container" width="2000" height="400">
        <g transform="translate(0, 0) scale(1, 1)">
          <g>{drawSeparators(70)}</g>
          <g>{drawStrings(40)}</g>
        </g>
      </svg>
    </div>
  );
};

export default Fretboard;
