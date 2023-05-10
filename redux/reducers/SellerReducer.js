const initialState = {
  seller: false,
};

const SET_SELLER = "SET_SELLER";

export const SellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELLER:
      return { seller: action.payload };
    default:
      return state;
  }
};

export const setSellerAction = (payload) => ({ type: SET_SELLER, payload });
