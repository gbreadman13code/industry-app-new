import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLkedPartners } from "../../../../queries/getPartners";
import { useFocusEffect } from "@react-navigation/native";
import { getLkedSellers } from "../../../../queries/getSellerById";

const FavoritePartners = ({ navigation }) => {
  const [likedPartners, setLikedPartners] = useState();
  const [likedSellers, setLikedSellers] = useState();

  const likedPartnersRedux = useSelector(
    (state) => state.partners.liked_partners
  );
  const likedSellersRedux = useSelector((state) => state.shop.liked_sellers);

  useEffect(() => {
    if (!likedSellersRedux) return;
    setLikedSellers(likedSellersRedux);
  }, [likedSellersRedux]);

  useEffect(() => {
    if (!likedPartnersRedux) return;
    setLikedPartners(likedPartnersRedux);
  }, [likedPartnersRedux]);

  const dispatch = useDispatch();

  const navigateToShop = (id) => {
    navigation.navigate("Seller", { id: id });
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getLkedPartners());
      dispatch(getLkedSellers());

      return async () => {};
    }, [])
  );

  const summSubscribe = () => {
    const partners = likedPartners ? likedPartners.length : 0;
    const shops = likedSellers ? likedSellers.length : 0;

    return partners + shops;
  };

  const { width } = useWindowDimensions();
  return (
    <>
      <View style={styles.yellowHeader_more}>
        <Text style={styles.yellowText_more}>Мои подписки</Text>
        <View style={styles.yellowDecor_more}></View>
        <TouchableOpacity activeOpacity={1}>
          <Text style={styles.yellowText_more_end}>{summSubscribe()}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          marginBottom:
            likedSellers && likedSellers.length > 0 ? width * 0.03 : 0,
        }}
      >
        {likedPartners && likedPartners.length > 0 && (
          <View
            style={{
              justifyContent: "center",
              marginRight: width * 0.03,
              minWidth: width * 0.18,
            }}
          >
            <Text style={{ color: "#fff", fontFamily: "Geometria-Regular" }}>
              Партнеры
            </Text>
          </View>
        )}
        {likedPartners
          ? likedPartners.length > 0 &&
            likedPartners.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Partner", { id: item.id })}
                style={{
                  borderWidth: 1,
                  borderColor: "#C7CBC9",
                  marginRight:
                    index === likedPartners.length - 1 ? 0 : width * 0.03,
                }}
              >
                <ImageBackground
                  source={{ uri: item.cropped_image }}
                  style={{
                    height: width * 0.18,
                    width: width * 0.18,
                  }}
                ></ImageBackground>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>

      <ScrollView horizontal={true}>
        {likedSellers && likedSellers.length > 0 && (
          <View
            style={{
              justifyContent: "center",
              marginRight: width * 0.03,
              minWidth: width * 0.18,
            }}
          >
            <Text style={{ color: "#fff", fontFamily: "Geometria-Regular" }}>
              Шоурумы
            </Text>
          </View>
        )}
        {likedSellers
          ? likedSellers.length > 0 &&
            likedSellers.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigateToShop(item.id)}
                style={{
                  borderWidth: 1,
                  borderColor: "#C7CBC9",
                  marginRight:
                    index === likedSellers.length - 1 ? 0 : width * 0.03,
                }}
              >
                <ImageBackground
                  source={{ uri: item.cropped_image }}
                  style={{
                    height: width * 0.18,
                    width: width * 0.18,
                  }}
                ></ImageBackground>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </>
  );
};

export default FavoritePartners;

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
