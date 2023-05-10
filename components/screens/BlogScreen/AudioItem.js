import { StyleSheet, TouchableOpacity, Text, Button, View } from "react-native";
import React from "react";
import PlayButton from "../../../assets/svg/PlayButton";
import PauseButton from "../../../assets/svg/PauseButton";
import Lottie from "lottie-react-native";
import { formateDate } from "../../../functions/formateDate";
import Unlike from "../../../assets/svg/Unlike";
import Like from "../../../assets/svg/Like";
import { useDispatch } from "react-redux";
import { setLike, setUnLike } from "../../../queries/getPodcasts";

const AudioItem = ({ item, activeTrack, isLoad, handlePlayPause }) => {
  const formateDuration = (ms) => {
    let sec = Math.round(ms / 1000);
    let min = Math.floor(sec / 60);
    let hours = Math.floor(sec / 3600);
    sec %= 60;
    min %= 60;
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
    if (hours < 10) hours = "0" + hours;
    return hours === "00" ? min + ":" + sec : hours + ":" + min + ":" + sec;
  };

  const dispatch = useDispatch();

  const likeOrUnlike = () => {
    if (item.is_liked) {
      dispatch(setUnLike(item.id));
    } else {
      dispatch(setLike(item.id));
    }
  };

  return (
    item && (
      <View style={styles.audioItem}>
        <TouchableOpacity
          style={styles.playButton}
          activeOpacity={0.9}
          onPress={() => !isLoad.load && handlePlayPause(item)}
        >
          {isLoad.load && isLoad.id === item.id ? (
            <Lottie
              source={require("../../../assets/img/lotties/loadAudio.json")}
              autoPlay
              loop
              style={styles.lottie}
            />
          ) : activeTrack && activeTrack.status ? (
            activeTrack.status.isPlaying &&
            activeTrack.trackInfo.id === item.id ? (
              <PauseButton />
            ) : (
              <PlayButton />
            )
          ) : (
            <PlayButton />
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ width: "90%" }}>
            <Text style={styles.audioTitle}>{item.title}</Text>
            <View style={styles.audioInfo}>
              <Text style={styles.audioDate}>{formateDate(item.date)}</Text>
              <Text style={styles.audioDuration}>
                {formateDuration(item.length)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={likeOrUnlike}>
            {item.is_liked ? <Like /> : <Unlike />}
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

export default AudioItem;

const styles = StyleSheet.create({
  audioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  playButton: {
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  audioTitle: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Geometria-Bold",
    marginBottom: 7,
  },
  audioInfo: {
    flexDirection: "row",
  },
  audioDate: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Geometria-Regular",
    marginRight: 5,
  },
  audioDuration: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Geometria-Regular",
  },
  lottie: {
    width: 50,
    height: 50,
    marginLeft: -1,
  },
});
