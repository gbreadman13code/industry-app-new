import { setAuthAction } from "../redux/reducers/AuthReducer";
import { BASE_URL } from "./BASE_URL";
import * as SecureStore from "expo-secure-store";

export const login = (data, setLoad, setErrorList) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "auth/token/login/", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
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

    if (response.status === 200) {
      const responseData = await response.json();
      await SecureStore.setItemAsync("token", responseData.auth_token);
      dispatch(setAuthAction({ isAuth: true }));
    }
    setLoad(false);
  };
};
