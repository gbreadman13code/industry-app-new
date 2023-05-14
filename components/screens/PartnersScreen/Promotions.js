import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

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
      <LinearGradient
        // Background Linear Gradient
        colors={["#000", "#000", type.color]}
        locations={[0, 0, 1]}
        style={styles.background}
        start={{ x: 0, y: 1 }}
      ></LinearGradient>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{ color: "#fff", fontFamily: "Geometria-Bold", fontSize: 30 }}
        >
          -{item.sale}%
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 13,
        }}
      >
        <Text
          style={{ color: "#fff", fontFamily: "Geometria-Bold", fontSize: 14 }}
        >
          {item.description}
        </Text>
      </View>
      <View
        style={{
          maxHeight: "100%",
          overflow: "hidden",
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        <Image
          source={type.photo}
          style={{
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
};

export const PromotionWithOuthNumber = ({ item }) => {
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
      <LinearGradient
        // Background Linear Gradient
        colors={["#000", "#000", type.color]}
        locations={[0, 0, 1]}
        style={[styles.background, { transform: "scaleX(-1)" }]}
        start={{ x: 1, y: 0 }}
      ></LinearGradient>

      <View
        style={{
          maxHeight: "100%",
          overflow: "hidden",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <Image
          source={type.photo}
          style={{
            height: "100%",
            resizeMode: "contain",
            transform: "scaleX(-1)",
          }}
        />
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
          paddingRight: 11,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "Geometria-Regular",
            fontSize: 12,
            textAlign: "right",
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promotionWrap: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    minHeight: 80,
    position: "relative",
    marginBottom: 8,
  },
  background: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "200%",
    top: 0,
    left: "0%",
  },
});
