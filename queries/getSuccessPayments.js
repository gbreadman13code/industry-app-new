import { BASE_URL } from "./BASE_URL";
import { setSellerAction } from "../redux/reducers/SellerReducer";
import { getPaymentsAction } from "../redux/reducers/SuccessPaymentsReducer";
import * as SecureStore from "expo-secure-store";

export const getSuccessPayments = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL + "shops/success_payments/", {
      headers: {
        Authorization: "Token " + token,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(getPaymentsAction(data));
    }
  };
};
