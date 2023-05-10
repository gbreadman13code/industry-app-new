import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";

const HomeSreenSmallItem = ({ item, color }) => {
  const { width } = useWindowDimensions();
  return (
    <ImageBackground
      source={{ uri: item.file }}
      style={{
        width: (width - 20 - 10) / 2,
        height: (width - 20) * 0.46,
        justifyContent: "flex-end",
      }}
    >
      <View style={[styles.blackLine, { borderLeftColor: color }]}>
        <Text style={styles.blackLineText}>{item.text}</Text>
      </View>
    </ImageBackground>
  );
};

export default HomeSreenSmallItem;

const styles = StyleSheet.create({
  blackLine: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderLeftWidth: 5,
  },
  blackLineText: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 20,
  },
});
