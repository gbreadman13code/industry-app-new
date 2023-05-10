const initialState = {
  categories: false,
};

const GET_PARTNERS_CATEGORIES = "GET_PARTNERS_CATEGORIES";

export const PartnersCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PARTNERS_CATEGORIES:
      return { categories: action.payload };
    default:
      return state;
  }
};

export const setPartnersCategoriesAction = (payload) => ({
  type: GET_PARTNERS_CATEGORIES,
  payload,
});
