import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../queries/getCategories";
// import SvgUri from "react-native-svg-uri";
import Lottie from "lottie-react-native";

import { getNextProducts, getProducts } from "../../../queries/getProducts";
import ProductCard from "./ProductCard";
import SortArrowUp from "../../../assets/svg/SortArrowUp";
import SortArrowDown from "../../../assets/svg/SortArrowDown";
import { useFocusEffect } from "@react-navigation/native";

const ShowroomScreen = ({ navigation }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [sortToUp, setSortToUp] = useState(false);
  const [sortToDown, setSortToDown] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [isLoadProducts, setLoadProducts] = useState(false);
  const [isLoadNextProducts, setLoadNextProducts] = useState(false);
  const categoriesRedux = useSelector((state) => state.categories.categories);
  const productsRedux = useSelector((state) => state.products.products);
  const nextRedux = useSelector((state) => state.products.next);
  const dispatch = useDispatch();

  const sortingByPrice = () => {
    if (!sortByPrice) {
      setSortByPrice(true);
      setSortToUp(true);
    } else {
      if (sortToUp) {
        setSortToUp(false);
        setSortToDown(true);
      } else {
        setSortToDown(false);
        setSortByPrice(false);
      }
    }
  };

  const navigateToProfile = (id) => {
    navigation.navigate("Product", { id: id });
  };

  const categoryClickHandler = (categoryId) => {
    if (activeCategories.includes(categoryId)) {
      setActiveCategories(
        activeCategories.filter((item) => item !== categoryId)
      );
    } else {
      setActiveCategories((prevState) => [...prevState, categoryId]);
    }
  };

  useEffect(() => {
    setLoadProducts(true);

    let sort_parametres_array = [];
    if (sortToDown) sort_parametres_array.push("sort=price_reverse");
    if (sortToUp) sort_parametres_array.push("sort=price");
    if (activeCategories.length > 0) {
      activeCategories.map((item) =>
        sort_parametres_array.push("category=" + item)
      );
    }
    const sort_parametres = sort_parametres_array.join("&");

    dispatch(getProducts(sort_parametres, setLoad, setLoadProducts));
  }, [dispatch, activeCategories, sortToDown, sortToUp]);

  useEffect(() => {
    if (!categoriesRedux || categoriesRedux.length < 1) return;
    setCategories(categoriesRedux);
  }, [categoriesRedux]);

  useEffect(() => {
    if (!productsRedux || productsRedux.length < 1) return;
    setProducts(productsRedux);
  }, [productsRedux]);

  useEffect(() => {
    setLoad(true);
    dispatch(getCategories());
  }, [dispatch]);

  const loadNextProducts = () => {
    if (!nextRedux) return;
    setLoadNextProducts(true);
    dispatch(
      getNextProducts(nextRedux, setLoad, setLoadProducts, setLoadNextProducts)
    );
  };

  return isLoad ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Каталог</Text>

        <View style={styles.lottieContainer}>
          <Lottie
            source={require("../../../assets/img/lotties/loader-square.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      </View>
    </SafeAreaView>
  ) : isLoadProducts ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrap}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={!isLoad && !isLoadProducts ? sortingByPrice : null}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: sortByPrice ? "#E7E453" : "#43464A",
              borderWidth: 1,
              marginRight: 8,
              padding: 4,
              position: "absolute",
              left: 0,
              top: 0,
            }}
          >
            <View>
              <SortArrowUp fill={sortToUp ? "#E7E453" : "#43464A"} />
            </View>
            <View>
              <SortArrowDown fill={sortToDown ? "#E7E453" : "#43464A"} />
            </View>
          </TouchableOpacity>
          <Text style={styles.header}>Каталог</Text>
        </View>
        {categories && (
          <View style={styles.sort}>
            {categories.length > 0 &&
              categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={{
                    borderColor: activeCategories.includes(item.id)
                      ? "#E7E453"
                      : "#43464A",
                    borderWidth: 1,
                    padding: 4,
                  }}
                  onPress={() =>
                    !isLoadProducts ? categoryClickHandler(item.id) : null
                  }
                >
                  <Text
                    style={{
                      color: activeCategories.includes(item.id)
                        ? "#E7E453"
                        : "#43464A",
                      fontFamily: activeCategories.includes(item.id)
                        ? "Geometria-Bold"
                        : "Geometria-Regular",
                      fontSize: 14,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            {/* <FlatList
              horizontal={true}
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      borderColor: activeCategories.includes(item.item.id)
                        ? "#E7E453"
                        : "#43464A",
                      borderWidth: 1,
                      marginRight: 8,
                      padding: 4,
                    }}
                    onPress={() => categoryClickHandler(item.item.id)}
                  >
                    <Text
                      style={{
                        color: activeCategories.includes(item.item.id)
                          ? "#E7E453"
                          : "#43464A",
                        fontFamily: activeCategories.includes(item.item.id)
                          ? "Geometria-Bold"
                          : "Geometria-Regular",
                        fontSize: 14,
                      }}
                    >
                      {item.item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            /> */}
          </View>
        )}
        <View style={styles.lottieContainer}>
          <Lottie
            source={require("../../../assets/img/lotties/loader-square.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrap}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={!isLoad && !isLoadProducts ? sortingByPrice : null}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: sortByPrice ? "#E7E453" : "#43464A",
              borderWidth: 1,
              padding: 4,
              position: "absolute",
              left: 0,
              top: 0,
            }}
          >
            <View>
              <SortArrowUp fill={sortToUp ? "#E7E453" : "#43464A"} />
            </View>
            <View>
              <SortArrowDown fill={sortToDown ? "#E7E453" : "#43464A"} />
            </View>
          </TouchableOpacity>
          <Text style={styles.header}>Каталог</Text>
        </View>
        {categories && (
          <View style={styles.sort}>
            {categories.length > 0 &&
              categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={{
                    borderColor: activeCategories.includes(item.id)
                      ? "#E7E453"
                      : "#43464A",
                    borderWidth: 1,
                    padding: 4,
                  }}
                  onPress={() => categoryClickHandler(item.id)}
                >
                  <Text
                    style={{
                      color: activeCategories.includes(item.id)
                        ? "#E7E453"
                        : "#43464A",
                      fontFamily: activeCategories.includes(item.id)
                        ? "Geometria-Bold"
                        : "Geometria-Regular",
                      fontSize: 14,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            {/* <FlatList
              horizontal={true}
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      borderColor: activeCategories.includes(item.item.id)
                        ? "#E7E453"
                        : "#43464A",
                      borderWidth: 1,
                      marginRight: 8,
                      padding: 4,
                    }}
                    onPress={() => categoryClickHandler(item.item.id)}
                  >
                    <Text
                      style={{
                        color: activeCategories.includes(item.item.id)
                          ? "#E7E453"
                          : "#43464A",
                        fontFamily: activeCategories.includes(item.item.id)
                          ? "Geometria-Bold"
                          : "Geometria-Regular",
                        fontSize: 14,
                      }}
                    >
                      {item.item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            /> */}
          </View>
        )}
        {products && (
          <>
            <FlatList
              data={products}
              keyExtractor={() => Date.now() + Math.random()}
              numColumns={2}
              initialNumToRender={10}
              maxToRenderPerBatch={30}
              onEndReachedThreshold={90}
              ListFooterComponent={
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Geometria-Bold",
                    textAlign: "center",
                    marginVertical: isLoadNextProducts ? 100 : 0,
                  }}
                >
                  {isLoadNextProducts && "Загрузка..."}
                </Text>
              }
              onEndReached={(e) =>
                e.distanceFromEnd < 1000 && loadNextProducts()
              }
              columnWrapperStyle={{ maxWidth: "100%" }}
              windowSize={5}
              renderItem={({ item, index }) => (
                <ProductCard
                  item={item}
                  id={item.id}
                  index={index}
                  navigation={navigateToProfile}
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
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ShowroomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    backgroundColor: "#000",
    width: 200,
    height: 120,
  },
  wrapper: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
    paddingHorizontal: 10,
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 15,
    marginTop: 12,
  },
  header: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    textAlign: "center",
    fontSize: 20,
  },
  sort: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
});
