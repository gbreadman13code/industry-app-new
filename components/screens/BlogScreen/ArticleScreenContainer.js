import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TransitionSpecs } from "@react-navigation/stack";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import ArticlesScreen from "./ArticlesScreen";
import ArticleProfile from "./ArticleProfile";
import { SafeAreaView } from "react-native";

const ArticleScreenContainer = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator
        initialRouteName="ArticleScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ArticleScreen" component={ArticlesScreen} />
        <Stack.Screen
          name="ArticleProfile"
          options={{
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
              mode: "modal",
            },
          }}
          component={ArticleProfile}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default ArticleScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
