const initialState = {
  isAuth: false,
};

const SET_AUTH = "SET_AUTH";

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { isAuth: action.payload.isAuth };
    default:
      return state;
  }
};

export const setAuthAction = (payload) => ({ type: SET_AUTH, payload });
