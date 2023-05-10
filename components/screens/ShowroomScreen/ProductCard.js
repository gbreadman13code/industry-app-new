import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";

const ProductCard = ({
  navigation,
  old_price,
  title,
  imgUrl,
  index,
  shop,
  category,
  price,
  id,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation(id)}
      style={{
        width: "50%",
        height: "100%",
        marginBottom: 16,
        paddingRight: index % 2 === 0 ? 8 : 0,
        paddingLeft: index % 2 !== 0 ? 8 : 0,
      }}
    >
      <ImageBackground source={{ uri: imgUrl }} style={styles.productImage}>
        <View style={styles.additionalInfo}>
          {category && category.length > 0 && (
            <Text style={styles.categoryTitle}>{category[0].title}</Text>
          )}
        </View>
      </ImageBackground>
      <Text style={styles.shopTitle}>{shop}</Text>
      <Text style={styles.productTitle}>{title}</Text>
      <View style={styles.priceWrap}>
        <Text style={styles.price}>{price} ₽</Text>
        {old_price && <Text style={styles.old_price}>{old_price} ₽</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productImage: {
    width: "100%",
    height: 230,
    resizeMode: "cover",
    marginBottom: 10,
    justifyContent: "flex-end",
  },
  additionalInfo: {
    padding: 4,
    flexDirection: "row",
  },
  categoryTitle: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Geometria-Regular",
    backgroundColor: "#E7E453",
    padding: 4,
  },
  shopTitle: {
    color: "#43464A",
    fontSize: 13,
    fontFamily: "Geometria-Regular",
    marginBottom: 5,
  },
  productTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Geometria-Regular",
    marginBottom: 5,
  },
  priceWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  price: {
    color: "#E7E453",
    fontFamily: "Geometria-Regular",
    fontSize: 20,
    lineHeight: 20,
  },
  old_price: {
    marginLeft: 10,
    color: "#43464A",
    fontFamily: "Geometria-Regular",
    fontSize: 15,
    textDecorationLine: "line-through",
  },
});
