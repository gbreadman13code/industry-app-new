import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  useWindowDimensions,
  Keyboard,
  Platform,
} from "react-native";
import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../elements/Container/Container";
import Lottie from "lottie-react-native";

// import SvgUri from "react-native-svg-uri";

import logo from "../../../assets/img/logo/logo.svg";
import RegisterForm from "../../elements/RegisterForm/RegisterForm";
import LoginForm from "../../elements/LoginForm/LoginForm";
import RegisterLogo from "../../../assets/svg/RegisterLogo";
import { useDispatch, useSelector } from "react-redux";
import PersonalDataForm from "../../elements/PersonalDataForm /PersonalDataForm";

import * as SecureStore from "expo-secure-store";
import { getUserData } from "../../../queries/getUserData";
import { logout } from "../../../queries/logout";

const LoginScreen = () => {
  const [logoIcon, setLogoIcon] = useState(null);
  const [isLogining, setLogining] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [isAuth, setAuth] = useState(false);
  const [hasPersonalInfo, setPersonalInfo] = useState();

  const auth = useSelector((state) => state.auth.isAuth);
  const personalInfo = useSelector((state) => state.personal_info.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoad(true);
    setAuth(auth);
  }, [auth]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!auth) {
      logout();
    }
    dispatch(getUserData(setIsLoad));
  }, [dispatch, auth]);

  useEffect(() => {
    if (!personalInfo.id) return;
    if (!personalInfo.first_name) {
      setPersonalInfo(false);
      return;
    }
    setPersonalInfo(true);
  }, [personalInfo]);

  useEffect(() => {
    setLogoIcon(logo);
  }, []);

  const { height, width } = useWindowDimensions();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={[
          styles.container,
          {
            height: height - keyboardHeight,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={{
            // flex: 1,
            justifyContent: keyboardHeight == 0 ? null : "center",
            paddingTop: keyboardHeight === 0 ? height / 4 : 0,
            backgroundColor: "#000",
            width: width * 0.8,
          }}
        >
          {isLoad ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                backgroundColor: "#000",
              }}
            >
              <Lottie
                source={require("../../../assets/img/lotties/loader-square.json")}
                autoPlay
                loop
                style={{
                  backgroundColor: "#000",
                  width: 200,
                  height: 120,
                }}
              />
            </View>
          ) : (
            <>
              <View style={{ marginBottom: 40, alignItems: "center" }}>
                <RegisterLogo />
              </View>
              {!isAuth ? (
                <>
                  <View style={styles.actionItem_wrapper}>
                    <TouchableOpacity
                      style={styles.actionItem}
                      onPress={() => (isLoad ? null : setLogining(false))}
                    >
                      {!isLogining && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            backgroundColor: "#B34382",
                            marginBottom: 15,
                          }}
                        ></View>
                      )}
                      <Text
                        style={{
                          color: isLogining ? "#fff" : "#B34382",
                          fontFamily: "Geometria-Regular",
                        }}
                      >
                        Регистрация
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionItem}
                      onPress={() => (isLoad ? null : setLogining(true))}
                    >
                      {isLogining && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            backgroundColor: "#B34382",
                            marginBottom: 15,
                          }}
                        ></View>
                      )}
                      <Text
                        style={{
                          color: !isLogining ? "#fff" : "#B34382",
                          fontFamily: "Geometria-Regular",
                        }}
                      >
                        У меня есть аккаунт
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <KeyboardAvoidingView
                    keyboardVerticalOffset={0}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  > */}
                  {!isLogining ? (
                    <View>
                      <RegisterForm setGlobalLoad={setIsLoad} />
                    </View>
                  ) : (
                    <View>
                      <LoginForm setGlobalLoad={setIsLoad} />
                    </View>
                  )}
                  {/* </KeyboardAvoidingView> */}
                </>
              ) : (
                <PersonalDataForm />
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#000",
    height: "100%",
    // color: "#fff",
  },
  actionItem_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  actionItem: {
    alignItems: "center",
  },
  actionItem_text: {},
});
