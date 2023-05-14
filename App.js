import { Provider, useDispatch } from "react-redux";
import { store } from "./redux";
import CheckAuth from "./components/screens/CheckAuth/CheckAuth";
import { useEffect, useState } from "react";
// import * as Font from "expo-font";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { Linking } from "expo";
import { LogBox, View } from "react-native";
import { Text } from "react-native";
import { TextInput } from "react-native";
// import { Appearance } from "react-native-appearance";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Geometria-Regular": require("./assets/fonts/geometria_medium.otf"),
    "Geometria-Bold": require("./assets/fonts/geometria_bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // useEffect(() => {
  //   const subscription = Appearance.addChangeListener(({ colorScheme }) => {
  //     if (colorScheme === "dark") {
  //       Appearance.setAppearance("light");
  //     }
  //   });
  //   return () => subscription.remove();
  // }, []);

  Text.defaultProps = {
    ...(Text.defaultProps || {}),
    allowFontScaling: false,
    includeFontPadding: false,
  };
  TextInput.defaultProps = {
    ...(TextInput.defaultProps || {}),
    allowFontScaling: false,
    includeFontPadding: false,
  };

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package.",
  ]);

  // useEffect(() => {}, []);

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
