import * as SecureStore from "expo-secure-store";
import { setAuthAction } from "../redux/reducers/AuthReducer";
import { BASE_URL } from "./BASE_URL";

export const logout = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "auth/token/logout/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
    });
    if (response.status === 204) {
      await SecureStore.deleteItemAsync("token");
      dispatch(setAuthAction({ isAuth: false }));
    }
  };
};
