import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ArrowBack from "../../../../assets/svg/ArrowBack";
import BackButton from "../../../elements/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import FourDigitCodeInput from "../../../elements/FourDigitCodeInput/FourDigitCodeInput";
import CustomButton from "../../../elements/CustomButton/CustomButton";
import { DeleteAcount } from "../../../../queries/deleteAccount";

const DeleteAcountPage = ({ navigation }) => {
  const [fullName, setFullName] = useState("Пользователь");
  const [randomNumber, setRandomNumber] = useState("1234");
  const [inputValue, setInputValue] = useState("");
  const personalInfo = useSelector((state) => state.personal_info.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    setFullName(personalInfo.first_name);
  }, [personalInfo]);

  const deleteAcc = () => {
    dispatch(DeleteAcount());
  };

  useEffect(() => {
    let random = Math.round(Math.random() * 10000).toString();
    while (random.length < 4) {
      random = "0" + random;
    }
    setRandomNumber(random);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ flex: 12 }}>
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
            <Text style={styles.header}>Удаление аккаунта</Text>
          </View>
          <View style={styles.yellowHeader}></View>
          <View style={{ marginTop: 16 }}>
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Geometria-Regular",
                  fontSize: 19,
                  textAlign: "center",
                }}
              >
                Внимание!
              </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Geometria-Regular",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {fullName}, вы перешли на страницу удаления аккаунта!
              </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Geometria-Regular",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Предупреждаем, что в случае удаления аккаунты будет также
                удалена вся персональная информация о вас, а также данные о
                лайках, подписках, корзине товаров.
              </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Geometria-Regular",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Однако мы сохраним данные об оплаченных и полученных товарах.
              </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Geometria-Regular",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Если вы точно хотите удалить аккаунт, введите 4-значное число с
                экрана в поле ниже и нажмите "Удалить". После успешного удаления
                вы будете перенаправлены на страницу входа.
              </Text>
            </View>
            <View style={{ marginBottom: 16, alignItems: "center" }}>
              <Text
                style={{
                  borderWidth: 1,
                  color: "#fff",
                  fontFamily: "Geometria-Regular",
                  fontSize: 50,
                  // letterSpacing: 10,
                  textAlign: "center",
                }}
              >
                {randomNumber}
              </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <FourDigitCodeInput onChangeText={setInputValue} />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            disactive={randomNumber != inputValue}
            onClick={deleteAcc}
          >
            <Text
              style={{
                color: randomNumber != inputValue ? "#43464A" : "#000",
                fontFamily: "Geometria-Regular",
              }}
            >
              Удалить
            </Text>
          </CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteAcountPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
    paddingHorizontal: 10,
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
    fontSize: 16,
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
