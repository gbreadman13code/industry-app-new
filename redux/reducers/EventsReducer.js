const initialState = {
  events: false,
};

const SET_EVENTS = "SET_EVENTS";

export const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return { events: action.payload };
    default:
      return state;
  }
};

export const setEventsAction = (payload) => ({ type: SET_EVENTS, payload });
