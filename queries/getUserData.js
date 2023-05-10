import { setAuthAction } from "../redux/reducers/AuthReducer";
import { setUserDataAction } from "../redux/reducers/UserDataReducer";
import { setUserAction } from "../redux/reducers/UserReducer";
import { BASE_URL } from "./BASE_URL";
import * as SecureStore from "expo-secure-store";

export const getUserData = (setIsLoad, setErrorList) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "accounts/info/", {
      headers: {
        Authorization: "Token " + token,
      },
    });

    // if (response.status === 400) {
    //   const responseData = await response.json();

    //   const arrayOfErrors = [];
    //   for (let errorType in responseData) {
    //     for (let i = 0; i < responseData[errorType].length; i++) {
    //       arrayOfErrors.push(responseData[errorType][i]);
    //     }
    //   }
    //   setErrorList((prevState) => prevState.concat(arrayOfErrors));
    // }

    if (response.status === 200) {
      const responseData = await response.json();
      dispatch(setUserDataAction(responseData));
    }
    setIsLoad && setIsLoad(false);
  };
};
