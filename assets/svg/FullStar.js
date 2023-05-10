import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FullStar = ({ marginRight = 7 }) => (
  <Svg
    width={23}
    height={22}
    style={{ marginRight: marginRight }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="m11.5.751 3.063 7 7.875.947-5.874 5.053 1.696 7.804-6.697-3.803-6.822 3.803 1.822-7.803-6-5.054 8-.947 2.938-7Z"
      fill="#E7E453"
    />
  </Svg>
);

export default FullStar;
