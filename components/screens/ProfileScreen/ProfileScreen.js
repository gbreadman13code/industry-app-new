import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CustomButton from "../../elements/CustomButton/CustomButton";
import { logout } from "../../../queries/logout";
import { useDispatch, useSelector } from "react-redux";
import QuestionIcon from "../../../assets/svg/QuestionIcon";
import ShareSvg from "../../../assets/svg/ShateSvg";
import { getLkedPartners } from "../../../queries/getPartners";
import { getLikedProducts } from "../../../queries/getProducts";
import FavoritePartners from "./FavoriteItems/FavoritePartners";
import FavoriteProducts from "./FavoriteItems/FavoriteProducts";
import FavoritePodcasts from "./FavoriteItems/FavoritePodcasts";
import FavoriteVideos from "./FavoriteItems/FavoriteVideos";
import FavoriteArticles from "./FavoriteItems/FavoriteArticles";
import ProductsInBascket from "./FavoriteItems/ProductsInBascket";

import { useFocusEffect, useRoute } from "@react-navigation/native";
import AllOrders from "./FavoriteItems/AllOrders";
import { getUserData } from "../../../queries/getUserData";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const [productsCount, setProductsCount] = useState(0);
  const [videosCount, setVideosCount] = useState(0);
  const [podcastsCount, setPodcastsCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);

  const personalInfo = useSelector((state) => state.personal_info.userData);

  useEffect(() => {
    if (!personalInfo.first_name) return;
    setUser(personalInfo);
  }, [personalInfo]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserData());
      return () => {};
    }, [])
  );

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Профиль</Text>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.shopHeader}>
            <View style={styles.subscribeBlock}>
              <TouchableOpacity
                style={styles.moreInfoButton}
                onPress={() => navigation.navigate("Settings")}
              >
                <Text style={styles.moreInfoButtonText}>Настройки</Text>
              </TouchableOpacity>
              <View
                style={{
                  left: 0,
                  top: -42,
                  position: "absolute",
                  width: 72,
                  height: 72,
                  backgroundColor: "#E7E453",

                  borderWidth: 1,
                  borderColor: "#E7E453",

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {user && (
                  <Text style={{ fontSize: 18, fontFamily: "Geometria-Bold" }}>
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.subscribeButton}
                  onPress={() => navigation.navigate("EditInfo")}
                >
                  <Text style={styles.subscribeButtonText}>Редактировать</Text>
                </TouchableOpacity>
              </View>
            </View>
            {user && (
              <>
                <Text style={styles.title}>
                  {user.first_name} {user.last_name}
                </Text>
                <Text style={styles.address}>{user.email}</Text>
              </>
            )}
          </View>

          <FavoritePartners navigation={navigation} />

          <ProductsInBascket navigation={navigation} />

          <AllOrders navigation={navigation} />

          {productsCount + videosCount + podcastsCount + articlesCount > 0 && (
            <View style={styles.yellowHeader_more}>
              <Text style={styles.yellowText_more}>Вам понравилось</Text>
              <View style={styles.yellowDecor_more}></View>

              <TouchableOpacity activeOpacity={1}>
                <Text style={styles.yellowText_more_end}>
                  {productsCount + videosCount + podcastsCount + articlesCount}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <FavoriteProducts
            navigation={navigation}
            setProductsCount={setProductsCount}
          />
          {/* Вам понравилось: Товары */}
          <FavoritePodcasts setPodcastsCount={setPodcastsCount} />
          {/* Вам понравилось: Подкасты */}
          <FavoriteVideos setVideosCount={setVideosCount} />
          {/* Вам понравилось: Видео */}
          <FavoriteArticles
            navigation={navigation}
            setArticlesCount={setArticlesCount}
          />
          {/* Вам понравилось: Статьи */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
    paddingHorizontal: 10,
  },
  header: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    textAlign: "center",
    marginTop: 12,
    fontSize: 20,
    marginBottom: 15,
  },
  shopHeader: {
    padding: 6,
    position: "relative",
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#E7E453",
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
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  moreInfoButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#B34382",
    padding: 5,
    marginRight: 7,
  },
  moreInfoButtonText: {
    color: "#B34382",
    fontSize: 15,
    fontFamily: "Geometria-Regular",
  },
  subscribeButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#464A88",
    padding: 5,
    // marginRight: 7,
  },
  subscribeButtonText: {
    color: "#464A88",
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
    justifyContent: "space-between",
    marginTop: 30,
  },
  socials: {
    flexDirection: "row",
    alignItems: "center",
  },
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
