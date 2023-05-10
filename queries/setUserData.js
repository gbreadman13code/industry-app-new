import { setAuthAction } from "../redux/reducers/AuthReducer";
import { setUserDataAction } from "../redux/reducers/UserDataReducer";
import { setUserAction } from "../redux/reducers/UserReducer";
import { BASE_URL } from "./BASE_URL";
import * as SecureStore from "expo-secure-store";

export const setUserData = (data, setLoad, setErrorList) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "accounts/info/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      await SecureStore.deleteItemAsync("token");
      dispatch(setAuthAction({ isAuth: false }));
    }

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

    if (response.status === 200) {
      const responseData = await response.json();
      dispatch(setUserDataAction(responseData));
    }
    setLoad(false);
  };
};
