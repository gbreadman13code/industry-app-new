import { BASE_URL } from "./BASE_URL";
import {
  setLikedSellerAction,
  setSellerAction,
} from "../redux/reducers/SellerReducer";
import * as SecureStore from "expo-secure-store";

export const getSellerById = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "shops/shops/" + id + "/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(setSellerAction(data));
    }
    setLoad(false);
  };
};

export const setSellerLike = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "shops/shops/" + id + "/like/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
    });
    // const data = await response.json();
    if (response.status === 204) {
      dispatch(getSellerById(id, setLoad));
    }
    // setLoad(false);
  };
};

export const setSellerUnlike = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "shops/shops/" + id + "/unlike/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
    });
    // const data = await response.json();
    if (response.status === 204) {
      dispatch(getSellerById(id, setLoad));
    }
    // setLoad(false);
  };
};

export const getLkedSellers = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "shops/shops/?liked=true", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();

    dispatch(setLikedSellerAction(data.results));
    // setLoad(false);
    // setLoadProducts(false);
  };
};
