import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import Lottie from "lottie-react-native";

import { useWindowDimensions } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigationState } from "@react-navigation/native";
import {
  getProductById,
  setLikeProduct,
  setUnlikeProduct,
} from "../../../queries/getProductById";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native";
import { setCurrentProductAction } from "../../../redux/reducers/ProductsReducer";
import ShareSvg from "../../../assets/svg/ShateSvg";
import HTMLView from "react-native-htmlview";
import RenderHtml from "react-native-render-html";
import Constants from "expo-constants";
import SellerItemForProductProfile from "./SellerItemForProductProfile";
import InterestedProducts from "./InterestedProducts";
import BackButton from "../../elements/BackButton/BackButton";
import Like from "../../../assets/svg/Like";
import Unlike from "../../../assets/svg/Unlike";
import {
  addProductToBascketAction,
  deleteProductToBascketAction,
} from "../../../redux/reducers/BascketReducer";

const ProductProfile = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [currentProductId, setCurrentProductId] = useState(false);
  const [currentFullImage, setCurrentFullImage] = useState();
  const [isLoad, setLoad] = useState(false);
  const [inBasketYet, setInBasketYet] = useState(false);
  const [isShowModal, setShowModal] = useState(true);
  const state = useNavigationState((state) => state.routes);
  const productRedux = useSelector((state) => state.products.current_product);
  const ordersRedux = useSelector((state) => state.bascket);

  useEffect(() => {
    if (!product) return;
    const isIn = ordersRedux.basketProductsIds.includes(Number(product.id));
    setInBasketYet(isIn);
  }, [ordersRedux, product]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const navigateToProfile = (id) => {
    setLoad(true);
    navigation.navigate("Product", { id: id });
  };

  const navigateToShop = (id) => {
    navigation.navigate("Seller", { id: id, idForReturn: product.id });
  };

  const systemFonts = [...Constants.systemFonts, "Geometria-Regular"];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!productRedux) return;
    const modyfiedArray = productRedux;
    modyfiedArray.additional_photos.unshift({
      image: modyfiedArray.image,
      cropped_image: modyfiedArray.cropped_image,
      id: Date.now(),
    });
    setProduct(modyfiedArray);
    setCurrentFullImage(modyfiedArray.additional_photos[0]);
  }, [productRedux]);

  const croppedImagePressHandler = (e, id) => {
    const newFullImg = product.additional_photos.find((item) => item.id === id);
    setCurrentFullImage(newFullImg);
  };

  useEffect(() => {
    if (
      state.find((item) => item.name === "Product").params.id !==
      currentProductId
    ) {
      setLoad(true);
    }
    setCurrentProductId(
      state.find((item) => item.name === "Product").params.id
    );
  }, [state]);

  useEffect(() => {
    if (!currentProductId) return;
    dispatch(getProductById(currentProductId, setLoad));
  }, [currentProductId]);

  const likeOrUnlike = () => {
    if (product.is_liked) {
      dispatch(setUnlikeProduct(product.id));
    } else {
      dispatch(setLikeProduct(product.id));
    }
  };

  const addProduct = (product) => {
    product.localCount = 1;
    dispatch(addProductToBascketAction(product));
  };

  const memoizedInterestedProducts = useMemo(() => {
    if (!product) return;
    return product.recommendations;
  }, [product]);

  const { width } = useWindowDimensions();

  return isLoad ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <BackButton
          navigate={() => navigation.goBack()}
          callback={() => dispatch(setCurrentProductAction(false))}
        />
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
      {isShowModal && <View></View>}

      <View style={styles.wrapper}>
        <BackButton
          navigate={() => navigation.goBack()}
          callback={() => dispatch(setCurrentProductAction(false))}
        />
        {product && (
          <>
            <View style={styles.headerWrap}>
              <Text style={styles.header}>{product.title}</Text>
              <View style={styles.headDecor}></View>
            </View>
            <ScrollView>
              <View style={styles.imgWrap}>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={{
                    flex: 1,
                    width: "25%",
                    height: 314,
                    overflow: "hidden",
                  }}
                >
                  {product.additional_photos.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={(e) => croppedImagePressHandler(e, item.id)}
                      style={{ position: "relative" }}
                    >
                      {item.id !== currentFullImage.id && (
                        <View style={styles.nonActiveImage}></View>
                      )}
                      <Image
                        source={{ uri: item.cropped_image }}
                        style={{
                          height: 100,
                          width: "100%",
                          marginBottom: 7,
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                  {/* <FlatList
                    data={product.additional_photos}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => croppedImagePressHandler(item.id)}
                        style={{ position: "relative" }}
                      >
                        {item.id !== currentFullImage.id && (
                          <View style={styles.nonActiveImage}></View>
                        )}
                        <Image
                          source={{ uri: item.cropped_image }}
                          style={{
                            height: 100,
                            width: "100%",
                            marginBottom: 7,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  /> */}
                </ScrollView>
                <View style={{ width: "75%", marginLeft: 7 }}>
                  {currentFullImage && (
                    <ImageBackground
                      source={{ uri: currentFullImage.cropped_image }}
                      style={{ height: 314 }}
                    />
                  )}
                </View>
              </View>

              <View>
                <View style={styles.priceInfo}>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text style={styles.price}>{product.price} ₽</Text>
                    {product.old_price && (
                      <Text style={styles.old_price}>
                        {product.old_price} ₽
                      </Text>
                    )}
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={likeOrUnlike}
                      style={{ marginRight: 15 }}
                    >
                      {product.is_liked ? <Like /> : <Unlike />}
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                      <View>
                        <ShareSvg />
                      </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      onPress={() =>
                        inBasketYet
                          ? dispatch(deleteProductToBascketAction(product.id))
                          : addProduct(product)
                      }
                      style={{
                        backgroundColor: inBasketYet ? "#000" : "#E7E453",
                        borderWidth: 1,
                        borderColor: "#E7E453",
                        padding: 4,
                        marginLeft: 23,
                      }}
                    >
                      <Text
                        style={{
                          color: inBasketYet ? "#E7E453" : "#000",
                          fontSize: 20,
                          fontFamily: "Geometria-Regular",
                        }}
                      >
                        {inBasketYet ? "В корзине" : "В корзину"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {product.description && product.description.includes("<p") ? (
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: product.description }}
                    tagsStyles={description}
                    enableExperimentalMarginCollapsing={true}
                    systemFonts={systemFonts}
                  />
                ) : (
                  <Text style={styles.description}>{product.description}</Text>
                )}
              </View>
              <SellerItemForProductProfile
                title={product.shop.title}
                url={product.shop.cropped_image}
                address={product.shop.address}
                id={product.shop.id}
                navigate={navigateToShop}
              />
              <InterestedProducts
                products={memoizedInterestedProducts}
                navigation={navigateToProfile}
              />
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductProfile;

const description = StyleSheet.create({
  p: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 17,
    lineHeight: 19,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // marginBottom: 50,
  },
  description: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 17,
    lineHeight: 19,
  },
  wrapper: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    // paddingBottom: 30,
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
  imgWrap: {
    flexDirection: "row",
  },
  nonActiveImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    opacity: 0.7,
    zIndex: 100,
  },
  priceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  price: {
    color: "#E7E453",
    fontFamily: "Geometria-Bold",
    fontSize: 24,
    marginRight: 5,
  },
  old_price: {
    color: "#43464A",
    fontFamily: "Geometria-Regular",
    fontSize: 18,
    textDecorationLine: "line-through",
    marginLeft: 10,
  },
  lottie: {
    backgroundColor: "#000",
    width: 200,
    height: 120,
  },
  lottieContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
