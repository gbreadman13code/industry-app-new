import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CustomButton from "../CustomButton/CustomButton";
import Lottie from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import MaskInput from "react-native-mask-input";

import { login } from "../../../queries/login";
import { formatDate } from "../../../functions/birthdayInputMask";
import { setUserData } from "../../../queries/setUserData";
import { getUserData } from "../../../queries/getUserData";

import * as SecureStore from "expo-secure-store";

const PersonalDataForm = ({ setGlobalLoad }) => {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [birthday, setBirthday] = useState();
  const [phone, setPhone] = useState();

  const [errorList, setErrorList] = useState([]);
  const [isLoad, setLoad] = useState(false);

  const sendLoginData = () => {
    setErrorList([]);
    setLoad(true);
    const formattedBirthday = birthday
      ? birthday.split(".").reverse().join("-")
      : null;

    if (formattedBirthday) {
      dispatch(
        setUserData(
          {
            first_name: first_name,
            last_name: last_name,
            birthday: formattedBirthday,
            phone: phone,
          },
          setLoad,
          setErrorList
        )
      );
    } else {
      dispatch(
        setUserData(
          {
            first_name: first_name,
            last_name: last_name,
            phone: phone,
          },
          setLoad,
          setErrorList
        )
      );
    }
  };

  const auth = useSelector((state) => state.auth.isAuth);
  const personalInfo = useSelector((state) => state.personal_info.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth) return;
    dispatch(getUserData(isLoad));
  }, [dispatch, auth]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ marginTop: 48 }}>
        {isLoad ? (
          <View style={{ alignItems: "center" }}>
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
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoad}
                placeholder={"Имя (обязательно)"}
                value={first_name}
                onChangeText={(text) => setFirstName(text)}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoad}
                placeholder={"Фамилия (обязательно)"}
                value={last_name}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <MaskInput
                editable={!isLoad}
                value={birthday ? birthday : ""}
                style={{
                  borderWidth: 1,
                  borderColor: !isLoad ? "#fff" : "#43464A",
                  color: !isLoad ? "#fff" : "#43464A",
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
            <KeyboardAvoidingView
              keyboardVerticalOffset={100}
              behavior="position"
            >
              <View style={{ marginBottom: 16 }}>
                <CustomTextInput
                  editable={!isLoad}
                  placeholder={"Номер телефона"}
                  // keyboardType="numeric"
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>
            </KeyboardAvoidingView>
          </>
        )}

        {errorList.length > 0 && (
          <View style={{ marginTop: 16, maxWidth: 300 }}>
            {errorList.map((item, index) => (
              <Text
                key={index}
                style={{ color: "#B34382", fontSize: 12, marginBottom: 7 }}
              >
                {item}
              </Text>
            ))}
          </View>
        )}
        <View style={{ marginTop: 24 }}>
          <CustomButton
            onClick={isLoad ? () => {} : sendLoginData}
            disactive={!first_name || !last_name}
          >
            <Text
              style={{
                fontFamily: "Geometria-Bold",
                fontSize: 14,
                color: !first_name || !last_name ? "#43464A" : "#121212",
              }}
            >
              Далее
            </Text>
          </CustomButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PersonalDataForm;

const styles = StyleSheet.create({
  errorItem: {
    color: "red",
    marginTop: 5,
  },
});
