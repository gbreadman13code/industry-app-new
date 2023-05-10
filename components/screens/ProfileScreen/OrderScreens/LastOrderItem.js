import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { formateDate } from "../../../../functions/formateDate";

const LastOrderItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const { width } = useWindowDimensions();

  useEffect(() => {}, [expanded]);
  const toggleList = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      item.products && item.products.length > 0
        ? item.products.length * (width * 0.352 + 10)
        : 0,
    ],
  });

  return (
    <View>
      <View style={styles.greenHeader_more}>
        <Text style={styles.greenText_more}>
          {formateDate(item.created_at)}
        </Text>
        <View style={styles.greenDecor_more}></View>
        <TouchableOpacity onPress={toggleList}>
          <Text style={styles.greenText_more_end}>
            {expanded ? "Скрыть" : "Открыть"}
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={{ height: height, overflow: "hidden" }}>
        {item.products.map((point, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              { flexDirection: "row", gap: width * 0.04 },
            ]}
          >
            <ImageBackground
              source={{ uri: point.product.cropped_image }}
              style={{ width: width * 0.352, height: width * 0.352 }}
            ></ImageBackground>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View>
                <Text style={styles.title}>{point.product.title}</Text>
                <Text style={styles.companyTitle}>
                  {point.product.shop.title}
                </Text>
              </View>
              <Text style={styles.quantity}>
                Количество: {point.quantity} шт.
              </Text>
              <Text
                style={[styles.title, { marginBottom: 0, color: "#E7E453" }]}
              >
                {point.price} ₽
              </Text>
            </View>
          </View>
        ))}
      </Animated.View>
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
          {item.total_sum} ₽
        </Text>
      </View>
    </View>
  );
};

export default LastOrderItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },
  greenHeader_more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  greenText_more: {
    color: "#55A290",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
    textTransform: "uppercase",
  },
  greenText_more_end: {
    color: "#55A290",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginLeft: 5,
    fontSize: 16,
  },
  greenDecor_more: {
    backgroundColor: "#55A290",
    height: 1,
    flex: 1,
  },
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
  quantity: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Geometria-Regular",
    marginBottom: 10,
  },
});
