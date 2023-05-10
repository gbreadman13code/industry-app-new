import * as React from "react";
import Svg, { Rect } from "react-native-svg";

const PauseButton = () => (
  <Svg width={18} height={17} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect y={0.459} width={2} height={16} rx={1} fill="#B34382" />
    <Rect x={12} y={0.459} width={2} height={16} rx={1} fill="#B34382" />
  </Svg>
);

export default PauseButton;
