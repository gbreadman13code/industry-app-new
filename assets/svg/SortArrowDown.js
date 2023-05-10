import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SortArrowDown = ({ fill }) => (
  <Svg width={8} height={14} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M4.5 1a.5.5 0 0 0-1 0h1Zm-.854 12.354a.5.5 0 0 0 .708 0l3.182-3.182a.5.5 0 0 0-.708-.708L4 12.293 1.172 9.464a.5.5 0 1 0-.708.708l3.182 3.182ZM3.5 1v12h1V1h-1Z"
      fill={fill}
    />
  </Svg>
);

export default SortArrowDown;
