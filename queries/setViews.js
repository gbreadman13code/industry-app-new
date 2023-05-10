import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./BASE_URL";

export const setViews = async (videoId) => {
  const token = await SecureStore.getItemAsync("token");
  const response = await fetch(
    BASE_URL + "videos/videos/" + videoId + "/view/",
    {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
    }
  );
};
