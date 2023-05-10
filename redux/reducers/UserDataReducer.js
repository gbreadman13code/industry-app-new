const initialState = {
  userData: {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: null,
    birthday: null,
  },
};

const SET_USERDATA = "SET_USERDATA";

export const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERDATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export const setUserDataAction = (payload) => ({
  type: SET_USERDATA,
  payload,
});
