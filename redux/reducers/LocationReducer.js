const initialState = {
  is_article_profile: false,
};

const IS_ARTICLE_PROFILE = "IS_ARTICLE_PROFILE";

export const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_ARTICLE_PROFILE:
      return { is_article_profile: action.payload };
    default:
      return state;
  }
};

export const setLocationArticleProfileAction = (payload) => ({
  type: IS_ARTICLE_PROFILE,
  payload,
});
