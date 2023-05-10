import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React from "react";

const ChoosePushScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: 100, height: 100, backgroundColor: "#fff" }}>
        <Text>ChoosePushScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChoosePushScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    color: "#fff",
  },
});
