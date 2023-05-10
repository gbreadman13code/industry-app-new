import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import AllMediaScreen from "./AllMediaScreen";
import ArticleProfile from "./ArticleProfile";
import ArticleProfileInAllMediaScreen from "./ArticleProfileInAllMediaScreen";
import { useNavigationState } from "@react-navigation/native";

const AllMediaScreenContainer = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator
        initialRouteName="AllMediaScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AllMediaScreen" component={AllMediaScreen} />
        <Stack.Screen
          name="ArticleProfileInAllMediaScreen"
          component={ArticleProfileInAllMediaScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AllMediaScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
    // marginBottom: 50,
  },
});
