import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Audio } from "expo-av";
import AudioScreen from "./AudioScreen";
import ArticlesScreen from "./ArticlesScreen";
import ArticleScreenContainer from "./ArticleScreenContainer";
import { useDispatch, useSelector } from "react-redux";
import ArrowBack from "../../../assets/svg/ArrowBack";
import BackButton from "../../elements/BackButton/BackButton";
import { setCurrentArticleAction } from "../../../redux/reducers/ArticleReducer";
import VideoList from "./VideoList";
import { setCurrentVideoAction } from "../../../redux/reducers/VideoInstanceReducer";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import AllMediaScreenContainer from "./AllMediaScreenContainer";
import { setNewMeiaRouterAction } from "../../../redux/reducers/MainPaigeReducer";

const BlogScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [outerParams, setOuterParams] = useState(false);

  const videoRedux = useSelector((state) => state.video.video);
  const currentVideoRedux = useSelector((state) => state.video.current_video);

  const media_router = useSelector((state) => state.main_page.media_router);

  const is_article_profile = useSelector(
    (state) => state.location.is_article_profile
  );

  const state = useNavigationState((state) => state.routes);

  // useEffect(() => {
  //   const blogScreen = state.find((item) => item.name === "Медиа");
  //   if (blogScreen && blogScreen.params && blogScreen.params.moveTo) {
  //     const currentPageElement = pageArray.find(
  //       (item) => item.title === blogScreen.params.moveTo
  //     );
  //     if (currentPageElement) {
  //       setCurrentPage(currentPageElement.id);
  //       // blogScreen.params = undefined;
  //     }
  //   }
  // }, [state]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPage.title !== "videos") {
      if (currentVideoRedux) {
        const stopVideo = async () => {
          dispatch(setCurrentVideoAction(false));
        };

        stopVideo();
      }
    }
  }, [currentPage]);

  useEffect(() => {
    if (!is_article_profile) setShowHeader(true);
    else setShowHeader(false);
  }, [is_article_profile]);

  useFocusEffect(
    useCallback(() => {
      if (media_router) {
        const currentPageElement = pageArray.find(
          (item) => item.title === media_router
        );
        if (currentPageElement) {
          setCurrentPage(currentPageElement.id);
        }
      }
      return async () => {
        dispatch(setNewMeiaRouterAction(false));
        if (currentVideoRedux) {
          dispatch(setCurrentVideoAction(false));
        }
      };
    }, [media_router])
  );

  const pageArray = [
    { id: 0, title: "all", text: "все", color: "#E7E453" },
    { id: 1, title: "podcasts", text: "подкасты", color: "#B34382" },
    { id: 2, title: "videos", text: "видео", color: "#464A88" },
    { id: 3, title: "articles", text: "статьи", color: "#55A290" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!showHeader && (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <BackButton
                navigate={() => navigation.goBack()}
                callback={() => dispatch(setCurrentArticleAction(false))}
              />
            </View>
          )}
          <Text style={styles.header}>Блог</Text>
        </View>
        <View style={styles.pageWrapper}>
          {pageArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentPage(item.id)}
              style={styles.pageItem}
            >
              {currentPage === item.id && (
                <View
                  style={[styles.pageSquare, { backgroundColor: item.color }]}
                ></View>
              )}

              <Text
                style={[
                  styles.pageText,
                  { color: currentPage === item.id ? item.color : "#fff" },
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {pageArray.find((item) => item.title === "all").id === currentPage && (
          <AllMediaScreenContainer navigation={navigation} />
        )}
        {pageArray.find((item) => item.title === "podcasts").id ===
          currentPage && <AudioScreen />}
        {pageArray.find((item) => item.title === "articles").id ===
          currentPage && <ArticleScreenContainer navigation={navigation} />}
        {pageArray.find((item) => item.title === "videos").id ===
          currentPage && <VideoList navigation={navigation} />}
      </View>
    </SafeAreaView>
  );
};

export default BlogScreen;

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
    fontSize: 16,
    marginBottom: 15,
  },
  pageWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageItem: {
    alignItems: "center",
  },
  pageSquare: {
    width: 8,
    height: 8,
    marginBottom: 20,
  },
  pageText: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
  },
});
