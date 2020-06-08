import React, { useState, useEffect } from "react";

const Fretboard = (props) => {

  useEffect(() => {
    console.log(props)
  }, []);

  const fretboardModel = {
    "El": [330, 349, 370, 392, 415, 466, 494, 523, 554, 587, 622, 659, 698, 740, 784, 831, 880, 932, 988, 1047, 1109, 1175, 1245, 1319],
    "Bl": [247, 262, 277, 294, 311, 330, 349, 370, 392, 415, 466, 494, 523, 554, 587, 622, 659, 698, 740, 784, 831, 880, 932, 988],
    "G":  [196, 208, 220, 233, 247, 262, 277, 294, 311, 330, 349, 370, 392, 415, 466, 494, 523, 554, 587, 622, 659, 698, 740, 784],
    "D":  [147, 156, 165, 175, 185, 196, 208, 220, 233, 247, 262, 277, 294, 311, 330, 349, 370, 392, 415, 466, 494, 523, 554, 587],
    "A":  [110, 117, 123, 131, 139, 147, 156, 165, 175, 185, 196, 208, 220, 233, 247, 262, 277, 294, 311, 330, 349, 370, 392, 415],
    "Eh": [82, 87, 92, 98, 104, 110, 117, 123, 131, 139, 147, 156, 165, 175, 185, 196, 208, 220, 233, 247, 262, 277, 294, 311, 330],
    "Bh": [62, 65, 69, 73, 78, 82, 87, 92, 98, 104, 110, 117, 123, 131, 139, 147, 156, 165, 175, 185, 196, 208, 220, 233, 247],
    "F#": [46, 49, 52, 55, 58, 62, 65, 69, 73, 78, 82, 87, 92, 98, 104, 110, 117, 123, 131, 139, 147, 156, 165, 175, 185]
  }

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

  // const drawMarkers = (spacing) => {
  //   const positions = [1, 3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
  //   let markers = [];
  //   let posX = 220;
  //   positions.forEach((element) => {
  //     markers.push(
  //       <circle
  //         r="10"
  //         cx={String(posX + element * 40)}
  //         cy="275"
  //         fill="lightgrey"
  //         stroke="none"
  //       ></circle>
  //     );
  //   });
  //   return markers;
  // };

  const drawStrings = (spacing) => {
    let strings = [];
    let posX = 20;
    for (let string = 0; string < props.strings; string++) {
      strings.push(
        <g key={string} transform={`translate(0, ${posX})`}>
          <line
            key={string}
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
            strokeWidth="2"
          ></line>
        </g>
      );
      posX += spacing;
    }
    return strings;
  };

  // const drawNote = () => {
  //   let positions = []
  // }

  return (
    <div className="Fretboard-Container">
      <svg className="Fretboard" width="2000" height="400">
        <g transform="translate(0, 0) scale(1, 1)">
          <g>{drawSeparators(70)}</g>
          <g>{drawStrings(40)}</g>
        </g>
      </svg>
    </div>
  );
};

export default Fretboard;
