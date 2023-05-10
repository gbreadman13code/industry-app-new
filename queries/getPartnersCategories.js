import { BASE_URL } from "./BASE_URL";
import { setPartnersCategoriesAction } from "../redux/reducers/PartnersCategoryReducer";

export const getPartnersCategories = () => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "partners/categories/");
    const data = await response.json();

    dispatch(setPartnersCategoriesAction(data.results));
  };
};
