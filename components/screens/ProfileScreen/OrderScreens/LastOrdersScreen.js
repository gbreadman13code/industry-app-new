import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../../../elements/BackButton/BackButton";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import CustomButton from "../../../elements/CustomButton/CustomButton";
import { num_word } from "../../../../functions/formateDate";
import { setOrder } from "../../../../queries/setOrder";
import LastOrderItem from "./LastOrderItem";

const LastOrdersScreen = ({ navigation }) => {
  const [payments, setPayments] = useState();

  const paymentsRedux = useSelector((state) => state.payments.payments);

  useEffect(() => {
    if (!paymentsRedux) return;
    if (paymentsRedux.length < 1) {
      navigation.goBack();
      return;
    }
    setPayments(paymentsRedux);
  }, [paymentsRedux]);

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
          <Text style={styles.header}>Все заказы</Text>
        </View>
        <ScrollView>
          {payments &&
            payments
              .reverse()
              .map((item, index) => <LastOrderItem key={index} item={item} />)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LastOrdersScreen;

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
    position: "relative",
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
  totalSumm: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    fontSize: 16,
    marginBottom: 5,
  },
  totalCount: {
    color: "#43464A",
    fontFamily: "Geometria-Regular",
    fontSize: 16,
  },
});
