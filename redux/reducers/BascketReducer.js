const initialState = {
  basketArray: [],
  basketProductsIds: [],
};

const SET_PRODUCT = "SET_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const INCREMENT_COUNT = "INCREMENT_COUNT";
const DECREMENT_COUNT = "DECREMENT_COUNT";
const CLEAR_BASCKET = "CLEAR_BASCKET";

export const BascketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        basketArray: [...state.basketArray, action.payload],
        basketProductsIds: [...state.basketProductsIds, action.payload.id],
      };
    case DELETE_PRODUCT:
      return {
        basketArray: state.basketArray.filter(
          (item) => item.id !== action.payload
        ),
        basketProductsIds: state.basketProductsIds.filter(
          (item) => item !== action.payload
        ),
      };
    case INCREMENT_COUNT:
      return {
        ...state,
        basketArray: state.basketArray.map((item) =>
          item.id === action.payload
            ? { ...item, localCount: item.localCount + 1 }
            : item
        ),
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        basketArray: state.basketArray.map((item) =>
          item.id === action.payload
            ? { ...item, localCount: item.localCount - 1 }
            : item
        ),
      };
    case CLEAR_BASCKET:
      return { basketArray: [], basketProductsIds: [] };
    default:
      return state;
  }
};

export const addProductToBascketAction = (payload) => ({
  type: SET_PRODUCT,
  payload,
});
export const deleteProductToBascketAction = (payload) => ({
  type: DELETE_PRODUCT,
  payload,
});
export const IncrementProductToBascketAction = (payload) => ({
  type: INCREMENT_COUNT,
  payload,
});
export const DecrementProductToBascketAction = (payload) => ({
  type: DECREMENT_COUNT,
  payload,
});
export const clearBascketAction = (payload) => ({
  type: CLEAR_BASCKET,
  payload,
});
