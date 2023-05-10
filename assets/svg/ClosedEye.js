import * as React from "react";
import Svg, { Mask, Path, G, Circle } from "react-native-svg";
const SvgComponent = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={31} height={30} fill="none">
    <Mask
      id="a"
      width={31}
      height={30}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Path
        fill="#D9D9D9"
        d="m17.597.692 5.528 6.589-17.03 14.29-5.53-6.589zM25.374 8.636l5.303 6.382-17.03 14.29-5.205-6.202 16.932-14.47Z"
      />
    </Mask>
    <G stroke="#fff" strokeWidth={0.74} mask="url(#a)">
      <Path d="M15.26 7.948c-6.167 0-9.984 4.442-11.078 5.91a.769.769 0 0 0 0 .93c1.093 1.468 4.91 5.916 11.078 5.916 6.54 0 10.04-4.538 10.978-5.96a.76.76 0 0 0 0-.842c-.938-1.422-4.44-5.954-10.978-5.954Z" />
      <Circle cx={15.17} cy={14.331} r={4.286} />
      <Circle cx={15.17} cy={14.331} r={1.834} fill="#fff" />
    </G>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      d="M26.191 5.144c-.846.771-13.296 10.847-22.101 18.597"
    />
  </Svg>
);
export default SvgComponent;
