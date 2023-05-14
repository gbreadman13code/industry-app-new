import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import ArrowBack from "../../../assets/svg/ArrowBack";

const BackButton = ({ navigate, callback }) => {
  const backButtonPressHandler = () => {
    navigate();
    callback && callback();
  };
  return (
    <TouchableOpacity onPress={backButtonPressHandler} style={styles.button}>
      <ArrowBack />
      <Text style={styles.text}>Назад</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 18,
  },
  text: {
    color: "#464A88",
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "Geometria-Bold",
  },
});
