import { BASE_URL } from "./BASE_URL";
import * as SecureStore from "expo-secure-store";

import {
  getLikedPodcastsAction,
  getPodcastsAction,
  setLikeToAudioAction,
  setUnLikeToAudioAction,
} from "../redux/reducers/PodcastsReducer";
import {
  setLikeCurrentAudioAction,
  setUnLikeCurrentAudioAction,
} from "../redux/reducers/AudioInstanceReducer";
import { setAuthAction } from "../redux/reducers/AuthReducer";

export const getPodcasts = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "podcasts/podcasts/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });

    const data = await response.json();
    if (data.detail && data.detail === "Недопустимый токен.") {
      await SecureStore.deleteItemAsync("token");
      dispatch(setAuthAction({ isAuth: false }));
    }

    dispatch(getPodcastsAction(data.results));
  };
};

export const getLikedPodcasts = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "podcasts/podcasts/?liked=true", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });

    const data = await response.json();
    if (data.detail && data.detail === "Недопустимый токен.") {
      await SecureStore.deleteItemAsync("token");
      dispatch(setAuthAction({ isAuth: false }));
    }

    dispatch(getLikedPodcastsAction(data.results));
  };
};

export const setLike = (id, isCurrent) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(
      BASE_URL + "podcasts/podcasts/" + id + "/like/",
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
      if (isCurrent) {
        dispatch(setLikeCurrentAudioAction(id));
        dispatch(setLikeToAudioAction(id));
      } else {
        dispatch(setLikeToAudioAction(id));
      }
    }
  };
};

export const setUnLike = (id, isCurrent) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(
      BASE_URL + "podcasts/podcasts/" + id + "/unlike/",
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
      if (isCurrent) {
        dispatch(setUnLikeCurrentAudioAction(id));
        dispatch(setUnLikeToAudioAction(id));
      } else {
        dispatch(setUnLikeToAudioAction(id));
      }
      dispatch(getLikedPodcasts(id));
    }
  };
};
