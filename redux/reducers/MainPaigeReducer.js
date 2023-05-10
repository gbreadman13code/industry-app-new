const initialState = {
  main_page_content: {},
  media_router: false,
};

const GET_MAIN_PAGE_CONTENT = "GET_MAIN_PAGE_CONTENT";
const SET_NEW_MEDIA_ROUTER = "SET_NEW_MEDIA_ROUTER";

export const MainPaigeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_PAGE_CONTENT:
      return { ...state, main_page_content: action.payload };
    case SET_NEW_MEDIA_ROUTER:
      return {
        ...state,
        media_router: action.payload,
      };
    default:
      return state;
  }
};

export const getMainPageContentAction = (payload) => ({
  type: GET_MAIN_PAGE_CONTENT,
  payload,
});

export const setNewMeiaRouterAction = (payload) => ({
  type: SET_NEW_MEDIA_ROUTER,
  payload,
});
