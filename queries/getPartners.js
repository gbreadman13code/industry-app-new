import { BASE_URL } from "./BASE_URL";
import {
  getLikedPartnerAction,
  setPartnersAction,
} from "../redux/reducers/PartnersReducer";
import * as SecureStore from "expo-secure-store";

export const getPartners = (sort_parametres, setLoad, setLoadProducts) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(
      sort_parametres
        ? BASE_URL + "partners/partners/?" + sort_parametres
        : BASE_URL + "partners/partners/",
      {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "GET",
      }
    );
    const data = await response.json();

    dispatch(setPartnersAction(data.results));
    setLoad(false);
    setLoadProducts(false);
  };
};

export const getLkedPartners = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "partners/partners/?liked=true", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();

    dispatch(getLikedPartnerAction(data.results));
    // setLoad(false);
    // setLoadProducts(false);
  };
};
