import { BASE_URL } from "./BASE_URL";
import { setSellerAction } from "../redux/reducers/SellerReducer";

export const getSellerById = (id, setLoad) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "shops/shops/" + id + "/");
    const data = await response.json();
    if (response.status === 200) {
      dispatch(setSellerAction(data));
    }
    setLoad(false);
  };
};
