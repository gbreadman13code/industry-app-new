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
  useWindowDimensions,
  Platform,
} from "react-native";
import Lottie from "lottie-react-native";

import React, { useEffect, useRef, useState } from "react";
import { useNavigationState } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import ShareSvg from "../../../assets/svg/ShateSvg";
import VkSvg from "../../../assets/svg/VkSvg";
import TgSvg from "../../../assets/svg/TgSvg";
import BackButton from "../../elements/BackButton/BackButton";
import {
  getPartnerById,
  setPartnerLike,
  setPartnerUnlike,
} from "../../../queries/getPartnerById";
import { setCurrentPartnerAction } from "../../../redux/reducers/PartnersReducer";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import QuestionIcon from "../../../assets/svg/QuestionIcon";
import { PromotionWithNumber } from "./Promotions";

const PartnerProfile = ({ navigation }) => {
  const [partner, setPartner] = useState();
  const [currentPartnerId, setCurrentPartnerId] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [isModalShowing, setModalShowing] = useState(false);

  const state = useNavigationState((state) => state.routes);
  const partnerRedux = useSelector((state) => state.partners.current_partner);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!partnerRedux) return;
    setPartner(partnerRedux);
    console.log(partnerRedux);
  }, [partnerRedux]);

  useEffect(() => {
    setLoad(true);
    setCurrentPartnerId(
      state.find((item) => item.name === "Partner").params.id
    );
  }, [state]);

  useEffect(() => {
    if (!currentPartnerId) return;
    dispatch(getPartnerById(currentPartnerId, setLoad));
  }, [currentPartnerId]);

  useEffect(() => {
    return () => setModalShowing(false);
  }, []);

  // ref
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalInfoRef = useRef(null);

  // variables
  const snapPoints = ["30%"];
  const snapPointsInfo = ["50%"];

  const handleSnapPress = () => {
    bottomSheetModalRef.current?.present();
    setModalShowing(true);
  };
  const handleSnapPressInfo = () => {
    bottomSheetModalInfoRef.current?.present();
    setModalShowing(true);
  };

  const { width } = useWindowDimensions();

  const likeOrUnlike = () => {
    if (partner.is_liked) {
      dispatch(setPartnerUnlike(partner.id, setLoad));
    } else {
      dispatch(setPartnerLike(partner.id, setLoad));
    }
  };

  return isLoad ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <BackButton
          navigate={() => navigation.goBack()}
          callback={() => dispatch(setCurrentPartnerAction(false))}
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
    <BottomSheetModalProvider
      enableHandlePanningGesture={true}
      enablePanDownToClose={true}
    >
      <SafeAreaView style={styles.container}>
        <BackButton
          navigate={() => navigation.goBack()}
          callback={() => dispatch(setCurrentPartnerAction(false))}
        />
        <View style={styles.wrapper}>
          {isModalShowing && <View style={styles.blackBackdrop}></View>}

          {partner && (
            <ScrollView>
              <View style={styles.shopHeader}>
                <View style={styles.subscribeBlock}>
                  <TouchableOpacity
                    style={styles.moreInfoButton}
                    onPress={handleSnapPressInfo}
                  >
                    <Text style={styles.moreInfoButtonText}>Подробнее</Text>
                  </TouchableOpacity>
                  <ImageBackground
                    style={{
                      left: width / 2 - 52,
                      top: -42,
                      position: "absolute",
                      width: 72,
                      height: 72,

                      borderWidth: 1,
                      borderColor: "#464A88",
                    }}
                    source={{ uri: partner.cropped_image }}
                  />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      style={styles.subscribeButton}
                      onPress={likeOrUnlike}
                    >
                      <Text style={styles.subscribeButtonText}>
                        {partner.is_liked ? "Отписаться" : "Подписаться"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.subscribeButtonFAQ}
                      onPress={handleSnapPress}
                    >
                      <QuestionIcon />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.title}>{partner.title}</Text>
                {partner.address && (
                  <Text style={styles.address}>{partner.address}</Text>
                )}

                <View style={styles.iconsBlock}>
                  {/* <ShareSvg /> */}
                  {(partner.cite_link ||
                    partner.tg_link ||
                    partner.vk_link) && (
                    <View style={styles.socials}>
                      <View style={{ marginRight: 20 }}>
                        <VkSvg />
                      </View>
                      <TgSvg />
                    </View>
                  )}
                </View>
              </View>
              {partner.about && (
                <>
                  <View style={styles.yellowHeader}>
                    <Text style={styles.yellowText}>О нас</Text>
                    <View style={styles.yellowDecor}></View>
                  </View>
                  <Text style={styles.aboutDescription}>{partner.about}</Text>
                </>
              )}
              {partner.gallery_images.length > 0 && (
                <>
                  <View style={styles.yellowHeader}>
                    <Text style={styles.yellowText}>Галерея</Text>
                    <View style={styles.yellowDecor}></View>
                  </View>
                  <ScrollView horizontal={true}>
                    {partner.gallery_images.map((item, index) => (
                      <ImageBackground
                        key={index}
                        style={{ width: 120, height: 120, marginRight: 8 }}
                        source={{ uri: item.cropped_image }}
                      ></ImageBackground>
                    ))}
                  </ScrollView>
                </>
              )}
              {partner.additional_promotions.length > 0 && (
                <>
                  <View style={styles.yellowHeader}>
                    <Text style={styles.yellowText}>
                      {partner.additional_promotions.length < 2
                        ? "Акция"
                        : "Акции"}
                    </Text>
                    <View style={styles.yellowDecor}></View>
                  </View>
                  {partner.additional_promotions.map(
                    (item, index) =>
                      item.sale && (
                        <PromotionWithNumber key={index} item={item} />
                      )
                  )}
                </>
              )}
            </ScrollView>
          )}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            enableHandlePanningGesture={true}
            enablePanDownToClose={true}
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
            // backdropComponent={ModalBackdrop}
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
          {partner && (
            <BottomSheetModal
              ref={bottomSheetModalInfoRef}
              snapPoints={snapPointsInfo}
              enableHandlePanningGesture={true}
              enablePanDownToClose={true}
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
              // backdropComponent={ModalBackdrop}
              handleIndicatorStyle={{
                backgroundColor: "#464A88",
              }}
            >
              <BottomSheetScrollView>
                <View style={styles.contentContainer}>
                  <Text style={styles.modalTitle}>{partner.title}</Text>
                  {partner.address && (
                    <View>
                      <Text style={styles.modalTextTitle}>Адрес</Text>
                      <Text style={styles.modalText}>{partner.address}</Text>
                    </View>
                  )}
                  {partner.contacts && (
                    <View>
                      <Text style={styles.modalTextTitle}>
                        Контактная информация
                      </Text>
                      <Text style={styles.modalText}>{partner.contacts}</Text>
                    </View>
                  )}
                  {partner.description && (
                    <View>
                      <Text style={styles.modalTextTitle}>О партнере</Text>
                      <Text style={styles.modalText}>
                        {partner.description}
                      </Text>
                    </View>
                  )}
                </View>
              </BottomSheetScrollView>
            </BottomSheetModal>
          )}
        </View>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default PartnerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",

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

  sheetContainer: {
    // add horizontal space
    zIndex: 22222,
    // backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingVertical: 30,
    paddingHorizontal: 16,
    marginBottom: 20,
    // backgroundColor: "#ffffff",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Geometria-Bold",
    marginBottom: 16,
  },
  modalTextTitle: {
    color: "#464A88",
    fontSize: 17,
    lineHeight: 17,
    fontFamily: "Geometria-Regular",
    marginTop: 10,
    marginBottom: 5,
  },
  modalText: {
    color: "#fff",
    fontSize: 17,
    lineHeight: 22,
    fontFamily: "Geometria-Regular",
  },
  blackBackdrop: {
    position: "absolute",
    width: "110%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 10,
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
  shopHeader: {
    padding: 6,
    position: "relative",
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#464A88",
    alignItems: "center",
    marginBottom: 11,
  },
  title: {
    marginTop: 22,
    color: "#fff",
    fontSize: 20,
    fontFamily: "Geometria-Bold",
    textAlign: "center",
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
    position: "relative",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  moreInfoButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E7E453",
    padding: 5,
    marginRight: 7,
  },
  moreInfoButtonText: {
    color: "#E7E453",
    fontSize: 15,
    fontFamily: "Geometria-Regular",
  },
  subscribeButton: {
    backgroundColor: "#464A88",
    borderWidth: 1,
    borderColor: "#464A88",
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
  subscribeButtonFAQText: {
    color: "#C7CBC9",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
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
  },

  yellowHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 11,
  },
  yellowText: {
    color: "#E7E453",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  yellowDecor: {
    backgroundColor: "#E7E453",
    height: 1,
    width: "100%",
  },
  aboutDescription: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 16,
    lineHeight: 18,
  },
});
