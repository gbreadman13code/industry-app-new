import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({
  paddingVertical = 16,
  paddingHorizontal = 16,
  backgroundColor,
  borderColor,
  children,
  onClick,
  disactive,
}) => {
  return (
    <TouchableOpacity
      disabled={disactive}
      style={
        disactive
          ? [
              styles.button_disactive,
              {
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal,
                backgroundColor: backgroundColor
                  ? backgroundColor
                  : "transparent",
                borderColor: borderColor ? borderColor : "#43464A",
              },
            ]
          : [
              styles.button,
              {
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal,
                backgroundColor: backgroundColor ? backgroundColor : "#E7E453",
                borderColor: borderColor ? borderColor : "#E7E453",
              },
            ]
      }
      onPress={onClick}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E7E453",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E7E453",
  },
  button_disactive: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#43464A",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  text_disactive: {
    color: "#43464A",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
