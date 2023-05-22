import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CustomButton from "../CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../queries/register";
import Lottie from "lottie-react-native";

import ChoosePushScreen from "../../screens/ChoosePushScreen/ChoosePushScreen";
// import SvgUri from "react-native-svg-uri";

import ArrowIcon from "../../../assets/img/icons/arrow_left.svg";
import MainScreen from "../../screens/MainScreen/MainScreen";
import { getContacts } from "../../../queries/getContacts";

const RegisterForm = ({ navigation, setGlobalLoad }) => {
  const [firstStep, setFirstStep] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorList, setErrorList] = useState([]);
  const [isPassworSuccess, setPasswordSuccess] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [isReadyToNavigate, setReadyToNavigate] = useState(false);
  const [confidencial, setConfidencial] = useState();
  const [agreements, setAgreements] = useState();

  const dispatch = useDispatch();

  const contactsRedux = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    if (!contactsRedux) return;
    setConfidencial(contactsRedux.confidential_policy);
    setAgreements(contactsRedux.user_agreement);
  }, [contactsRedux]);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handlePress = (mailTo) => {
    Linking.openURL(mailTo);
  };

  const goBack = () => {
    setFirstStep(true);
    setPassword();
    setConfirmPassword();
    setErrorList([]);
    setPasswordSuccess(false);
  };

  const setNextStep = () => {
    setFirstStep(false);
  };

  const isConfirmingPassword = (text) => {
    if (text !== password) {
      setErrorList(["Пароли не совпадают"]);
      setPasswordSuccess(false);
    }
    if (text === password) {
      setErrorList([]);
      setPasswordSuccess(true);
    }
  };

  // useEffect(() => {
  //   setGlobalLoad(isLoad);
  // }, [isLoad]);

  const sumbitRegister = () => {
    setErrorList([]);
    setPasswordSuccess(false);

    setLoad(true);
    dispatch(
      register(
        { email: email.toLowerCase(), password: password },
        setLoad,
        setErrorList
      )
    );
  };

  return isLoad ? (
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
    <View>
      {firstStep ? (
        <>
          <View style={{ marginTop: 48, marginBottom: 24, maxWidth: "100%" }}>
            <CustomTextInput
              editable={!isLoad}
              value={email}
              placeholder={"Электронная почта"}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <CustomButton disactive={!email} onClick={setNextStep}>
              <Text
                style={{
                  color: !email ? "#43464A" : "#121212",
                  fontFamily: "Geometria-Bold",
                }}
              >
                Далее
              </Text>
            </CustomButton>
          </View>
        </>
      ) : (
        <>
          <View style={{ marginTop: 48, marginBottom: 24 }}>
            <View style={{ marginBottom: 16 }}>
              <CustomTextInput
                editable={!isLoad}
                value={password}
                placeholder={"Придумайте пароль"}
                onChangeText={setPassword}
                password={true}
              />
            </View>
            <CustomTextInput
              editable={!isLoad}
              value={confirmPassword}
              placeholder={"Повторите пароль"}
              onChangeText={isConfirmingPassword}
              password={true}
            />

            {/* Вывод ошибок */}
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

            {/* Вывод успешной проверки паролей */}
            {isPassworSuccess && (
              <Text style={{ color: "#55A290", marginTop: 16, fontSize: 12 }}>
                Пароли совпадают
              </Text>
            )}
          </View>

          {confidencial && agreements && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 26,
                justifyContent: "center",
              }}
            >
              <Text
                style={styles.agreementText}
                onPress={() => console.log("pressed")}
              >
                Регистрируясь, вы принимаете
              </Text>
              <Text
                style={[
                  styles.agreementText,
                  {
                    textDecorationColor: "#fff",
                    // textDecorationStyle: "solid",
                    textDecorationLine: "underline",
                  },
                ]}
                onPress={() => handlePress(confidencial)}
              >
                {" "}
                Политику конфиденциальности
              </Text>
              <Text style={styles.agreementText}> и </Text>
              <Text
                style={[
                  styles.agreementText,
                  {
                    textDecorationColor: "#fff",
                    // textDecorationStyle: "solid",
                    textDecorationLine: "underline",
                  },
                ]}
                onPress={() => handlePress(agreements)}
              >
                Пользовательское соглашение
              </Text>
            </View>
          )}
          <View>
            <CustomButton
              disactive={!isPassworSuccess}
              onClick={isLoad ? () => {} : sumbitRegister}
            >
              <Text
                style={{
                  color: !isPassworSuccess ? "#43464A" : "#121212",
                  fontFamily: "Geometria-Bold",
                }}
              >
                Зарегистрироваться
              </Text>
            </CustomButton>
            <TouchableOpacity onPress={goBack} style={styles.goBackWrapper}>
              {/* <SvgUri width={6} height={12} source={ArrowIcon} /> */}
              <Text style={styles.goBackButton}>Назад</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  goBackWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 19,
  },
  goBackButton: {
    marginLeft: 10,
    color: "#E7E453",
    fontFamily: "Geometria-Bold",
    alignSelf: "center",
  },
  agreementText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "Geometria-Regular",
    lineHeight: 12,
  },
});
