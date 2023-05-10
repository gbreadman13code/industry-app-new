import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./BASE_URL";
import {
  putGradesAction,
  setGradesAction,
} from "../redux/reducers/GradesReducer";
import { getGrades } from "./getGrades";

export const setGrades = (userData) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "articles/grades/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userData),
      method: "POST",
    });
    dispatch(getGrades());
  };
};
