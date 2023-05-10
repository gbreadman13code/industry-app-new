import { BASE_URL_V1 } from "./BASE_URL";
import * as SecureStore from "expo-secure-store";
import { setEventsAction } from "../redux/reducers/EventsReducer";

export const getEvents = () => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");

    const response = await fetch(BASE_URL_V1 + "paths/", {
      headers: {
        Authorization: "Token " + token,
      },
    });
    if (response.status === 200) {
      const data = await response.json();

      dispatch(setEventsAction(data.results));
    }
  };
};
