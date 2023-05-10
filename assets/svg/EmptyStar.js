import * as React from "react";
import Svg, { Path } from "react-native-svg";

const EmptyStar = ({ marginRight = 7 }) => (
  <Svg
    width={23}
    height={22}
    style={{ marginRight: marginRight }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="m11.384 2.02 2.595 5.932.115.262.284.034 6.747.81-5.014 4.314-.225.195.063.29 1.459 6.71-5.724-3.25-.244-.14-.246.138-5.835 3.253 1.565-6.703.07-.298-.234-.198-5.118-4.31 6.854-.811.29-.034.113-.27 2.485-5.923Z"
      stroke="#43464A"
    />
  </Svg>
);

export default EmptyStar;
