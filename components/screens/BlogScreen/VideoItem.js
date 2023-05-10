import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Video, ResizeMode } from "expo-av";
import { useState } from "react";
import Lottie from "lottie-react-native";
import { formateDuration, isLessOneDay } from "../../../functions/formateDate";
import ShareSvg from "../../../assets/svg/ShateSvg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideosById,
  setVideoLike,
  setVideoUnLike,
} from "../../../queries/getVideos";
import { setCurrentVideoAction } from "../../../redux/reducers/VideoInstanceReducer";
import Like from "../../../assets/svg/Like";
import Unlike from "../../../assets/svg/Unlike";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const VideoItem = ({ item, playAndPauseVideo }) => {
  const [isLoad, setLoad] = useState(false);
  const currentVideoRedux = useSelector((state) => state.video.current_video);

  const dispatch = useDispatch();

  const likeOrUnlike = () => {
    if (item.is_liked) {
      dispatch(setVideoUnLike(item.id));
    } else {
      dispatch(setVideoLike(item.id));
    }
  };

  const videoRef = useRef(null);

  const clickHandler = () => {
    setLoad(true);
    playAndPauseVideo(item, videoRef, setLoad);
  };

  const posterComponent = () => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: 192,
          position: "relative",
          left: 0,
          top: 0,
          display:
            currentVideoRedux && currentVideoRedux.item.id === item.id
              ? "none"
              : "flex",
        }}
        onPress={() =>
          currentVideoRedux && currentVideoRedux.item.id === item.id
            ? null
            : clickHandler()
        }
      >
        <ImageBackground
          source={{ uri: item.promo_image }}
          style={{ width: "100%", height: 192 }}
        >
          <View style={styles.duration}>
            <Text style={styles.durationText}>
              {formateDuration(item.length)}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.item}>
      <View style={styles.video_container}>
        <Video
          ref={videoRef}
          style={{
            width: "100%",
            height: 192,
            // zIndex: 1,
            position: "relative",
          }}
          onLoad={() => setLoad(false)}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          PosterComponent={
            currentVideoRedux && currentVideoRedux.item.id === item.id
              ? null
              : posterComponent
          }
          usePoster={true}
          onPlaybackStatusUpdate={(status) =>
            status.isPlayed === true && setLoad(false)
          }
        />
        {isLoad && (
          <View style={styles.lottieContainer}>
            <Lottie
              source={require("../../../assets/img/lotties/loader-square.json")}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        )}
      </View>
      <View style={styles.video_info}>
        <View style={styles.video_text}>
          <Text style={styles.title}>{item.title}</Text>
          <View>
            <Text style={styles.timeFromCreate}>
              {isLessOneDay(item.datetime)}
            </Text>
          </View>
        </View>
        <View style={styles.video_control}>
          {/* <ShareSvg /> */}
          <TouchableOpacity onPress={likeOrUnlike} style={{ marginLeft: 15 }}>
            {item.is_liked ? <Like /> : <Unlike />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VideoItem;

const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
  },
  video_container: {
    position: "relative",
  },
  lottieContainer: {
    position: "absolute",
    width: "100%",
    height: 192,
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "#000",
    opacity: 0.3,
  },
  video_control: {
    flexDirection: "row",
  },
  video_info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 20,
    marginTop: 10,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: "#464A88",
  },
  video_text: {
    flex: 1,
  },
  duration: {
    position: "absolute",
    bottom: 7,
    right: 7,
    backgroundColor: "#464A88",
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  durationText: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 12,
    lineHeight: 12,
  },
  title: {
    color: "#fff",
    textTransform: "uppercase",
    fontFamily: "Geometria-Bold",
    fontSize: 16,
    marginBottom: 4,
  },
  timeFromCreate: {
    fontSize: 14,
    fontFamily: "Geometria-Regular",
    color: "#fff",
  },
});
