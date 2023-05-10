const initialState = {
  user: false,
};

const SET_USER = "SET_USER";

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    default:
      return state;
  }
};

export const setUserAction = (payload) => ({ type: SET_USER, payload });
