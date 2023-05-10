import { BASE_URL } from "./BASE_URL";
import { setCurrentProductAction } from "../redux/reducers/ProductsReducer";
import * as SecureStore from "expo-secure-store";

export const getProductById = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "shops/products/" + id + "/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(setCurrentProductAction(data));
    }
    setLoad && setLoad(false);
  };
};

export const setLikeProduct = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "shops/products/" + id + "/like/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
    });
    if (response.status === 204) {
      dispatch(getProductById(id));
    }
  };
};

export const setUnlikeProduct = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(
      BASE_URL + "shops/products/" + id + "/unlike/",
      {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "POST",
      }
    );

    if (response.status === 204) {
      dispatch(getProductById(id));
    }
  };
};
