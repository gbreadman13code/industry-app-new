import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const ProductsInBascket = ({ navigation }) => {
  const ordersRedux = useSelector((state) => state.bascket);

  const { width } = useWindowDimensions();
  return (
    <>
      <View style={styles.yellowHeader_more}>
        <Text style={styles.yellowText_more}>Корзина</Text>
        <View style={styles.yellowDecor_more}></View>
        <TouchableOpacity
          onPress={
            ordersRedux.basketArray.length < 1
              ? null
              : () => navigation.navigate("BascketScreen")
          }
        >
          <Text style={styles.yellowText_more_end}>
            {ordersRedux.basketArray.length < 1
              ? "Пусто"
              : "Смотреть все " + "(" + ordersRedux.basketArray.length + ")"}
          </Text>
        </TouchableOpacity>
      </View>
      {ordersRedux.basketArray.length > 0 && (
        <ScrollView horizontal={true} style={{ marginBottom: 10 }}>
          {ordersRedux.basketArray.map((item, index) => (
            <ImageBackground
              key={index}
              source={{ uri: item.cropped_image }}
              style={{
                height: width * 0.352,
                width: width * 0.352,
                marginRight:
                  index === ordersRedux.basketArray.length - 1 ? 0 : 16,
              }}
            ></ImageBackground>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default ProductsInBascket;

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
