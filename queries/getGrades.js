import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./BASE_URL";
import { setGradesAction } from "../redux/reducers/GradesReducer";

export const getGrades = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "articles/grades/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });
    const data = await response.json();
    dispatch(setGradesAction(data.results));
  };
};
