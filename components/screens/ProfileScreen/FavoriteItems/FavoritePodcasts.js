import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import AudioItem from "../../BlogScreen/AudioItem";
import { useDispatch, useSelector } from "react-redux";
import { getLikedPodcasts } from "../../../../queries/getPodcasts";
import { useFocusEffect } from "@react-navigation/native";
import {
  setAudioAction,
  setCurrentTrackAction,
  setPlayAudioAction,
} from "../../../../redux/reducers/AudioInstanceReducer";
import { Audio } from "expo-av";

const FavoritePodcasts = ({ setPodcastsCount }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [isLoad, setLoad] = useState(false);
  const audioInstance = useSelector((state) => state.currentAudio.audio);
  const activeTrack = useSelector((state) => state.currentAudio.currentTrack);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (!isAuth) {
      dispatch(setPlayAudioAction(false));
      if (audioInstance) audioInstance.stopAsync();
    }
  }, [isAuth]);

  const dispatch = useDispatch();

  const likedPodcastsRedux = useSelector(
    (state) => state.podcasts.liked_podcasts
  );

  useEffect(() => {
    if (!likedPodcastsRedux) return;
    setPodcasts(likedPodcastsRedux);
    setPodcastsCount(likedPodcastsRedux.length);
  }, [likedPodcastsRedux]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getLikedPodcasts());

      return async () => {};
    }, [])
  );

  const handlePlayPause = async (item) => {
    if (activeTrack) {
      if (activeTrack.trackInfo.id !== item.id) {
        await audioInstance.pauseAsync();
        dispatch(setPlayAudioAction(false));
        const fileNameInUrlIndex = item.file.indexOf(".mp3");
        const fileNameInUrl = item.file.substring(0, fileNameInUrlIndex + 4);
        setLoad({ load: true, id: item.id });
        const { sound } = await Audio.Sound.createAsync(
          { uri: fileNameInUrl },
          { shouldPlay: false, progressUpdateIntervalMillis: 1000 }
        );

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });

        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate((status) => {
          dispatch(
            setCurrentTrackAction({
              status: status,
              trackInfo: item,
            })
          );
          if (status.didJustFinish) {
            sound.stopAsync();
            dispatch(setPlayAudioAction(false));
          }
        });
        setLoad({ load: false, id: 0 });
        dispatch(setAudioAction(sound));
        dispatch(setPlayAudioAction(true));

        // setAudioInstance(sound);
      } else {
        if (activeTrack.status.isPlaying) {
          await audioInstance.pauseAsync();
          dispatch(setPlayAudioAction(false));
        } else {
          await audioInstance.playAsync();
          dispatch(setPlayAudioAction(true));
        }
      }
    } else {
      const fileNameInUrlIndex = item.file.indexOf(".mp3");
      const fileNameInUrl = item.file.substring(0, fileNameInUrlIndex + 4);
      setLoad({ load: true, id: item.id });
      const { sound } = await Audio.Sound.createAsync(
        { uri: fileNameInUrl },
        { shouldPlay: false, progressUpdateIntervalMillis: 1000 }
      );

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        dispatch(
          setCurrentTrackAction({
            status: status,
            trackInfo: item,
          })
        );
        if (status.didJustFinish) {
          dispatch(setPlayAudioAction(false));
          sound.stopAsync();
        }
      });
      setLoad({ load: false, id: 0 });
      dispatch(setAudioAction(sound));
      dispatch(setPlayAudioAction(true));
    }
  };

  const toggleList = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      podcasts && podcasts.length > 0 ? podcasts.length * (50 + 8) : 20,
    ],
  });
  return podcasts && podcasts.length > 0 ? (
    <>
      <TouchableOpacity
        onPress={toggleList}
        activeOpacity={0.6}
        style={styles.pinkHeader_more}
      >
        <Text style={styles.pinkText_more}>Подкасты</Text>
        <View style={styles.pinkDecor_more}></View>
        <View>
          <Text style={styles.pinkText_more_end}>
            {expanded ? "Скрыть" : "Открыть"}
          </Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={{ height: height, overflow: "hidden" }}>
        {podcasts ? (
          podcasts.length < 1 ? (
            <Text
              style={{
                color: "#fff",
                textTransform: "uppercase",
                fontFamily: "Geometria-Regular",
                textAlign: "center",
              }}
            >
              Список пуст
            </Text>
          ) : (
            podcasts.map((item, index) => (
              <AudioItem
                key={index}
                item={item}
                isLoad={isLoad}
                activeTrack={activeTrack}
                handlePlayPause={handlePlayPause}
              />
            ))
          )
        ) : null}
      </Animated.View>
    </>
  ) : null;
};

export default FavoritePodcasts;

const styles = StyleSheet.create({
  pinkHeader_more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  pinkText_more: {
    color: "#B34382",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  pinkText_more_end: {
    color: "#B34382",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginLeft: 5,
    fontSize: 16,
  },
  pinkDecor_more: {
    backgroundColor: "#B34382",
    height: 1,
    flex: 1,
  },
});
