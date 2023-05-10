import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SortArrowUp = ({ fill }) => (
  <Svg width={8} height={14} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M3.5 13a.5.5 0 0 0 1 0h-1ZM4.354.646a.5.5 0 0 0-.708 0L.464 3.828a.5.5 0 1 0 .708.708L4 1.707l2.828 2.829a.5.5 0 1 0 .708-.708L4.354.646ZM4.5 13V1h-1v12h1Z"
      fill={fill}
    />
  </Svg>
);

export default SortArrowUp;
