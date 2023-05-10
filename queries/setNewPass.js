import { setAuthAction } from "../redux/reducers/AuthReducer";
import { setUserDataAction } from "../redux/reducers/UserDataReducer";
import { setUserAction } from "../redux/reducers/UserReducer";
import { BASE_URL } from "./BASE_URL";
import * as SecureStore from "expo-secure-store";

export const setNewPass = async (data, setLoad, setErrorList, setSuccess) => {
  const token = await SecureStore.getItemAsync("token");

  const response = await fetch(BASE_URL + "accounts/password/", {
    headers: {
      Authorization: "Token " + token,
      "Content-Type": "application/json;charset=utf-8",
    },
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (response.status === 400) {
    const responseData = await response.json();

    const arrayOfErrors = [];
    for (let errorType in responseData) {
      for (let i = 0; i < responseData[errorType].length; i++) {
        arrayOfErrors.push(responseData[errorType][i]);
      }
    }
    setErrorList((prevState) => prevState.concat(arrayOfErrors));
  }

  if (response.status === 204) {
    setSuccess(true);
  }
  setLoad(false);
};
