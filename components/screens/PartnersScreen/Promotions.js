import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const promotionsTypes = [
  { color: "#464A88", photo: require("../../../assets/img/violet_img.png") }, // violet
  { color: "#B34382", photo: require("../../../assets/img/pink_img.png") }, // pink
  { color: "#E7E453", photo: require("../../../assets/img/yellow_img.png") }, // yellow
  { color: "#55A290", photo: require("../../../assets/img/green_img.png") }, // green
];

export const PromotionWithNumber = ({ item }) => {
  const [type, setType] = useState({
    color: "#464A88",
    photo: require("../../../assets/img/violet_img.png"),
  });

  useEffect(() => {
    const randomNum = Math.random();
    if (randomNum <= 0.25) {
      setType(promotionsTypes[0]);
    }
    if (randomNum > 0.25 && randomNum <= 0.5) {
      setType(promotionsTypes[1]);
    }
    if (randomNum > 0.5 && randomNum <= 0.75) {
      setType(promotionsTypes[2]);
    }
    if (randomNum > 0.75) {
      setType(promotionsTypes[3]);
    }
  }, []);
  return (
    <View style={[styles.promotionWrap, { borderColor: type.color }]}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff" }}>- {item.sale} %</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={{ color: "#fff" }}>{item.description}</Text>
      </View>
      <View style={{ maxHeight: "100%", overflow: "hidden", flex: 1 }}>
        <Image
          source={type.photo}
          style={{ height: "100%", resizeMode: "contain" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promotionWrap: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minHeight: 80,
  },
});
