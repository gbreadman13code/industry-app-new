import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CustomButton from "../CustomButton/CustomButton";
import Lottie from "lottie-react-native";
import { useDispatch } from "react-redux";

import { login } from "../../../queries/login";

const LoginForm = ({ setGlobalLoad }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorList, setErrorList] = useState([]);
  const [isLoad, setLoad] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setGlobalLoad(isLoad);
  // }, [isLoad]);

  const sendLoginData = () => {
    setErrorList([]);
    setLoad(true);
    const localErrorList = [];
    if (!email) localErrorList.push("Введите адрес электронной почты");
    if (!password) localErrorList.push("Введите пароль");
    if (localErrorList.length > 0) {
      //   setErrorList(localErrorList);
      setLoad(false);
      return;
    }
    dispatch(
      login(
        { email: email.toLowerCase(), password: password },
        setLoad,
        setErrorList
      )
    );
  };

  return (
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
              placeholder={"Электронная почта"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <CustomTextInput
            editable={!isLoad}
            placeholder={"Пароль"}
            password={true}
            value={password}
            onChangeText={setPassword}
          />
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
          disactive={!email || !password}
        >
          <Text
            style={{
              fontFamily: "Geometria-Bold",
              fontSize: 14,
              color: !email || !password ? "#43464A" : "#121212",
            }}
          >
            Войти
          </Text>
        </CustomButton>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  errorItem: {
    color: "red",
    marginTop: 5,
  },
});
