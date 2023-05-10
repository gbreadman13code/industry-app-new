import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import PartnersList from "./PartnersList";
import PartnerProfile from "./PartnerProfile";

const PartnersScreenContainer = () => {
  const Stack = createNativeStackNavigator();

  const state = useNavigationState((state) => state.routes);

  return (
    <Stack.Navigator
      initialRouteName="PartnersList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="PartnersList"
        component={PartnersList}
        initialParams={{ defaultCategory: state }}
      />
      <Stack.Screen name="Partner" component={PartnerProfile} />
    </Stack.Navigator>
  );
};

export default PartnersScreenContainer;

const styles = StyleSheet.create({});
