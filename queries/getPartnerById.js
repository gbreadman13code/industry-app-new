import { BASE_URL } from "./BASE_URL";
import {
  setCurrentPartnerAction,
  setLikePartnerAction,
} from "../redux/reducers/PartnersReducer";
import * as SecureStore from "expo-secure-store";

export const getPartnerById = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "partners/partners/" + id + "/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(setCurrentPartnerAction(data));
    }
    setLoad(false);
  };
};

export const setPartnerLike = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(
      BASE_URL + "partners/partners/" + id + "/like/",
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
      dispatch(getPartnerById(id, setLoad));
    }
    // setLoad(false);
  };
};

export const setPartnerUnlike = (id, setLoad) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(
      BASE_URL + "partners/partners/" + id + "/unlike/",
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
      dispatch(getPartnerById(id, setLoad));
    }
    // setLoad(false);
  };
};
