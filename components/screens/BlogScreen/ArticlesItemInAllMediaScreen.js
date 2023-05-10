import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { roundNum } from "../../../functions/formateReadingTime";
import { formateDate } from "../../../functions/formateDate";

const ArticlesItemInAllMediaScreen = ({ item, navigation }) => {
  const navigateToProfile = (id) => {
    navigation.navigate("ArticleProfileInAllMediaScreen", { id: id });
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <ImageBackground
        source={{ uri: item.image }}
        style={{ width: "100%", height: 229 }}
      ></ImageBackground>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.articleInfo}>
          <Text style={styles.articleInfoText}>{formateDate(item.date)}</Text>
          <Text style={styles.articleInfoDecor}> {">"} </Text>
          <Text style={styles.articleInfoText}>
            {roundNum(item.reading_time)} мин.
          </Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          style={styles.readMore}
          activeOpacity={0.8}
          onPress={() => navigateToProfile(item.id)}
        >
          <Text style={styles.readMoreText}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArticlesItemInAllMediaScreen;

const styles = StyleSheet.create({
  textBlock: {
    borderLeftWidth: 1,
    borderLeftColor: "#55A290",
    marginTop: 5,
    paddingLeft: 8,
  },
  title: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    fontSize: 16,
    lineHeight: 19,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  articleInfo: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 8,
  },
  articleInfoText: {
    fontSize: 12,
    fontFamily: "Geometria-Regular",
    color: "#C7CBC9",
    marginRight: 5,
  },
  articleInfoDecor: {
    fontSize: 12,
    fontFamily: "Geometria-Regular",
    color: "#55A290",
    marginRight: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: "Geometria-Regular",
    color: "#C7CBC9",
    marginBottom: 10,
  },
  readMore: {
    backgroundColor: "#55A290",
    padding: 4,
    alignSelf: "flex-start",
  },
  readMoreText: {
    fontFamily: "Geometria-Bold",
    fontSize: 15,
  },
});
