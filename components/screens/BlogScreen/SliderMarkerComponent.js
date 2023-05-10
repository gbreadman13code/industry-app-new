import React from "react";
import { View } from "react-native";
import { MarkerProps } from "react-native-a11y-slider";

function SliderMarkerComponent({ color }) {
  return (
    <View
      style={{
        width: 15,
        height: 15,
        backgroundColor: "#fff",
        borderWidth: 3,
        borderColor: "#B34382",
        borderRadius: 50,
      }}
    ></View>
  );
}
SliderMarkerComponent.size = 15;
export default SliderMarkerComponent;
