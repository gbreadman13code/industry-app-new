import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../../../elements/BackButton/BackButton";
import CustomTextInput from "../../../elements/CustomTextInput/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../elements/CustomButton/CustomButton";
import { setUserData } from "../../../../queries/setUserData";
import { setNewPass } from "../../../../queries/setNewPass";
import * as SecureStore from "expo-secure-store";
import { setAuthAction } from "../../../../redux/reducers/AuthReducer";
import MaskInput from "react-native-mask-input";
import { editable } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

const EditInfoScreen = ({ navigation }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthdayTest, setBirthdayTest] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPassword] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const [isLoadInfo, setLoadInfo] = useState(false);
  const [isLoadPass, setLoadPass] = useState(false);

  const [infoErrors, setInfoErrors] = useState([]);
  const [passErrors, setPassErrors] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [isPassSuccessChanged, setPassSuccessChanged] = useState(false);

  const personalInfo = useSelector((state) => state.personal_info.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    setPassErrors([]);
  }, [currentPass]);

  useEffect(() => {
    if (!isPassSuccessChanged) return;
    const deleteToken = async () => {
      await SecureStore.deleteItemAsync("token");
    };
    const timer = setTimeout(() => {
      deleteToken();
      dispatch(setAuthAction({ isAuth: false }));
    }, 5000);

    return () => clearTimeout(timer);
  }, [isPassSuccessChanged]);

  useEffect(() => {
    if (confirmNewPass !== newPass) {
      setPassErrors(["Пароли не совпадают"]);
    } else {
      setPassErrors((prevState) =>
        prevState.filter((item) => item !== "Пароли не совпадают")
      );
    }
  }, [confirmNewPass]);

  useEffect(() => {
    setFirstName(personalInfo.first_name);
    setLastName(personalInfo.last_name);
    setBirthday(
      personalInfo.birthday
        ? personalInfo.birthday.split("-").reverse().join(".")
        : ""
    );
    setEmail(personalInfo.email);
    setPhone(personalInfo.phone);
  }, [personalInfo]);

  const changePersonalInfo = () => {
    setInfoErrors([]);
    setLoadInfo(true);
    dispatch(
      setUserData(
        {
          first_name: first_name,
          last_name: last_name,
          birthday: birthday ? birthday.split(".").reverse().join("-") : null,
          email: email,
          phone: phone,
        },
        setLoadInfo,
        setInfoErrors
      )
    );
  };

  const changePassword = () => {
    setPassErrors([]);
    setNewPass(
      { old_password: currentPass, new_password: newPass },
      setLoadPass,
      setPassErrors,
      setPassSuccessChanged
    );
  };

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

  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.container]}>
      <View
        style={[
          styles.wrapper,
          {
            maxHeight: height - keyboardHeight - 40,
          },
        ]}
      >
        {isPassSuccessChanged && (
          <View style={styles.success_screen}>
            <Text style={styles.success_text}>Ваш пароль успешно изменен!</Text>
            <Text style={styles.success_text}>
              Вы будете перенаправлены на страницу входа через 5 секунд...
            </Text>
          </View>
        )}
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              marginBottom: 25,
            }}
          >
            <View style={{ position: "absolute", left: 0 }}>
              <BackButton navigate={() => navigation.goBack()} />
            </View>
            <Text style={styles.header}>Редактирование</Text>
          </View>
          <View style={styles.yellowHeader}>
            <Text style={styles.yellowText}>Личная информация</Text>
            <View style={styles.yellowDecor}></View>
          </View>
          <View style={{ marginTop: 16 }}>
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoadInfo}
                onChangeText={setFirstName}
                value={first_name ? first_name : ""}
                placeholder={"Имя (обязательно)"}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoadInfo}
                onChangeText={setLastName}
                value={last_name ? last_name : ""}
                placeholder={"Фамилия (обязательно)"}
              />
            </View>
            {/* <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoadInfo}
                onChangeText={setBirthday}
                value={birthday ? birthday : ""}
                maxLength={10}
                placeholder={"Дата рождения (ДД.ММ.ГГГГ)"}
              />
            </View> */}
            <View style={{ marginBottom: 16 }}>
              <MaskInput
                editable={!isLoadInfo}
                value={birthday ? birthday : ""}
                style={{
                  borderWidth: 1,
                  borderColor: !isLoadInfo ? "#fff" : "#43464A",
                  color: !isLoadInfo ? "#fff" : "#43464A",
                  padding: 16,
                  fontFamily: "Geometria-Regular",
                  fontSize: 14,
                }}
                placeholder={"Дата рождения (ДД.ММ.ГГГГ)"}
                placeholderTextColor={"#43464A"}
                onChangeText={(masked) => setBirthday(masked)}
                mask={[
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoadInfo}
                onChangeText={setEmail}
                value={email ? email : ""}
                placeholder={"Электронная почта (обязательно)"}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoadInfo}
                onChangeText={setPhone}
                value={phone ? phone : ""}
                placeholder={"Телефон"}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <CustomButton
                onClick={changePersonalInfo}
                disactive={!first_name || !last_name || !email || isLoadInfo}
              >
                <Text
                  style={{
                    fontFamily: "Geometria-Regular",
                    fontSize: 16,
                    color:
                      !first_name || !last_name || !email || isLoadInfo
                        ? "#43464A"
                        : "#000",
                  }}
                >
                  Сохранить
                </Text>
              </CustomButton>
            </View>
          </View>
          <View style={styles.yellowHeader}>
            <Text style={styles.yellowText}>Пароль</Text>
            <View style={styles.yellowDecor}></View>
          </View>
          {/* <KeyboardAvoidingView
            // keyboardVerticalOffset={0}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          > */}
          <View style={{ marginTop: 16 }}>
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoadPass}
                value={currentPass}
                onChangeText={setCurrentPass}
                password={true}
                placeholder={"Текущий пароль"}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoadPass}
                value={newPass}
                onChangeText={setNewPassword}
                password={true}
                placeholder={"Новый пароль"}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoadPass}
                value={confirmNewPass}
                onChangeText={setConfirmNewPass}
                password={true}
                placeholder={"Повторите пароль"}
              />
            </View>
            {passErrors.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                {passErrors.map((item, index) => (
                  <Text
                    key={index}
                    style={{
                      color: "#B34382",
                      fontSize: 12,
                      marginBottom: 7,
                    }}
                  >
                    {item}
                  </Text>
                ))}
              </View>
            )}

            <View style={{ marginBottom: 16 }}>
              <CustomButton
                onClick={changePassword}
                disactive={
                  !currentPass ||
                  !newPass ||
                  !confirmNewPass ||
                  isLoadPass ||
                  passErrors.length > 0
                }
              >
                <Text
                  style={{
                    fontFamily: "Geometria-Regular",
                    fontSize: 16,
                    color:
                      !currentPass ||
                      !newPass ||
                      !confirmNewPass ||
                      isLoadPass ||
                      passErrors.length > 0
                        ? "#43464A"
                        : "#000",
                  }}
                >
                  Сохранить
                </Text>
              </CustomButton>
            </View>
          </View>
          {/* </KeyboardAvoidingView> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  lottieContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    // height: "100%",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    position: "relative",
  },
  success_screen: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#000",
    height: "100%",
    width: "104%",
    zIndex: 2,

    alignItems: "center",
    justifyContent: "center",
  },
  success_text: {
    fontFamily: "Geometria-Regular",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 15,
  },
  header: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    textAlign: "center",
    marginTop: 12,
    fontSize: 20,
    marginBottom: 20,
  },
  yellowHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  yellowText: {
    color: "#E7E453",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  yellowDecor: {
    backgroundColor: "#E7E453",
    height: 1,
    flex: 1,
  },
});
