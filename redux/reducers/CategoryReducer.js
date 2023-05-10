const initialState = {
  categories: false,
};

const GET_CATEGORIES = "GET_CATEGORIES";

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { categories: action.payload };
    default:
      return state;
  }
};

export const setCategoriesAction = (payload) => ({
  type: GET_CATEGORIES,
  payload,
});
