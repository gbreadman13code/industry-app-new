import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ArrowBack from "../../../../assets/svg/ArrowBack";
import BackButton from "../../../elements/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import FourDigitCodeInput from "../../../elements/FourDigitCodeInput/FourDigitCodeInput";
import CustomButton from "../../../elements/CustomButton/CustomButton";
import { DeleteAcount } from "../../../../queries/deleteAccount";
import VisaCard from "../../../../assets/svg/VisaCard";
import MaestroCard from "../../../../assets/svg/MaestroCard";
import MasterCard from "../../../../assets/svg/MasterCard";
import MirCard from "../../../../assets/svg/MirCard";
import Background from "../../../../assets/svg/Background";

const PayAndDeliveryPage = ({ navigation }) => {
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
          <Text style={styles.header}>Оплата и доставка</Text>
        </View>
        <View style={styles.yellowHeader}></View>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.title}>Доставка по всей территории РФ</Text>
          <Text style={styles.subtitle}>От 1 дня</Text>
          <Text style={styles.text}>
            Мы стараемся выполнить доставку в течение 5 дней после получения
            заказа.
          </Text>
          <Text style={styles.text}>
            При этом сроки могут быть индивидуальными, если работа в данный
            момент участвует в выставке, к работе заказано оформление или
            находится в другом регионе. Мы обязательно связываемся с вами, чтобы
            согласовать удобный для вас день и время доставки.
          </Text>
          <Text style={styles.subtitle}>Способы оплаты</Text>
          <Text style={styles.text}>
            Вы можете оплачивать заказ, любым удобным для вас способом:
            Банковской картой Visa, Mastercard, Maestro, Мир.
          </Text>
          <View style={{ flexDirection: "row", marginTop: 43 }}>
            <View style={{ marginRight: 10 }}>
              <VisaCard />
            </View>
            <View style={{ marginRight: 10 }}>
              <MaestroCard />
            </View>
            <View style={{ marginRight: 10 }}>
              <MasterCard />
            </View>
            <View style={{ marginRight: 0 }}>
              <MirCard />
            </View>
          </View>
        </View>
        {/* <Background /> */}
      </View>
    </SafeAreaView>
  );
};

export default PayAndDeliveryPage;

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
  title: {
    textAlign: "center",
    fontFamily: "Geometria-Bold",
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  subtitle: {
    color: "#55A290",
    fontFamily: "Geometria-Bold",
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    color: "#ffffff",
    fontFamily: "Geometria-Regular",
    fontSize: 16,
    marginBottom: 10,
  },
});
