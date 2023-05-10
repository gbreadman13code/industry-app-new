import { setAuthAction } from "../redux/reducers/AuthReducer";
import { setUserAction } from "../redux/reducers/UserReducer";
import { BASE_URL } from "./BASE_URL";
import * as SecureStore from "expo-secure-store";
import { getUserData } from "./getUserData";

export const register = (data, setLoad, setErrorList) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "accounts/register/", {
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

    if (response.status === 201) {
      const responseData = await response.json();
      await SecureStore.setItemAsync("token", responseData.auth_token);
      dispatch(getUserData(responseData.auth_token, setLoad, setErrorList));
      // dispatch(setUserAction(responseData.user.email));
      // setReadyToNavigate(true);
      dispatch(setAuthAction({ isAuth: true }));
    }
    setLoad(false);
  };
};
