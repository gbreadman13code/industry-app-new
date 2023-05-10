import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PlayButton = () => (
  <Svg width={21} height={25} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="m1.55 1.466 18.015 10.387a.7.7 0 0 1 0 1.213L1.549 23.453A.7.7 0 0 1 .5 22.847V2.072a.7.7 0 0 1 1.05-.606Z"
      stroke="#B34382"
    />
  </Svg>
);

export default PlayButton;
