const initialState = {
  articles: false,
  current_article: false,
  liked_articles: false,
};

const SET_ARTICLES = "SET_ARTICLES";
const SET_CURRENT_ARTICLES = "SET_CURRENT_ARTICLES";
const GET_LIKED_ARTICLES = "GET_LIKED_ARTICLES";

export const ArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return { ...state, articles: action.payload };
    case SET_CURRENT_ARTICLES:
      return { ...state, current_article: action.payload };
    case GET_LIKED_ARTICLES:
      return { ...state, liked_articles: action.payload };
    default:
      return state;
  }
};

export const setArticleAction = (payload) => ({
  type: SET_ARTICLES,
  payload,
});

export const setLikedArticleAction = (payload) => ({
  type: GET_LIKED_ARTICLES,
  payload,
});

export const setCurrentArticleAction = (payload) => ({
  type: SET_CURRENT_ARTICLES,
  payload,
});
