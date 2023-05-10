import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "react-native";
import React, { useEffect, useRef } from "react";
import * as Linking from "expo-linking";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../HomeScreen/HomeScreen";
import BlogScreen from "../BlogScreen/BlogScreen";
import ShowroomScreen from "../ShowroomScreen/ShowroomScreen";
import PartnersScreenContainer from "../PartnersScreen/PartnersScreenContainer";
import BuscketScreen from "../ProfileScreen/ProfileScreenContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// import { ReactComponent as HomeIcon } from "../../../assets/img/icons/HomeIcon.svg";
import MyTabBar from "../../elements/TabBar/TabBar";
import ShowRoomContainer from "../ShowroomScreen/ShowRoomContainer";
import ProfileScreen from "../ProfileScreen/ProfileScreenContainer";
import ProfileScreenContainer from "../ProfileScreen/ProfileScreenContainer";
import HomeScreenContainer from "../HomeScreen/HomeScreenContainer";

const MainScreen = () => {
  const Tab = createBottomTabNavigator();
  const imgSize = { width: 20, height: 20 };

  const navigationRef = useRef(null);

  // exp://192.168.1.173:19000/--/screens/profile?=success_pay=true

  const handleDeepLink = (event) => {
    const url = event.url;
    const route = url.replace(/.*?:\/\//g, "");
    const routeName = route.split("/")[0];
    const params = route.split("/").slice(1).join("/");

    if (route.includes("media")) {
      navigationRef.current?.navigate("Медиа", { params });
    }
    if (route.includes("showroom")) {
      navigationRef.current?.navigate("Шоурум", { params });
    }
    if (route.includes("main")) {
      navigationRef.current?.navigate("Главная", { params });
    }
    if (route.includes("partners")) {
      navigationRef.current?.navigate("Партнеры", { params });
    }
    if (route.includes("profile")) {
      const params = { isSuccessPay: route.includes("success_pay=true") };
      navigationRef.current?.navigate("Профиль", params);
    }
  };

  // добавьте этот код для регистрации обработчика Deep Link
  useEffect(() => {
    if (!Linking) return;
    Linking.addEventListener("url", handleDeepLink);

    // return () => {
    //   Linking.removeEventListener("url", handleDeepLink);
    // };
  }, [Linking]);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "red" }}>
      <View
        style={{ backgroundColor: "#121212", flex: 1, position: "relative" }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "50%",
            backgroundColor: "#000",
          }}
        ></View>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaView
            style={{
              flex: 1,
              // backgroundColor: "#121212",
            }}
          >
            <StatusBar backgroundColor="#000" barStyle="light-content" />

            <Tab.Navigator
              initialRouteName="Главная"
              tabBar={(props) => <MyTabBar {...props} />}
            >
              <Tab.Screen
                name="Медиа"
                component={BlogScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Шоурум"
                component={ShowRoomContainer}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Главная"
                component={HomeScreenContainer}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Партнеры"
                component={PartnersScreenContainer}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Профиль"
                component={ProfileScreenContainer}
                options={{
                  headerShown: false,
                }}
              />
            </Tab.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
