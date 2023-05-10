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

const BascketScreen = ({ navigation }) => {
  const [totalSumm, setTotalSumm] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState();
  const ordersRedux = useSelector((state) => state.bascket);

  const makeOrder = () => {
    setError();
    let orderArr = [];
    ordersRedux.basketArray.forEach((item) => {
      orderArr.push(item.id + ":" + item.localCount);
    });
    setOrder({ product_ids: orderArr.join(",") }, setError);
  };

  useEffect(() => {
    if (!error) return;
    const errorsProduct = ordersRedux.basketArray.filter(
      (item) => item.id == error
    );
    if (!errorsProduct || errorsProduct.length < 1) return;
    Alert.alert(
      "Упс!",
      'Видимо, пока вы заказывали товар "' +
        errorsProduct[0].title +
        '" его количество на складе изменилось. Вы можете заказать не больше ' +
        errorsProduct[0].quantity +
        " штук."
    );
  }, [error]);

  useEffect(() => {
    if (ordersRedux.basketArray.length < 1) {
      navigation.navigate("ProfileScreen");
      return;
    }
    let totalSummLocal = 0;
    let totalCountLocal = 0;
    ordersRedux.basketArray.forEach((item) => {
      totalSummLocal = totalSummLocal + item.price * item.localCount;
      totalCountLocal = totalCountLocal + item.localCount;
    });
    setTotalSumm(totalSummLocal);
    setTotalCount(totalCountLocal);
  }, [ordersRedux]);

  const { width } = useWindowDimensions();
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
          <Text style={styles.header}>Корзина</Text>
        </View>
        {ordersRedux.basketArray.length > 0 && (
          <ScrollView>
            {ordersRedux.basketArray.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
      <View
        style={{
          backgroundColor: "#121212",
          paddingVertical: 8,
          paddingHorizontal: 22,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderTopWidth: 2,
          borderTopColor: "#E7E453",
        }}
      >
        <View style={{ justifyContent: "space-between" }}>
          <Text style={styles.totalSumm}>{totalSumm} ₽</Text>
          <Text style={styles.totalCount}>
            {totalCount} {num_word(totalCount, ["товар", "товара", "товаров"])}
          </Text>
        </View>
        <CustomButton paddingVertical={12} onClick={makeOrder}>
          <Text style={{ fontFamily: "Geometria-Regular", fontSize: 16 }}>
            К оформлению
          </Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default BascketScreen;

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
