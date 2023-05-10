import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Events from "./Events";

const HomeScreenContainer = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Events" component={Events} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
