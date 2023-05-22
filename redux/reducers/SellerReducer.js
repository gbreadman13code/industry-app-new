const initialState = {
  seller: false,
  liked_sellers: false,
};

const SET_SELLER = "SET_SELLER";
const SET_LIKED_SELLERS = "SET_LIKED_SELLERS";

export const SellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELLER:
      return { ...state, seller: action.payload };
    case SET_LIKED_SELLERS:
      return { ...state, liked_sellers: action.payload };
    default:
      return state;
  }
};

export const setSellerAction = (payload) => ({ type: SET_SELLER, payload });
export const setLikedSellerAction = (payload) => ({
  type: SET_LIKED_SELLERS,
  payload,
});
