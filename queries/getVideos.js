import { BASE_URL } from "./BASE_URL";
import {
  setCurrentVideoAction,
  setLikeVideoAction,
  setLikedVideoAction,
  setUnlikeVideoAction,
  setVideoAction,
} from "../redux/reducers/VideoInstanceReducer";
import * as SecureStore from "expo-secure-store";

export const getVideos = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "videos/videos/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const data = await response.json();

    dispatch(setVideoAction(data.results));
  };
};

export const getLikedVideos = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "videos/videos/?liked=true", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const data = await response.json();

    dispatch(setLikedVideoAction(data.results));
  };
};

export const getVideosById = (id) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "videos/videos/" + id + "/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const data = await response.json();

    dispatch(setCurrentVideoAction(data));
  };
};

export const setVideoLike = (id) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "videos/videos/" + id + "/like/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
    });

    // const data = await response.json();

    if (response.status === 204) {
      dispatch(setLikeVideoAction(id));
      dispatch(getLikedVideos());
    }
  };
};

export const setVideoUnLike = (id, isCurrent) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(
      BASE_URL + "videos/videos/" + id + "/unlike/",
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
      dispatch(setUnlikeVideoAction(id));
      dispatch(getLikedVideos());
    }
  };
};
