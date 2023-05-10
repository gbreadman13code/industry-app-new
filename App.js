import { Provider, useDispatch } from "react-redux";
import { store } from "./redux";
import CheckAuth from "./components/screens/CheckAuth/CheckAuth";
import { useEffect, useState } from "react";
// import * as Font from "expo-font";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { Linking } from "expo";
import { View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Geometria-Regular": require("./assets/fonts/geometria_medium.otf"),
    "Geometria-Bold": require("./assets/fonts/geometria_bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // useEffect(() => {
  //   Font.loadAsync({
  //     "Geometria-Regular": require("./assets/fonts/geometria_medium.otf"),
  //     "Geometria-Bold": require("./assets/fonts/geometria_bold.otf"),
  //   });
  // }, []);
  return (
    <Provider store={store}>
      <CheckAuth />
    </Provider>
  );
}
