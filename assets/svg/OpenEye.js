import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
const OpenEye = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={15} fill="none">
    <Path
      stroke="#fff"
      strokeWidth={0.74}
      d="M11.97 1.308C5.801 1.308 1.984 5.75.89 7.218a.769.769 0 0 0 0 .93c1.093 1.468 4.91 5.916 11.078 5.916 6.54 0 10.04-4.538 10.978-5.96a.76.76 0 0 0 0-.842c-.938-1.421-4.44-5.954-10.978-5.954Z"
    />
    <Circle cx={11.879} cy={7.691} r={4.286} stroke="#fff" strokeWidth={0.74} />
    <Circle cx={11.879} cy={7.691} r={2.204} fill="#fff" />
  </Svg>
);
export default OpenEye;
