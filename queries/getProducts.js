import { BASE_URL } from "./BASE_URL";
import {
  getLikedProductsAction,
  setNextProductsAction,
  setProductsAction,
} from "../redux/reducers/ProductsReducer";
import * as SecureStore from "expo-secure-store";

export const getProducts = (sort_parametres, setLoad, setLoadProducts) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(
      sort_parametres
        ? BASE_URL + "shops/products/?" + sort_parametres
        : BASE_URL + "shops/products/",
      {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "GET",
      }
    );
    const data = await response.json();

    dispatch(setProductsAction(data));
    setLoad(false);
    setLoadProducts(false);
  };
};

export const getNextProducts = (
  nextUrl,
  setLoad,
  setLoadProducts,
  setLoadNextProducts
) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(nextUrl, {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();

    dispatch(setNextProductsAction(data));
    setLoad(false);
    setLoadNextProducts(false);

    setLoadProducts(false);
  };
};

export const getLikedProducts = (setLoad, setLoadProducts) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "shops/products/?liked=true", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();

    dispatch(getLikedProductsAction(data.results));
  };
};
