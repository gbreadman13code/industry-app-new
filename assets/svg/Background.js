import * as React from "react";
import Svg, { Mask, Circle, G, Path } from "react-native-svg";
const Background = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={375} height={365} fill="none">
    <Mask
      id="a"
      width={1142}
      height={1142}
      x={-406}
      y={158}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Circle
        cx={165.071}
        cy={728.7}
        r={569.94}
        fill="#D9D9D9"
        stroke="#55A290"
        strokeWidth={1.371}
      />
    </Mask>
    <G stroke="#55A290" strokeWidth={0.992} mask="url(#a)">
      <Path d="M-3.45 272.86h-.495v17.548h-6.847v-23.381H22.29l3.44 6.426v16.955h-6.854V272.86H10.89v17.548H4.042V272.86H-3.45ZM-10.687 257.577h28.088l3.123 5.834h-31.21v-5.834ZM119.297 272.86h-.496v17.548h-6.847V267.026h33.082l3.44 6.426v16.956h-6.853V272.86H133.635v17.548h-6.847V272.86H119.297ZM112.058 257.576h28.089l3.122 5.834h-31.211v-5.834ZM-3.45 170.236h-.495v17.548h-6.847v-23.381H22.29l3.44 6.426v16.955h-6.854v-17.548H10.89v17.548H4.042v-17.548H-3.45ZM-10.687 154.952h28.088l3.123 5.834h-31.21v-5.834ZM119.297 170.236h-.496v17.548h-6.847V164.402h33.082l3.44 6.426v16.956h-6.853v-17.548H133.635v17.548h-6.847v-17.548H119.297ZM112.058 154.951h28.089l3.122 5.834h-31.211v-5.834ZM-10.687 360.203h28.088l3.123 5.834h-31.21v-5.834ZM112.058 360.203h28.089l3.122 5.834h-31.211v-5.834ZM57.922 221.55h-.496v17.547h-6.847v-23.381H83.66l3.44 6.426v16.955h-6.853V221.55H72.26v17.547h-6.847V221.55H57.922ZM50.684 206.265h28.089l3.122 5.834h-31.21v-5.834ZM57.922 324.175h-.496v17.547h-6.847v-23.381H83.66l3.44 6.426v16.955h-6.853v-17.547H72.26v17.547h-6.847v-17.547H57.922ZM50.684 308.89h28.089l3.122 5.834h-31.21v-5.834ZM251.897 272.862h-.496v17.548h-6.847v-23.381h33.082l3.44 6.426v16.955h-6.853v-17.548H266.235v17.548h-6.846v-17.548H251.897ZM244.659 257.578h28.088l3.122 5.834h-31.21v-5.834ZM374.639 272.862h-.495v17.548h-6.847v-23.381h33.082l3.439 6.426v16.955h-6.853v-17.548H388.978v17.548h-6.847v-17.548H374.639ZM367.401 257.578h28.088l3.123 5.834h-31.211v-5.834ZM251.897 170.235h-.496v17.548h-6.847v-23.381h33.082l3.44 6.426v16.955h-6.853v-17.548H266.235v17.548h-6.846v-17.548H251.897ZM244.659 154.951h28.088l3.122 5.834h-31.21v-5.834ZM374.639 170.235h-.495v17.548h-6.847v-23.381h33.082l3.439 6.426v16.955h-6.853v-17.548H388.978v17.548h-6.847v-17.548H374.639ZM367.401 154.951h28.088l3.123 5.834h-31.211v-5.834ZM244.66 360.203h28.088l3.122 5.834h-31.21v-5.834ZM367.401 360.203h28.088l3.123 5.834h-31.211v-5.834ZM189.012 221.549h-.495v17.548h-6.847v-23.381h33.082l3.439 6.426v16.955h-6.853v-17.548h-7.987v17.548h-6.847v-17.548H189.012ZM181.774 206.265h28.088l3.123 5.834h-31.211v-5.834ZM189.012 324.174h-.495v17.548h-6.847v-23.381h33.082l3.439 6.426v16.955h-6.853v-17.548h-7.987v17.548h-6.847v-17.548H189.012ZM181.774 308.89h28.088l3.123 5.834h-31.211v-5.834ZM313.266 221.55h-.496v17.547h-6.846v-23.381h33.082l3.439 6.426v16.955h-6.853V221.55H327.605v17.547h-6.847V221.55H313.266ZM306.028 206.265h28.088l3.123 5.834h-31.211v-5.834ZM313.266 324.175h-.496v17.548h-6.846v-23.381h33.082l3.439 6.426v16.955h-6.853v-17.548H327.605v17.548h-6.847v-17.548H313.266ZM306.028 308.891h28.088l3.123 5.833h-31.211v-5.833Z" />
    </G>
  </Svg>
);
export default Background;