import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../../queries/getArticles";
import { getVideos } from "../../../queries/getVideos";
import { getPodcasts } from "../../../queries/getPodcasts";
import ArticlesItem from "./ArticlesItem";
import VideoItem from "./VideoItem";
import AudioItem from "./AudioItem";
import ArticlesItemInAllMediaScreen from "./ArticlesItemInAllMediaScreen";
import { Audio } from "expo-av";
import {
  setAudioAction,
  setCurrentTrackAction,
  setPlayAudioAction,
} from "../../../redux/reducers/AudioInstanceReducer";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import { setViews } from "../../../queries/setViews";
import { setCurrentVideoAction } from "../../../redux/reducers/VideoInstanceReducer";

const AllMediaScreen = ({ navigation }) => {
  const [allMediaItems, setAllMediaItems] = useState();
  const [isLoad, setLoad] = useState({ load: false, id: 0 });

  const podcastsRedux = useSelector((state) => state.podcasts.podcasts);
  const audioInstance = useSelector((state) => state.currentAudio.audio);
  const activeTrack = useSelector((state) => state.currentAudio.currentTrack);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const articlesRedux = useSelector((state) => state.articles.articles);
  const videosRedux = useSelector((state) => state.video.video);

  const currentVideoRedux = useSelector((state) => state.video.current_video);
  const activeTrackAudio = useSelector(
    (state) => state.currentAudio.currentTrack
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(setPlayAudioAction(false));
      if (audioInstance) audioInstance.stopAsync();
    }
  }, [isAuth]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getArticles());
      dispatch(getVideos());
      dispatch(getPodcasts());
      return () => {};
    }, [])
  );

  const getLastItems = (array) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      if ((i === 0 || i) && i < 5) {
        if (!array[i].date) {
          array[i].date = array[i].datetime;
        }
        result.push(array[i]);
      }
    }
    return result;
  };

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
          allowsExternalPlayback: true,
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
        allowsExternalPlayback: true,
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

  const playAndPauseVideo = async (item, videoRef, setLoad) => {
    if (activeTrackAudio) await audioInstance.pauseAsync();
    if (currentVideoRedux) {
      await currentVideoRedux.video.stopAsync();
      await currentVideoRedux.video.unloadAsync();
      dispatch(setCurrentVideoAction(false));
    }
    setLoad(true);
    setViews(item.id);
    await videoRef.current.loadAsync({ uri: item.file });
    dispatch(setCurrentVideoAction({ video: videoRef.current, item: item }));
    await videoRef.current.playAsync();
  };

  useEffect(() => {
    if (!podcastsRedux || !articlesRedux || !videosRedux) return;

    const mixedArray = getLastItems(podcastsRedux).concat(
      getLastItems(articlesRedux),
      getLastItems(videosRedux)
    );

    mixedArray.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    setAllMediaItems(mixedArray);
  }, [podcastsRedux, articlesRedux, videosRedux]);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView style={{ marginTop: 10 }}>
        {allMediaItems &&
          allMediaItems.map(
            (item, index) =>
              (item.reading_time && (
                <View style={{ marginBottom: 20 }} key={index}>
                  <ArticlesItemInAllMediaScreen
                    item={item}
                    navigation={navigation}
                  />
                </View>
              )) ||
              (item.promo_image && (
                <View style={{ marginBottom: 20 }} key={index}>
                  <VideoItem
                    key={index}
                    item={item}
                    playAndPauseVideo={playAndPauseVideo}
                  />
                </View>
              )) ||
              (item.file && !item.promo_image && (
                <View style={{ marginBottom: 10 }} key={index}>
                  <AudioItem
                    key={index}
                    item={item}
                    activeTrack={activeTrack}
                    isLoad={isLoad}
                    handlePlayPause={handlePlayPause}
                  />
                </View>
              ))
          )}
      </ScrollView>
    </View>
  );
};

export default AllMediaScreen;

const styles = StyleSheet.create({});
