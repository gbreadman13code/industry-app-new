const initialState = {
  partners: false,
  current_partner: false,
  liked_partners: false,
};

const GET_PARTNERS = "GET_PARTNERS";
const GET_CURRENT_PARTNER = "GET_CURRENT_PARTNER";
const GET_LIKED_PARTNERS = "GET_LIKED_PARTNERS";

export const PartnersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PARTNERS:
      return { ...state, partners: action.payload };
    case GET_CURRENT_PARTNER:
      return { ...state, current_partner: action.payload };
    case GET_LIKED_PARTNERS:
      return { ...state, liked_partners: action.payload };
    default:
      return state;
  }
};

export const setPartnersAction = (payload) => ({
  type: GET_PARTNERS,
  payload,
});

export const setCurrentPartnerAction = (payload) => ({
  type: GET_CURRENT_PARTNER,
  payload,
});

export const getLikedPartnerAction = (payload) => ({
  type: GET_LIKED_PARTNERS,
  payload,
});
