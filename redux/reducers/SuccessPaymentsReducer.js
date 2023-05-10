const initialState = {
  payments: false,
  total_sum: 0,
};

const GET_PAYMENTS = "GET_PAYMENTS";

export const SuccessPaymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENTS:
      let total = 0;
      action.payload.results.forEach(
        (item) => (total = total + item.total_sum)
      );
      return { payments: action.payload.results, total_sum: total };
    default:
      return state;
  }
};

export const getPaymentsAction = (payload) => ({
  type: GET_PAYMENTS,
  payload,
});
