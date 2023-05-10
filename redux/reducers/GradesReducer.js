const initialState = {
  grades: false,
};

const GET_GRADES = "GET_GRADES";
const PUT_GRADES = "PUT_GRADES";

export const GradesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADES:
      return { grades: action.payload };
    case PUT_GRADES:
      return grades
        ? { grades: grades.push(action.payload) }
        : { grades: [action.payload] };
    default:
      return state;
  }
};

export const setGradesAction = (payload) => ({
  type: GET_GRADES,
  payload,
});

export const putGradesAction = (payload) => ({
  type: GET_GRADES,
  payload,
});
