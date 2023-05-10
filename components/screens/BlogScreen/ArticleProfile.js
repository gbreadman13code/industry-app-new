import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigationState, useRoute } from "@react-navigation/native";
import RenderHtml from "react-native-render-html";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../elements/BackButton/BackButton";
import {
  getArticleById,
  setArticleLike,
  setArticleUnLike,
} from "../../../queries/getArticleById";
import { setCurrentArticleAction } from "../../../redux/reducers/ArticleReducer";
import Lottie from "lottie-react-native";
import { formateDate } from "../../../functions/formateDate";
import { roundNum } from "../../../functions/formateReadingTime";
import ShareSvg from "../../../assets/svg/ShateSvg";
import { getGrades } from "../../../queries/getGrades";
import FullStar from "../../../assets/svg/FullStar";
import EmptyStar from "../../../assets/svg/EmptyStar";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setGrades } from "../../../queries/setGrades";
import ArticlesItem from "./ArticlesItem";
import { useLocation } from "react-router-dom";
import { setLocationArticleProfileAction } from "../../../redux/reducers/LocationReducer";
import Unlike from "../../../assets/svg/Unlike";
import Like from "../../../assets/svg/Like";
import { getArticles } from "../../../queries/getArticles";

const ArticleProfile = ({ navigation }) => {
  const [currentArticleId, setCurrentArticleId] = useState();
  const [currentArticle, setCurrentArticle] = useState(false);
  const [userGrade, setUserGrade] = useState();
  const [isLoad, setLoad] = useState(false);
  const [grade, setGrade] = useState(0);
  const [isParentProfile, setParentProfile] = useState(false);

  const state = useNavigationState((state) => state.routes);
  const articleRedux = useSelector((state) => state.articles.current_article);
  const articles = useSelector((state) => state.articles.articles);
  const gradesRedux = useSelector((state) => state.grades.grades);
  const dispatch = useDispatch();

  const memoizedSystemFonts = useMemo(() => {
    return [...Constants.systemFonts, "Geometria-Regular"];
  }, [Constants.systemFonts]);

  const route = useRoute();

  useEffect(() => {
    setLoad(true);
    setCurrentArticleId(
      state.find((item) => item.name === "ArticleProfile").params.id
    );
    setParentProfile(
      state.find((item) => item.name === "ArticleProfile").params.parent ===
        "profile"
    );
  }, [state]);

  useEffect(() => {
    if (!grade) return;
    if (typeof grade !== "number") return;
    if (grade < 1) return;
    dispatch(setGrades({ article: currentArticle.id, grade: grade }));
  }, [grade]);

  useFocusEffect(
    useCallback(() => {
      dispatch(setLocationArticleProfileAction(true));
      dispatch(getArticles());
      return () => {
        dispatch(setCurrentArticleAction(false));
        dispatch(setLocationArticleProfileAction(false));
      };
    }, [])
  );

  useEffect(() => {
    if (!gradesRedux) return;
    if (!currentArticle) return;

    const isGraded = gradesRedux.find(
      (item) => item.article === currentArticle.id
    );
    if (isGraded) {
      let gradeArr = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= isGraded.grade) gradeArr.push(true);
        else gradeArr.push(false);
      }
      setUserGrade(gradeArr);
    } else {
      setUserGrade();
      setGrade(0);
    }
  }, [gradesRedux, currentArticle]);

  useEffect(() => {
    if (!articleRedux) return;
    setCurrentArticle(articleRedux);
  }, [articleRedux]);

  useEffect(() => {
    if (!currentArticleId) return;
    dispatch(getArticleById(currentArticleId, setLoad));
  }, [currentArticleId]);

  useEffect(() => {
    dispatch(getGrades());
  }, [dispatch]);

  const { width } = useWindowDimensions();

  const getRandomItem = (item, array) => {
    if (!array) return;
    if (array.length === 1) {
      return <ArticlesItem item={item} navigation={navigation} />;
    }
    let randomIndex;
    const currentIndex = array.findIndex((article) => article.id === item.id);

    const getRandomMinMax = (min, max) => {
      return Math.round(min + Math.random() * (max - min));
    };
    while (randomIndex === undefined || randomIndex === currentIndex) {
      randomIndex = getRandomMinMax(0, array.length - 1);
    }

    return <ArticlesItem item={array[randomIndex]} navigation={navigation} />;
  };

  const MemoizedRandomItem = useMemo(
    () => getRandomItem(currentArticle, articles),
    [currentArticle, articles]
  );

  const likeOrUnlike = () => {
    if (currentArticle.is_liked) {
      dispatch(setArticleUnLike(currentArticle.id, setLoad));
    } else {
      dispatch(setArticleLike(currentArticle.id, setLoad));
    }
  };

  return isLoad ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
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
      <ScrollView style={styles.wrapper}>
        {isParentProfile && <BackButton navigate={() => navigation.goBack()} />}

        {currentArticle && (
          <>
            <ImageBackground
              style={{ width: "100%", height: 228, marginTop: 20 }}
              source={{ uri: currentArticle.image }}
            ></ImageBackground>
            <Text style={styles.title}>{currentArticle.title}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 30,
                marginBottom: 17,
              }}
            >
              <View style={styles.articleInfo}>
                <Text style={styles.articleInfoText}>
                  {formateDate(currentArticle.date)}
                </Text>
                <Text style={styles.articleInfoDecor}> {">"} </Text>
                <Text style={styles.articleInfoText}>
                  {roundNum(currentArticle.reading_time)} мин.
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <ShareSvg /> */}
                <TouchableOpacity
                  onPress={likeOrUnlike}
                  style={{ marginLeft: 15 }}
                >
                  {currentArticle.is_liked ? <Like /> : <Unlike />}
                </TouchableOpacity>
              </View>
            </View>
            {currentArticle.text && currentArticle.text.includes("<p>") ? (
              <RenderHtml
                contentWidth={width}
                source={{ html: currentArticle.text }}
                tagsStyles={description}
                enableExperimentalMarginCollapsing={true}
                systemFonts={memoizedSystemFonts}
              />
            ) : (
              <Text style={styles.description}>{currentArticle.text}</Text>
            )}
            <View style={styles.yellowHeader}>
              <Text style={styles.yellowText}>
                {userGrade ? "Вы оценили статью" : "Оцените статью"}
              </Text>
              <View style={styles.yellowDecor}></View>
            </View>
            <View style={styles.gradeContainer}>
              {userGrade ? (
                userGrade.map((item, index) =>
                  item ? (
                    <FullStar
                      key={index}
                      style={index === 5 ? { marginRight: 0 } : {}}
                    />
                  ) : (
                    <EmptyStar
                      key={index}
                      style={index === 5 ? { marginRight: 0 } : {}}
                    />
                  )
                )
              ) : (
                <>
                  <TouchableOpacity onPressIn={() => setGrade(1)}>
                    {grade >= 1 ? <FullStar /> : <EmptyStar />}
                  </TouchableOpacity>
                  <TouchableOpacity onPressIn={() => setGrade(2)}>
                    {grade >= 2 ? <FullStar /> : <EmptyStar />}
                  </TouchableOpacity>
                  <TouchableOpacity onPressIn={() => setGrade(3)}>
                    {grade >= 3 ? <FullStar /> : <EmptyStar />}
                  </TouchableOpacity>
                  <TouchableOpacity onPressIn={() => setGrade(4)}>
                    {grade >= 4 ? <FullStar /> : <EmptyStar />}
                  </TouchableOpacity>
                  <TouchableOpacity onPressIn={() => setGrade(5)}>
                    {grade >= 5 ? (
                      <FullStar marginRight={0} />
                    ) : (
                      <EmptyStar marginRight={0} />
                    )}
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.yellowHeader_more}>
              <Text style={styles.yellowText_more}>Читайте другие статьи</Text>
              <View style={styles.yellowDecor_more}></View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.yellowText_more_end}>Все</Text>
              </TouchableOpacity>
            </View>
            {MemoizedRandomItem}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleProfile;

const description = StyleSheet.create({
  p: {
    marginTop: 17,
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    lineHeight: 17,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 50,
  },
  wrapper: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
    // paddingBottom: 30,
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
  title: {
    fontSize: 20,
    fontFamily: "Geometria-Bold",
    color: "#fff",
    textTransform: "uppercase",
    marginTop: 17,
  },
  description: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    lineHeight: 17,
  },
  articleInfoText: {
    fontSize: 14,
    fontFamily: "Geometria-Regular",
    color: "#C7CBC9",
    marginRight: 5,
  },
  articleInfoDecor: {
    fontSize: 14,
    fontFamily: "Geometria-Regular",
    color: "#55A290",
    marginRight: 5,
  },
  articleInfo: {
    flexDirection: "row",
  },
  yellowHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
  },
  yellowText: {
    color: "#55A290",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  yellowDecor: {
    backgroundColor: "#55A290",
    height: 1,
    width: "100%",
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
    color: "#55A290",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  yellowText_more_end: {
    color: "#55A290",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginLeft: 5,
    fontSize: 16,
  },
  yellowDecor_more: {
    backgroundColor: "#55A290",
    height: 1,
    flex: 1,
  },
  gradeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 15,
  },
});
