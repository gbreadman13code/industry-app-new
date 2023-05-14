const initialState = {
  products: false,
  current_product: false,
  liked_products: false,
  next: "",
};

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_CURRENT_PRODUCT = "GET_CURRENT_PRODUCT";
const GET_LIKED_PRODUCTS = "GET_LIKED_PRODUCTS";
const GET_NEXT_PRODUCTS = "GET_NEXT_PRODUCTS";

export const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.results,
        next: action.payload.next,
      };
    case GET_NEXT_PRODUCTS:
      return {
        ...state,
        products: state.products.concat(action.payload.results),
        next: action.payload.next,
      };
    case GET_CURRENT_PRODUCT:
      return { ...state, current_product: action.payload };
    case GET_LIKED_PRODUCTS:
      return { ...state, liked_products: action.payload };
    default:
      return state;
  }
};

export const setProductsAction = (payload) => ({
  type: GET_PRODUCTS,
  payload,
});

export const setNextProductsAction = (payload) => ({
  type: GET_NEXT_PRODUCTS,
  payload,
});

export const setCurrentProductAction = (payload) => ({
  type: GET_CURRENT_PRODUCT,
  payload,
});

export const getLikedProductsAction = (payload) => ({
  type: GET_LIKED_PRODUCTS,
  payload,
});
