import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../../elements/Container/Container";
import MainPageLogo from "../../../assets/svg/MainPageLogo";
import NotificationIcon from "../../../assets/svg/NotificationIcon";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getMainPaigeContent } from "../../../queries/getMainPaigeContent";
import { ImageBackground } from "react-native";
import HomeSreenSmallItem from "./HomeSreenSmallItem";
import { setGastronomyIdAction } from "../../../redux/reducers/GastronomyReducer";
import { setNewMeiaRouterAction } from "../../../redux/reducers/MainPaigeReducer";

const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState({});

  const mainPageItemsRedux = useSelector(
    (state) => state.main_page.main_page_content
  );

  const navigateTo = (link) => {
    navigation.navigate(link);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setItems(mainPageItemsRedux);
  }, [mainPageItemsRedux]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getMainPaigeContent());
    }, [])
  );

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrap}>
          <MainPageLogo />
          {/* <View style={styles.notification}>
            <NotificationIcon />
          </View> */}
        </View>
        <View>
          <ScrollView
            contentContainerStyle={
              {
                // flex: 1,
              }
            }
          >
            {items.places && (
              <TouchableOpacity onPress={() => navigateTo("Events")}>
                <ImageBackground
                  source={{ uri: items.places.file }}
                  style={{
                    width: width - 20,
                    height: (width - 20) * 0.46,
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={[styles.blackLine]}>
                    <Text style={styles.blackLineText}>
                      {items.places.text}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 10,
              }}
            >
              {items.showroom && (
                <TouchableOpacity onPress={() => navigateTo("Шоурум")}>
                  <HomeSreenSmallItem item={items.showroom} color={"#B34382"} />
                </TouchableOpacity>
              )}
              {items.watching && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setNewMeiaRouterAction("videos"));
                    navigateTo("Медиа");
                  }}
                >
                  <HomeSreenSmallItem item={items.watching} color={"#E7E453"} />
                </TouchableOpacity>
              )}
              {items.listening && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setNewMeiaRouterAction("podcasts"));
                    navigateTo("Медиа");
                  }}
                >
                  <HomeSreenSmallItem
                    item={items.listening}
                    color={"#464A88"}
                  />
                </TouchableOpacity>
              )}
              {items.eating && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      setGastronomyIdAction(
                        items.eating.eating_partner_category_id
                      )
                    );
                    navigateTo("Партнеры");
                  }}
                >
                  <HomeSreenSmallItem item={items.eating} color={"#55A290"} />
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    paddingBottom: 40,
    transform: "scale(1.4)",
  },
  header: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
  },
  notification: {
    position: "absolute",
    top: 5,
    right: 0,
  },
  blackLine: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  blackLineText: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 16,
  },
});
