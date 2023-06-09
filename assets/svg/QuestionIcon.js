import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const QuestionIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
    <Circle
      cx={10.077}
      cy={9.587}
      r={9.049}
      stroke="#C7CBC9"
      strokeWidth={0.728}
    />
    <Path
      fill="#C7CBC9"
      d="M9.932 14.402a.887.887 0 0 1-.654-.261.932.932 0 0 1-.261-.667c0-.253.087-.467.261-.641a.865.865 0 0 1 .654-.275.85.85 0 0 1 .64.275.85.85 0 0 1 .276.64.908.908 0 0 1-.275.667.871.871 0 0 1-.64.262Zm.64-3.047H9.214V9.46a3.956 3.956 0 0 0 1.595-.666c.462-.332.693-.72.693-1.164 0-.419-.157-.745-.47-.98-.314-.245-.737-.367-1.269-.367-.767 0-1.53.248-2.288.745V5.785c.697-.514 1.539-.771 2.524-.771.828 0 1.525.226 2.092.68.575.453.863 1.067.863 1.843 0 .637-.236 1.181-.706 1.635a4.117 4.117 0 0 1-1.674.98v1.203Z"
    />
  </Svg>
);
export default QuestionIcon;
