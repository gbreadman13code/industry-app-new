const initialState = {
  contacts: false,
};

const GET_CONTACTS = "GET_CONTACTS";

export const ContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return { contacts: action.payload };
    default:
      return state;
  }
};

export const setContactsAction = (payload) => ({ type: GET_CONTACTS, payload });
