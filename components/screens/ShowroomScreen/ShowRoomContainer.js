import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowroomScreen from "./ShowroomScreen";
import ProductProfile from "./ProductProfile";
import "react-native-gesture-handler";
import SellerProfile from "./SellerProfile";

const ShowRoomContainer = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="ShopList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ShopList" component={ShowroomScreen} />
      <Stack.Screen name="Product" component={ProductProfile} />
      <Stack.Screen name="Seller" component={SellerProfile} />
    </Stack.Navigator>
  );
};

export default ShowRoomContainer;

const styles = StyleSheet.create({});
