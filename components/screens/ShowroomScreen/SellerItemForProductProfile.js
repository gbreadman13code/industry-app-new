import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";

const SellerItemForProductProfile = ({ url, title, address, id, navigate }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => navigate(id)}>
      <View style={styles.shopView}>
        <ImageBackground
          style={styles.image}
          source={{ uri: url }}
        ></ImageBackground>
        <View style={styles.shopInfo}>
          <Text style={styles.title}>{title}</Text>
          {address && <Text style={styles.adress}>{address}</Text>}
          {/* <Text style={styles.type}>{type}</Text> */}
        </View>
      </View>
      <View style={styles.moreInfoButton}>
        <Text style={styles.moreInfoText}>Подробнее</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SellerItemForProductProfile;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#464A88",
    padding: 7,
    marginTop: 17,
    marginBottom: 30,
  },
  shopView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
  },
  shopInfo: {
    flex: 3,
    paddingLeft: 5,
  },
  image: {
    flex: 1,
    width: 64,
    height: 64,
    marginRight: 9,
  },
  title: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 16,
  },
  adress: {
    color: "#C7CBC9",
    fontSize: 14,
    fontFamily: "Geometria-Regular",
    marginTop: 7,
    maxWidth: "80%",
  },
  type: {
    color: "#fff",
  },
  moreInfoButton: {
    borderWidth: 1,
    borderColor: "#464A88",
    padding: 4,
    flex: 1,
  },
  moreInfoText: {
    color: "#464A88",
    fontSize: 12,
    fontFamily: "Geometria-Regular",
    textAlign: "center",
  },
});
