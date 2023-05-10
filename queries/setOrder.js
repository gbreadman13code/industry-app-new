import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./BASE_URL";
import { Linking } from "react-native";

export const setOrder = async (data, setError) => {
  const token = await SecureStore.getItemAsync("token");
  const response = await fetch(BASE_URL + "shops/payments/", {
    headers: {
      Authorization: "Token " + token,
      "Content-Type": "application/json;charset=utf-8",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.status === 400) {
    const answer = await response.json();
    if (answer.error.includes("Невозможно купить такое количество товаров")) {
      const wrongProductId = answer.error.substring(
        answer.error.indexOf("id") + 3
      );
      setError(wrongProductId);
    }
  }

  if (response.status === 201) {
    const answer = await response.json();
    Linking.openURL(answer.confirmation_url);
  }
};
