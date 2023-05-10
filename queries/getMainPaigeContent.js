import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./BASE_URL";
import { getMainPageContentAction } from "../redux/reducers/MainPaigeReducer";

export const getMainPaigeContent = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "base/main-page", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();
    dispatch(getMainPageContentAction(data));
  };
};
