import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

import { setAuthAction } from "../../../redux/reducers/AuthReducer";
import LoginScreen from "../LoginScreen/LoginScreen";
import MainScreen from "../MainScreen/MainScreen";

const CheckAuth = () => {
  const [hasPersonalInfo, setPersonalInfo] = useState(false);
  const auth = useSelector((state) => state.auth.isAuth);
  const personalInfo = useSelector((state) => state.personal_info.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      dispatch(setAuthAction({ isAuth: !!token }));
    };
    getToken();
  }, [dispatch]);

  useEffect(() => {
    if (!personalInfo.id) return;
    if (!personalInfo.first_name) {
      setPersonalInfo(false);
    } else {
      setPersonalInfo(true);
    }
  }, [personalInfo]);

  if (!auth || !hasPersonalInfo) {
    return <LoginScreen />;
  }

  return <MainScreen />;
};

export default CheckAuth;
