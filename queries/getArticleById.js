import { BASE_URL } from "./BASE_URL";
import * as SecureStore from "expo-secure-store";

import { setCurrentArticleAction } from "../redux/reducers/ArticleReducer";
import { getLikedArticles } from "./getArticles";

export const getArticleById = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "articles/articles/" + id + "/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(setCurrentArticleAction(data));
    }
    setLoad(false);
  };
};

export const setArticleLike = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(
      BASE_URL + "articles/articles/" + id + "/like/",
      {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "POST",
      }
    );

    // const data = await response.json();

    if (response.status === 204) {
      dispatch(getArticleById(id, setLoad));
      dispatch(getLikedArticles());
    }
  };
};

export const setArticleUnLike = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(
      BASE_URL + "articles/articles/" + id + "/unlike/",
      {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "POST",
      }
    );

    // const data = await response.json();

    if (response.status === 204) {
      dispatch(getArticleById(id, setLoad));
      dispatch(getLikedArticles());
    }
  };
};
