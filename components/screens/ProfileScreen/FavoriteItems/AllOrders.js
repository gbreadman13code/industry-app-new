import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuccessPayments } from "../../../../queries/getSuccessPayments";
import { useFocusEffect } from "@react-navigation/native";

const AllOrders = ({ navigation }) => {
  const [payments, setPayments] = useState();
  const [paymentsSumm, setPeymentsSumm] = useState(0);

  const dispatch = useDispatch();

  const paymentsRedux = useSelector((state) => state.payments.payments);
  const paymentsSummRedux = useSelector((state) => state.payments.total_sum);

  useFocusEffect(
    useCallback(() => {
      dispatch(getSuccessPayments());

      return () => {};
    }, [])
  );

  useEffect(() => {
    if (!paymentsRedux) return;
    setPayments(paymentsRedux);
    setPeymentsSumm(paymentsSummRedux);
  }, [paymentsRedux]);
  return (
    <>
      <View style={styles.yellowHeader_more}>
        <Text style={styles.yellowText_more}>Все заказы</Text>
        <View style={styles.yellowDecor_more}></View>
        <TouchableOpacity
          onPress={() =>
            !payments || payments.length < 1
              ? null
              : navigation.navigate("LastOrders")
          }
        >
          <Text style={styles.yellowText_more_end}>
            {!payments || payments.length < 1 ? "Пусто" : "Смотреть все"}
          </Text>
        </TouchableOpacity>
      </View>
      {payments && payments.length > 0 && (
        <View
          style={{
            borderWidth: 2,
            borderColor: "#43464A",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <Text
            style={{
              color: "#43464A",
              fontFamily: "Geometria-Regular",
              fontSize: 18,
            }}
          >
            ВСЕГО:
          </Text>
          <Text
            style={{
              color: "#43464A",
              fontFamily: "Geometria-Regular",
              fontSize: 18,
            }}
          >
            {paymentsSumm} ₽
          </Text>
        </View>
      )}
    </>
  );
};

export default AllOrders;

const styles = StyleSheet.create({
  yellowHeader_more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  yellowText_more: {
    color: "#E7E453",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  yellowText_more_end: {
    color: "#E7E453",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginLeft: 5,
    fontSize: 16,
  },
  yellowDecor_more: {
    backgroundColor: "#E7E453",
    height: 1,
    flex: 1,
  },
});
