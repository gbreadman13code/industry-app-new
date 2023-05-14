import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SearchFiled from "../../elements/SearchFiled/SearchFiled";
import VideoItem from "./VideoItem";
import { useDispatch, useSelector } from "react-redux";
import { getVideos, getVideosById } from "../../../queries/getVideos";
import {
  setCurrentVideoAction,
  setPlayVideoAction,
} from "../../../redux/reducers/VideoInstanceReducer";

import { Video } from "expo-av";
import { setViews } from "../../../queries/setViews";

import { useFocusEffect } from "@react-navigation/native";
import { reformattedArray } from "../../../functions/reformattedArray";
import { nameOfMonthGeneral } from "../../../functions/formateDate";

const VideoList = () => {
  const [videoList, setVideoList] = useState();
  const [searchWord, setSearchWord] = useState("");
  const videoRedux = useSelector((state) => state.video.video);
  const currentVideoRedux = useSelector((state) => state.video.current_video);
  const activeTrackAudio = useSelector(
    (state) => state.currentAudio.currentTrack
  );
  const audioInstance = useSelector((state) => state.currentAudio.audio);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!videoRedux) return;
    if (searchWord !== "") {
      searchByTitle(searchWord);
      return;
    }
    setVideoList(reformattedArray(videoRedux));
  }, [videoRedux, searchWord]);

  const searchByTitle = async (title) => {
    const filteredArray = await videoRedux.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
    setVideoList(reformattedArray(filteredArray));
  };

  const playAndPauseVideo = async (item, videoRef, setLoad) => {
    if (activeTrackAudio) await audioInstance.pauseAsync();
    if (currentVideoRedux) {
      await currentVideoRedux.video.stopAsync();
      // await currentVideoRedux.video.unloadAsync();
      dispatch(setCurrentVideoAction(false));
    }
    setLoad(true);
    setViews(item.id);
    await videoRef.current.loadAsync({ uri: item.file });
    dispatch(setCurrentVideoAction({ video: videoRef.current, item: item }));
    await videoRef.current.playAsync();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getVideos());

      return async () => {
        if (currentVideoRedux) {
          await currentVideoRedux.video.stopAsync();
          await currentVideoRedux.video.unloadAsync();
          dispatch(setCurrentVideoAction(false));
        }
      };
    }, [])
  );

  return (
    <ScrollView style={{ flex: 1, marginTop: 20, backgroundColor: "#000" }}>
      <SearchFiled color={"#464A88"} onChange={setSearchWord} />
      {videoList &&
        videoList.map((point, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={styles.monthName}>
              {nameOfMonthGeneral(point.month)}
            </Text>
            {point.items.map((item, index) => (
              <VideoItem
                playAndPauseVideo={playAndPauseVideo}
                key={index}
                item={item}
              />
            ))}
          </View>
        ))}
    </ScrollView>
  );
};

export default VideoList;

const styles = StyleSheet.create({
  monthName: {
    fontFamily: "Geometria-Bold",
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
});
