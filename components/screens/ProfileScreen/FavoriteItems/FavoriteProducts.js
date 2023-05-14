import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Animated,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getLikedProducts } from "../../../../queries/getProducts";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const FavoriteProducts = ({ navigation, setProductsCount }) => {
  const [likedProducts, setLikedProducts] = useState();
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const likedProductsRedux = useSelector(
    (state) => state.products.liked_products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!likedProductsRedux) return;
    setLikedProducts(likedProductsRedux);
    setProductsCount(likedProductsRedux.length);
  }, [likedProductsRedux]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getLikedProducts());

      return () => {};
    }, [])
  );

  const { width } = useWindowDimensions();

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
      likedProducts && likedProducts.length > 0
        ? likedProducts.length * (width * 0.352 + 8)
        : 20,
    ],
  });

  return likedProducts && likedProducts.length > 0 ? (
    <>
      <TouchableOpacity
        onPress={toggleList}
        activeOpacity={0.6}
        style={styles.whiteHeader_more}
      >
        <Text style={styles.whiteText_more}>Товары</Text>
        <View style={styles.whiteDecor_more}></View>
        <View>
          <Text style={styles.whiteText_more_end}>
            {expanded ? "Скрыть" : "Открыть"}
          </Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={{ height: height, overflow: "hidden" }}>
        {likedProducts ? (
          likedProducts.length < 1 ? (
            <Text
              style={{
                color: "#fff",
                textTransform: "uppercase",
                fontFamily: "Geometria-Regular",
                textAlign: "center",
              }}
            >
              Список пуст
            </Text>
          ) : (
            likedProducts.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Product", { id: item.id })}
                key={index}
                style={{
                  marginBottom: 8,
                  flexDirection: "row",
                  gap: width * 0.04,
                }}
              >
                <ImageBackground
                  source={{ uri: item.cropped_image }}
                  style={{
                    width: width * 0.352,
                    height: width * 0.352,
                  }}
                ></ImageBackground>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontFamily: "Geometria-Bold",
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: "#43464A",
                      fontFamily: "Geometria-Regular",
                      marginBottom: 15,
                    }}
                  >
                    {item.shop.title}
                  </Text>
                  <Text
                    style={{
                      color: "#E7E453",
                      fontSize: 16,
                      fontFamily: "Geometria-Bold",
                      marginBottom: 10,
                    }}
                  >
                    {item.price} ₽
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )
        ) : null}
      </Animated.View>
    </>
  ) : null;
};

export default FavoriteProducts;

const styles = StyleSheet.create({
  whiteHeader_more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  whiteText_more: {
    color: "#C7CBC9",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  whiteText_more_end: {
    color: "#C7CBC9",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginLeft: 5,
    fontSize: 16,
  },
  whiteDecor_more: {
    backgroundColor: "#C7CBC9",
    height: 1,
    flex: 1,
  },
});
