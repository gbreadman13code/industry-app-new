import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Like = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={20} fill="none">
    <Path
      fill="#B34382"
      fillRule="evenodd"
      d="m12.842 2.113-.53.515-.536-.52C10.368.809 8.778.157 7.02.157 3.405.156.456 3.088.456 6.7c0 1.825.326 3.116 1.378 4.556 1.083 1.483 2.943 3.135 6.088 5.62l.001.001 3.336 2.604m1.583-17.367c1.31-1.225 2.8-1.875 4.454-1.95l.328-.007C21.236.16 24.182 3.09 24.182 6.7c0 1.753-.301 3.009-1.248 4.374-.974 1.404-2.644 2.944-5.464 5.203h-.001l-1.154.915-.003.003-2.934 2.286a1.724 1.724 0 0 1-2.119 0M23.064 6.709l-.006.375c-.052 1.456-.423 2.611-1.51 3.956-1.054 1.304-2.79 2.799-5.546 4.974l-.002.002-3.309 2.582a.606.606 0 0 1-.744 0l-2.94-2.292-1.088-.86c-2.567-2.051-4.158-3.473-5.099-4.755-.974-1.328-1.246-2.5-1.246-3.992 0-2.995 2.45-5.425 5.446-5.425 1.861 0 3.466.875 4.867 2.584a.559.559 0 0 0 .868-.004c1.371-1.71 2.974-2.58 4.863-2.58 2.996 0 5.446 2.43 5.446 5.425v.01Z"
      clipRule="evenodd"
    />
    <Path
      fill="#B34382"
      d="M2.404 2.953c2.706-4.414 7.518-1.84 9.586 0l.322.363c.631-.806 2.667-2.481 5.76-2.74 3.867-.321 4.712 2.9 5.558 5.64.677 2.19-.765 4.564-1.57 5.478l-9.385 7.612h-1.088L2.404 11.25c-1.128-.926-2.707-3.882 0-8.297Z"
    />
  </Svg>
);
export default Like;