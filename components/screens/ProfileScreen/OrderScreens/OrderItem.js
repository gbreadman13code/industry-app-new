import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import CounterBlock from "./CounterBlock";
import DeleteOrder from "../../../../assets/svg/DeleteOrder";
import { useDispatch } from "react-redux";
import { deleteProductToBascketAction } from "../../../../redux/reducers/BascketReducer";

const OrderItem = ({ item, setTotalSumm, setTotalCount }) => {
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setTotalSumm((prevState) => prevState + item.price * count);
  //   setTotalCount((prevState) => prevState + count);
  // }, [count]);

  const { width } = useWindowDimensions();
  return (
    <View style={{ flexDirection: "row", gap: width * 0.04, marginBottom: 16 }}>
      <ImageBackground
        source={{ uri: item.cropped_image }}
        style={{
          height: width * 0.352,
          width: width * 0.352,
        }}
      ></ImageBackground>
      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.companyTitle}>{item.shop.title}</Text>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{item.price} ₽</Text>
            {item.old_price && <Text>{item.old_price} ₽</Text>}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <CounterBlock
              maxCount={item.quantity}
              count={item.localCount}
              setCount={setCount}
              productId={item.id}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#121212",
                paddingHorizontal: 10,
                marginLeft: 8,
                justifyContent: "center",
              }}
              onPress={() => dispatch(deleteProductToBascketAction(item.id))}
            >
              <DeleteOrder />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Geometria-Bold",
    marginBottom: 10,
  },
  companyTitle: {
    color: "#43464A",
    fontFamily: "Geometria-Regular",
    marginBottom: 15,
  },
});
