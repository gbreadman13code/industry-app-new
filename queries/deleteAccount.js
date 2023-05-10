import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./BASE_URL";
import { setAuthAction } from "../redux/reducers/AuthReducer";

export const DeleteAcount = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "accounts/info/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "DELETE",
    });

    if (response.status === 204) {
      await SecureStore.deleteItemAsync("token");
      dispatch(setAuthAction({ isAuth: false }));
    }
  };
};
