const initialState = {
  video: false,
  current_video: false,
  isPlay: false,
  liked_video: false,
};

const SET_VIDEO = "SET_VIDEO";
const SET_PLAY_VIDEO = "SET_PLAY_VIDEO";
const SET_CURRENT_VIDEO = "SET_CURRENT_VIDEO";
const SET_LIKE_VIDEO = "SET_LIKE_VIDEO";
const SET_UNLIKE_VIDEO = "SET_UNLIKE_VIDEO";
const GET_LIKED_VIDEO = "GET_LIKED_VIDEO";

export const VideoInstanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO:
      return { ...state, video: action.payload };
    case SET_PLAY_VIDEO:
      return { ...state, isPlay: action.payload };
    case SET_CURRENT_VIDEO:
      return { ...state, current_video: action.payload };
    case GET_LIKED_VIDEO:
      return { ...state, liked_video: action.payload };
    case SET_LIKE_VIDEO:
      return {
        ...state,
        video: state.video.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                is_liked: true,
              }
            : item
        ),
      };
    case SET_UNLIKE_VIDEO:
      return {
        ...state,
        video: state.video.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                is_liked: false,
              }
            : item
        ),
      };
    default:
      return state;
  }
};

export const setVideoAction = (payload) => ({
  type: SET_VIDEO,
  payload,
});

export const setLikedVideoAction = (payload) => ({
  type: GET_LIKED_VIDEO,
  payload,
});

export const setPlayVideoAction = (payload) => ({
  type: SET_PLAY_VIDEO,
  payload,
});

export const setCurrentVideoAction = (payload) => ({
  type: SET_CURRENT_VIDEO,
  payload,
});

export const setLikeVideoAction = (payload) => ({
  type: SET_LIKE_VIDEO,
  payload,
});

export const setUnlikeVideoAction = (payload) => ({
  type: SET_UNLIKE_VIDEO,
  payload,
});
