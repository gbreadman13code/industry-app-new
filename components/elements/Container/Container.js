import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Container = ({ children }) => {
  return (
    <View
      style={{
        paddingRight: 16,
        paddingLeft: 16,
      }}
    >
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({});
