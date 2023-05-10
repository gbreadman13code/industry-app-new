const initialState = {
  gastronomy_id: -1,
};

const SET_GASTRONOMY_ID = "SET_GASTRONOMY_ID";

export const GastronomyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GASTRONOMY_ID:
      return { gastronomy_id: action.payload };
    default:
      return state;
  }
};

export const setGastronomyIdAction = (payload) => ({
  type: SET_GASTRONOMY_ID,
  payload,
});
