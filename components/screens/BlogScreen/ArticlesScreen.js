import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticlesItem from "./ArticlesItem";
import { getArticles } from "../../../queries/getArticles";
import { getGrades } from "../../../queries/getGrades";
import SearchFiled from "../../elements/SearchFiled/SearchFiled";
import Lottie from "lottie-react-native";
import {
  nameOfMonth,
  nameOfMonthGeneral,
} from "../../../functions/formateDate";
import { reformattedArray } from "../../../functions/reformattedArray";

const ArticlesScreen = ({ navigation }) => {
  const [articles, setArticles] = useState();
  const [isLoad, setLoad] = useState(false);
  const [isLoadContent, setLoadContent] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const articlesRedux = useSelector((state) => state.articles.articles);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!articlesRedux) return;
    setLoadContent(true);
    if (searchWord !== "") {
      (async function (word) {
        await searchByTitle(word);
      })(searchWord);

      setLoadContent(false);
      return;
    }

    setArticles(reformattedArray(articlesRedux));
    setLoadContent(false);
  }, [articlesRedux, searchWord]);

  const searchByTitle = async (title) => {
    const filteredArray = await articlesRedux.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
    setArticles(reformattedArray(filteredArray));
  };

  useEffect(() => {
    setLoad(true);
  }, []);

  useEffect(() => {
    dispatch(getArticles(setLoad));
  }, [dispatch]);

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
    <View style={{ flex: 1, paddingTop: 20, backgroundColor: "#000" }}>
      {articles && (
        <>
          <SearchFiled
            color={"#55A290"}
            onChange={(text) => setSearchWord(text)}
          />

          {isLoadContent ? (
            // <View style={styles.lottieContainer}>
            <Lottie
              source={require("../../../assets/img/lotties/loader-square.json")}
              autoPlay
              loop
              style={styles.lottie}
            />
          ) : (
            // </View>
            <FlatList
              data={articles}
              initialNumToRender={10}
              windowSize={5}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.monthName}>
                    {nameOfMonthGeneral(item.month)}
                  </Text>
                  {item.items.map((point, index) => (
                    <ArticlesItem
                      key={index}
                      item={point}
                      navigation={navigation}
                    />
                  ))}
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

export default ArticlesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // marginBottom: 50,
  },
  wrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    // paddingBottom: 30,
  },
  lottie: {
    backgroundColor: "#000",
    width: 200,
    height: 120,
  },
  monthName: {
    fontFamily: "Geometria-Bold",
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
});
