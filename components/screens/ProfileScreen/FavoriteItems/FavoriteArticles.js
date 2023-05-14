import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getLikedArticles } from "../../../../queries/getArticles";
import ArticlesItem from "../../BlogScreen/ArticlesItem";

const FavoriteArticles = ({ navigation, setArticlesCount }) => {
  const [articles, setArticles] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const dispatch = useDispatch();

  const articlesRedux = useSelector((state) => state.articles.liked_articles);

  useEffect(() => {
    if (!articlesRedux) return;
    setArticles(articlesRedux);
    setArticlesCount(articlesRedux.length);
  }, [articlesRedux]);

  const toggleList = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      articles && articles.length > 0 ? articles.length * (390 + 8) : 20,
    ],
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(getLikedArticles());

      return async () => {};
    }, [])
  );
  return articles && articles.length > 0 ? (
    <>
      <TouchableOpacity
        onPress={toggleList}
        activeOpacity={0.6}
        style={styles.greenHeader_more}
      >
        <Text style={styles.greenText_more}>Статьи</Text>
        <View style={styles.greenDecor_more}></View>
        <View>
          <Text style={styles.greenText_more_end}>
            {expanded ? "Скрыть" : "Открыть"}
          </Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={{ height: height, overflow: "hidden" }}>
        {articles ? (
          articles.length < 1 ? (
            <Text
              style={{
                color: "#fff",
                textTransform: "uppercase",
                fontFamily: "Geometria-Regular",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Список пуст
            </Text>
          ) : (
            articles.map((item, index) => (
              <ArticlesItem
                key={index}
                item={item}
                navigation={navigation}
                parent={"profile"}
              />
            ))
          )
        ) : null}
      </Animated.View>
    </>
  ) : null;
};

export default FavoriteArticles;

const styles = StyleSheet.create({
  greenHeader_more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  greenText_more: {
    color: "#55A290",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  greenText_more_end: {
    color: "#55A290",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginLeft: 5,
    fontSize: 16,
  },
  greenDecor_more: {
    backgroundColor: "#55A290",
    height: 1,
    flex: 1,
  },
});
