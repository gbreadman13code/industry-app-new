import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./BASE_URL";
import { setGradesAction } from "../redux/reducers/GradesReducer";
import { setContactsAction } from "../redux/reducers/ContactsReducer";

export const getContacts = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(BASE_URL + "contacts/contacts/", {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });

    const data = await response.json();
    dispatch(setContactsAction(data));
  };
};
