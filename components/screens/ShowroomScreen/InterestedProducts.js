import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const InterestedProducts = ({ products, navigation }) => {
  const [categories, setCategories] = useState();
  const categoriesRedux = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (!categoriesRedux) return;
    setCategories(categoriesRedux);
  }, [categoriesRedux]);
  return (
    <View style={styles.container}>
      <View style={styles.headerWrap}>
        <Text style={styles.header}>Может быть интересно</Text>
        <View style={styles.headDecor}></View>
      </View>
      <View style={styles.rowItem}>
        {products.map(
          (item, index) =>
            index < 2 && (
              <ProductCard
                item={item}
                key={index}
                id={item.id}
                index={index}
                navigation={navigation}
                shop={item.shop.title}
                category={
                  categories &&
                  categories.filter(
                    (category) => category.id === item.shop.category
                  )
                }
                price={item.price}
                old_price={item.old_price}
                imgUrl={item.cropped_image}
                title={item.title}
              />
            )
        )}
      </View>
      <View style={styles.rowItem}>
        {products.map(
          (item, index) =>
            index > 1 && (
              <ProductCard
                item={item}
                key={index}
                id={item.id}
                index={index}
                navigation={navigation}
                shop={item.shop.title}
                category={
                  categories &&
                  categories.filter(
                    (category) => category.id === item.shop.category
                  )
                }
                price={item.price}
                old_price={item.old_price}
                imgUrl={item.cropped_image}
                title={item.title}
              />
            )
        )}
      </View>
    </View>
  );
};

export default InterestedProducts;

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
  },
  headerWrap: {
    flexDirection: "row",
    marginBottom: 15,
  },
  header: {
    color: "#E7E453",
    fontFamily: "Geometria-Regular",
    textAlign: "left",
    fontSize: 18,
    maxWidth: "70%",
  },
  headDecor: {
    width: "100%",
    height: 1,
    backgroundColor: "#E7E453",
    marginLeft: 5,
    marginTop: 8,
  },
});
