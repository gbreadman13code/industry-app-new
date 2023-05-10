import { BASE_URL } from "./BASE_URL";
import {
  setArticleAction,
  setLikedArticleAction,
} from "../redux/reducers/ArticleReducer";
import * as SecureStore from "expo-secure-store";

export const getArticles = (setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "articles/articles/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();

    dispatch(setArticleAction(data.results));
    setLoad && setLoad(false);
  };
};

export const getLikedArticles = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "articles/articles/?liked=true", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();

    dispatch(setLikedArticleAction(data.results));
  };
};
