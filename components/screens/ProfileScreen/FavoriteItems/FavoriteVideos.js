import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getLikedVideos } from "../../../../queries/getVideos";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentVideoAction } from "../../../../redux/reducers/VideoInstanceReducer";
import { setViews } from "../../../../queries/setViews";
import VideoItem from "../../BlogScreen/VideoItem";

const FavoriteVideos = ({ setVideosCount }) => {
  const [videos, setVideos] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [isLoad, setLoad] = useState({ load: false, id: 0 });

  const audioInstance = useSelector((state) => state.currentAudio.audio);
  const currentVideoRedux = useSelector((state) => state.video.current_video);
  const activeTrackAudio = useSelector(
    (state) => state.currentAudio.currentTrack
  );

  const videoRedux = useSelector((state) => state.video.liked_video);

  useEffect(() => {
    if (!videoRedux) return;
    setVideos(videoRedux);
    setVideosCount(videoRedux.length);
  }, [videoRedux]);

  const dispatch = useDispatch();

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
      videos && videos.length > 0 ? videos.length * (270 + 8) : 20,
    ],
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(getLikedVideos());

      return async () => {};
    }, [])
  );
  return videos && videos.length > 0 ? (
    <>
      <TouchableOpacity
        onPress={toggleList}
        activeOpacity={0.6}
        style={styles.purpleHeader_more}
      >
        <Text style={styles.purpleText_more}>Видео</Text>
        <View style={styles.purpleDecor_more}></View>
        <View>
          <Text style={styles.purpleText_more_end}>
            {expanded ? "Скрыть" : "Открыть"}
          </Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={{ height: height, overflow: "hidden" }}>
        {videos ? (
          videos.length < 1 ? (
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
            videos.map((item, index) => (
              <VideoItem
                key={index}
                item={item}
                playAndPauseVideo={playAndPauseVideo}
              />
            ))
          )
        ) : null}
      </Animated.View>
    </>
  ) : null;
};

export default FavoriteVideos;

const styles = StyleSheet.create({
  purpleHeader_more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  purpleText_more: {
    color: "#464A88",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  purpleText_more_end: {
    color: "#464A88",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginLeft: 5,
    fontSize: 16,
  },
  purpleDecor_more: {
    backgroundColor: "#464A88",
    height: 1,
    flex: 1,
  },
});
