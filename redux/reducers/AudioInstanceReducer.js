const initialState = {
  audio: false,
  currentTrack: false,
  isPlay: false,
};

const SET_AUDIO = "SET_AUDIO";
const SET_PLAY_AUDIO = "SET_PLAY_AUDIO";
const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
const SET_CURRENT_TRACK_LIKE = "SET_CURRENT_TRACK_LIKE";
const SET_CURRENT_TRACK_UNLIKE = "SET_CURRENT_TRACK_UNLIKE";

export const AudioInstanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO:
      return { ...state, audio: action.payload };
    case SET_PLAY_AUDIO:
      return { ...state, isPlay: action.payload };
    case SET_CURRENT_TRACK:
      return { ...state, currentTrack: action.payload };
    case SET_CURRENT_TRACK_LIKE: {
      return {
        ...state,
        currentTrack: {
          ...state.currentTrack,
          trackInfo: { ...state.currentTrack.trackInfo, is_liked: true },
        },
      };
    }
    case SET_CURRENT_TRACK_UNLIKE: {
      return {
        ...state,
        currentTrack: {
          ...state.currentTrack,
          trackInfo: { ...state.currentTrack.trackInfo, is_liked: false },
        },
      };
    }
    default:
      return state;
  }
};

export const setAudioAction = (payload) => ({
  type: SET_AUDIO,
  payload,
});

export const setPlayAudioAction = (payload) => ({
  type: SET_PLAY_AUDIO,
  payload,
});

export const setCurrentTrackAction = (payload) => ({
  type: SET_CURRENT_TRACK,
  payload,
});

export const setLikeCurrentAudioAction = (payload) => ({
  type: SET_CURRENT_TRACK_LIKE,
  payload,
});

export const setUnLikeCurrentAudioAction = (payload) => ({
  type: SET_CURRENT_TRACK_UNLIKE,
  payload,
});
