import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ProfileSvg = ({ fill }) => (
  <Svg width={15} height={19} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M7.5 10.298c4.187 0 7.047 1.907 7.047 4.879 0 2.092-1.392 3.252-3.253 3.252H3.706c-1.86 0-3.252-1.16-3.252-3.252 0-2.972 2.86-4.879 7.046-4.879Zm0 2.168c-3.13 0-4.878 1.165-4.878 2.71 0 .799.343 1.085 1.084 1.085h7.588c.742 0 1.085-.286 1.085-1.084 0-1.546-1.748-2.71-4.879-2.71ZM7.5 0a4.336 4.336 0 1 1 0 8.672A4.336 4.336 0 0 1 7.5 0Zm0 2.168a2.168 2.168 0 1 0 0 4.336 2.168 2.168 0 0 0 0-4.336Z"
      fill={fill}
    />
  </Svg>
);

export default ProfileSvg;
