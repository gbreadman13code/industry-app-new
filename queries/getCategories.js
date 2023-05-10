import { BASE_URL } from "./BASE_URL";
import { setCategoriesAction } from "../redux/reducers/CategoryReducer";

export const getCategories = () => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "shops/categories/");
    const data = await response.json();

    dispatch(setCategoriesAction(data.results));
  };
};
