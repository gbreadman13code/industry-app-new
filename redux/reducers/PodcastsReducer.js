const initialState = {
  podcasts: false,
  liked_podcasts: false,
};

const GET_PODCASTS = "GET_PODCASTS";
const SET_LIKE = "SET_LIKE";
const SET_UNLIKE = "SET_UNLIKE";
const GET_LIKED_PODCASTS = "GET_LIKED_PODCASTS";

export const PodcastsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PODCASTS:
      return { ...state, podcasts: action.payload };
    case GET_LIKED_PODCASTS:
      return { ...state, liked_podcasts: action.payload };
    case SET_LIKE: {
      return {
        ...state,
        podcasts: state.podcasts.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                is_liked: true,
              }
            : item
        ),
      };
    }
    case SET_UNLIKE: {
      return {
        ...state,
        podcasts: state.podcasts.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                is_liked: false,
              }
            : item
        ),
      };
    }
    default:
      return state;
  }
};

export const getPodcastsAction = (payload) => ({ type: GET_PODCASTS, payload });
export const getLikedPodcastsAction = (payload) => ({
  type: GET_LIKED_PODCASTS,
  payload,
});
export const setLikeToAudioAction = (payload) => ({
  type: SET_LIKE,
  payload,
});
export const setUnLikeToAudioAction = (payload) => ({
  type: SET_UNLIKE,
  payload,
});
