import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BackButton from "../../elements/BackButton/BackButton";
import { useNavigationState } from "@react-navigation/native";
import { getSellerById } from "../../../queries/getSellerById";
import { useDispatch, useSelector } from "react-redux";
import { setSellerAction } from "../../../redux/reducers/SellerReducer";
import ShareSvg from "../../../assets/svg/ShateSvg";
import VkSvg from "../../../assets/svg/VkSvg";
import TgSvg from "../../../assets/svg/TgSvg";
import ProductCard from "./ProductCard";
import ModalBackdrop from "../../elements/ModalBackdrop/ModalBackdrop";
import QuestionIcon from "../../../assets/svg/QuestionIcon";
import GlobeSite from "../../../assets/svg/GlobeSite";

const SellerProfile = ({ navigation }) => {
  const [currentShopId, setCurrentShopId] = useState();
  const [idForReturn, setIdForReturn] = useState();
  const [shop, setShop] = useState();
  const [isLoad, setLoad] = useState(false);
  const [isModalShowing, setModalShowing] = useState(false);
  const state = useNavigationState((state) => state.routes);
  const shopRedux = useSelector((state) => state.shop.seller);

  const [categories, setCategories] = useState();
  const categoriesRedux = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (!categoriesRedux) return;
    setCategories(categoriesRedux);
  }, [categoriesRedux]);

  const dispatch = useDispatch();

  const linkToUrl = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    setLoad(true);
    setCurrentShopId(state.find((item) => item.name === "Seller").params.id);
    setIdForReturn(
      state.find((item) => item.name === "Seller").params.idForReturn
    );
  }, [state]);

  useEffect(() => {
    if (!currentShopId) return;
    dispatch(getSellerById(currentShopId, setLoad));
  }, [currentShopId]);

  useEffect(() => {
    if (!shopRedux) return;
    shopRedux.address = "пр. им. газеты Красноярский рабочий, д. 33";
    setShop(shopRedux);
  }, [shopRedux]);

  const navigateToProfile = (id) => {
    navigation.navigate("Product", { id: id });
  };

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = ["25%"];

  const handleSnapPress = () => {
    bottomSheetModalRef.current?.present();
    setModalShowing(true);
  };

  const handleCloseModal = () => {
    bottomSheetModalRef.current?.dismiss();
    setModalShowing(false);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <ScrollView nestedScrollEnabled={true}>
            {isModalShowing && (
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.blackBackdrop}
              ></TouchableOpacity>
            )}

            <View style={styles.headerWrap}>
              <View style={styles.backButtonWrapper}>
                <BackButton
                  navigate={() => navigateToProfile(idForReturn)}
                  callback={() => dispatch(setSellerAction(false))}
                />
              </View>
              <Text style={styles.header}>Шоурум</Text>
            </View>
            {shop && (
              <View>
                <View style={styles.shopHeader}>
                  <View style={styles.subscribeBlock}>
                    <ImageBackground
                      style={{
                        left: 12,
                        top: -42,
                        position: "absolute",
                        width: 72,
                        height: 72,

                        borderWidth: 1,
                        borderColor: "#B34382",
                      }}
                      source={{ uri: shop.cropped_image }}
                    />
                    <TouchableOpacity style={styles.subscribeButton}>
                      <Text style={styles.subscribeButtonText}>
                        Подписаться
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.subscribeButtonFAQ}
                      onPress={handleSnapPress}
                    >
                      <QuestionIcon />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      style={styles.subscribeButtonFAQ}
                      onPress={handleSnapPress}
                    >
                      <Text style={styles.subscribeButtonFAQText}>?</Text>
                    </TouchableOpacity> */}
                  </View>
                  <Text style={styles.title}>{shop.title}</Text>
                  {shop.address && (
                    <Text style={styles.address}>{shop.address}</Text>
                  )}

                  <View style={styles.iconsBlock}>
                    {/* <ShareSvg /> */}
                    {(shop.cite_link || shop.tg_link || shop.vk_link) && (
                      <View style={styles.socials}>
                        {shop.vk_link && (
                          <TouchableOpacity
                            onPress={() => linkToUrl(shop.vk_link)}
                          >
                            <VkSvg />
                          </TouchableOpacity>
                        )}
                        {shop.tg_link && (
                          <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => linkToUrl(shop.tg_link)}
                          >
                            <TgSvg />
                          </TouchableOpacity>
                        )}
                        {shop.cite_link && (
                          <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => linkToUrl(shop.cite_link)}
                          >
                            <GlobeSite />
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.catalogWrap}>
                  <View style={styles.catalogHeaderWrap}>
                    <Text style={styles.catalogHeader}>Каталог</Text>
                    <View style={styles.headDecor}></View>
                  </View>
                  {shop.products && (
                    <FlatList
                      data={shop.products}
                      style={{ height: "100%" }}
                      //   keyExtractor={item.id}
                      numColumns={2}
                      initialNumToRender={10}
                      maxToRenderPerBatch={10}
                      columnWrapperStyle={{ maxWidth: "100%" }}
                      windowSize={5}
                      renderItem={({ item, index }) => (
                        <ProductCard
                          item={item}
                          key={item.id}
                          id={item.id}
                          index={index}
                          navigation={navigateToProfile}
                          shop={shop.title}
                          category={
                            categories &&
                            categories.length > 0 &&
                            categories.filter(
                              (categoryItem) =>
                                categoryItem.id === shop.category
                            )
                          }
                          price={item.price}
                          old_price={item.old_price}
                          imgUrl={item.cropped_image}
                          title={item.title}
                        />
                      )}
                    />
                  )}
                </View>
              </View>
            )}
            <View>
              <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                // add bottom inset to elevate the sheet
                bottomInset={0}
                index={0}
                // set `detached` to true
                onDismiss={() => setModalShowing(false)}
                detached={true}
                style={styles.sheetContainer}
                backgroundStyle={{
                  backgroundColor: "#121212",
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                backdropComponent={ModalBackdrop}
                handleIndicatorStyle={{
                  backgroundColor: "#464A88",
                }}
              >
                <View style={styles.contentContainer}>
                  <Text style={styles.modalTitle}>Что даёт подписка?</Text>
                  <Text style={styles.modalText}>
                    Подписавшись на партнёра, вы сможете получать уведомления о
                    новостях, актуальных продуктах и прочую информацию,
                    предоставляемую им.
                  </Text>
                </View>
              </BottomSheetModal>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default SellerProfile;

const styles = StyleSheet.create({
  sheetContainer: {
    // add horizontal space
    zIndex: 22222,
    // backgroundColor: "#121212",
  },
  contentContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingVertical: 30,
    paddingHorizontal: 16,
    // backgroundColor: "#121212",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Geometria-Bold",
    marginBottom: 10,
  },
  modalText: {
    color: "#fff",
    fontSize: 17,
    lineHeight: 17,
    fontFamily: "Geometria-Regular",
  },
  container: {
    flex: 1,
  },
  blackBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 10,
  },
  catalogWrap: {
    marginTop: 30,
  },
  catalogHeaderWrap: {
    flexDirection: "row",
    marginBottom: 15,
  },

  catalogHeader: {
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
  wrapper: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    // paddingBottom: 30,
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backButtonWrapper: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  header: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    textAlign: "center",
    fontSize: 20,
    marginTop: 12,
    marginBottom: 15,
  },

  shopHeader: {
    padding: 6,
    position: "relative",
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#B34382",
    alignItems: "center",
  },
  title: {
    marginTop: 22,
    color: "#fff",
    fontSize: 20,
    fontFamily: "Geometria-Bold",
  },
  address: {
    color: "#C7CBC9",
    fontSize: 14,
    fontFamily: "Geometria-Regular",
    marginVertical: 5,
  },
  subscribeBlock: {
    // alignSelf: "flex-end",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  subscribeButton: {
    backgroundColor: "#B34382",
    padding: 5,
    marginRight: 7,
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Geometria-Regular",
  },
  subscribeButtonFAQ: {
    width: 20,
    height: 19,
  },
  iconsBlock: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 30,
  },
  socials: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
});
