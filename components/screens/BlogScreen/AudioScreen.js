import { useCallback, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Lottie from "lottie-react-native";
import AudioItem from "./AudioItem";
import { useEffect } from "react";
import PauseButton from "../../../assets/svg/PauseButton";
import PlayButton from "../../../assets/svg/PlayButton";
import Slider from "react-native-a11y-slider";
import { Audio } from "expo-av";
import SliderMarkerComponent from "./SliderMarkerComponent";
import { useDispatch, useSelector } from "react-redux";
import { getPodcasts, setLike, setUnLike } from "../../../queries/getPodcasts";
import { useFocusEffect } from "@react-navigation/native";
import {
  setAudioAction,
  setCurrentTrackAction,
  setPlayAudioAction,
} from "../../../redux/reducers/AudioInstanceReducer";
import SearchFiled from "../../elements/SearchFiled/SearchFiled";
import Like from "../../../assets/svg/Like";
import Unlike from "../../../assets/svg/Unlike";
import { nameOfMonthGeneral } from "../../../functions/formateDate";
import { reformattedArray } from "../../../functions/reformattedArray";

const AudioScreen = () => {
  const [audioList, setAudioList] = useState();
  const [isLoad, setLoad] = useState({ load: false, id: 0 });
  const [searchWord, setSearchWord] = useState("");
  const [activePosition, setActivePosition] = useState();

  const podcastsRedux = useSelector((state) => state.podcasts.podcasts);
  const audioInstance = useSelector((state) => state.currentAudio.audio);
  const activeTrack = useSelector((state) => state.currentAudio.currentTrack);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(setPlayAudioAction(false));
      if (audioInstance) audioInstance.stopAsync();
    }
  }, [isAuth]);

  useEffect(() => {
    if (!podcastsRedux) return;
    if (searchWord) {
      searchByTitle(searchWord);
      return;
    }
    setAudioList(reformattedArray(podcastsRedux));
  }, [podcastsRedux, searchWord]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getPodcasts());
      return () => {};
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
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });
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
      // setAudioInstance(sound);
    }
  };

  const rewindTrack = async (position) => {
    setLoad({ load: true, id: activeTrack.trackInfo.id });
    await audioInstance.playFromPositionAsync(
      (activeTrack.status.durationMillis / 100) * position
    );
    dispatch(setPlayAudioAction(true));
    setLoad({ load: false, id: 0 });
  };

  useEffect(() => {
    if (!activeTrack) return;
    setActivePosition(activeTrack.status.positionMillis);
  }, [activeTrack]);

  const formateDuration = (ms) => {
    let sec = Math.round(ms / 1000);
    let min = Math.floor(sec / 60);
    let hours = Math.floor(sec / 3600);
    sec %= 60;
    min %= 60;
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
    if (hours < 10) hours = "0" + hours;
    return hours + ":" + min + ":" + sec;
  };

  const { width } = useWindowDimensions();

  const searchByTitle = (title) => {
    if (!podcastsRedux || podcastsRedux.length < 1) return;
    if (title === "") {
      setAudioList(reformattedArray(podcastsRedux));
      return;
    }
    const filteredArray = podcastsRedux.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
    setAudioList(reformattedArray(filteredArray));
  };

  const likeOrUnlike = (item) => {
    if (item.is_liked) {
      dispatch(setUnLike(item.id, true));
    } else {
      dispatch(setLike(item.id, true));
    }
  };

  return !audioList ? null : (
    <View style={{ flex: 1, marginTop: 20 }}>
      <SearchFiled color={"#B34382"} onChange={setSearchWord} />
      <ScrollView>
        {audioList.map((point, index) => (
          <View key={index}>
            <Text style={styles.monthName}>
              {nameOfMonthGeneral(point.month)}
            </Text>
            {point.items &&
              point.items.map((item, subindex) => (
                <AudioItem
                  key={subindex}
                  item={item}
                  isLoad={isLoad}
                  activeTrack={activeTrack}
                  handlePlayPause={handlePlayPause}
                />
              ))}
          </View>
        ))}
      </ScrollView>
      {activeTrack && (
        <View style={[styles.player, { width: width }]}>
          <View style={styles.timeLineContainer}>
            <Slider
              min={0}
              max={100}
              trackStyle={{ borderColor: "#C7CBC9" }}
              selectedTrackStyle={{ borderColor: "#B34382" }}
              markerComponent={SliderMarkerComponent}
              values={[
                Math.ceil(
                  (activeTrack.status.positionMillis /
                    activeTrack.status.durationMillis) *
                    100
                ),
              ]}
              showLabel={false}
              onChange={(e) => rewindTrack(e)}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View>
              <Text style={styles.playerTrackTitle}>
                {activeTrack.trackInfo.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                }}
              >
                {activeTrack.trackInfo.category && (
                  <Text style={[styles.playerTrackInfo, { marginRight: 10 }]}>
                    {activeTrack.trackInfo.category}
                  </Text>
                )}
                <Text style={[styles.playerTrackInfo, { color: "#B34382" }]}>
                  {formateDuration(activeTrack.status.positionMillis)}
                </Text>
              </View>
            </View>
            {/* <TouchableOpacity
              onPress={() => likeOrUnlike(activeTrack.trackInfo)}
            >
              {activeTrack.trackInfo.is_liked ? <Like /> : <Unlike />}
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.playButton}
              activeOpacity={0.9}
              onPress={() =>
                !isLoad.load && handlePlayPause(activeTrack.trackInfo)
              }
            >
              {isLoad.load ? (
                <Lottie
                  source={require("../../../assets/img/lotties/loadAudio.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ) : activeTrack.status ? (
                activeTrack.status.isPlaying ? (
                  <PauseButton />
                ) : (
                  <PlayButton />
                )
              ) : (
                <PlayButton />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default AudioScreen;

const styles = StyleSheet.create({
  player: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    position: "relative",
    marginTop: 5,
    backgroundColor: "#121212",
    left: -10,
  },
  timeLineContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 13,
    width: "100%",
    height: 15,
    position: "absolute",
    left: 0,
    top: -5,
    overflow: "hidden",
  },
  timeline: {
    height: 3,
    backgroundColor: "red",
  },
  monthName: {
    fontFamily: "Geometria-Bold",
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  lottie: {
    width: 40,
    height: 40,
    marginLeft: -1,
  },
  playerTrackTitle: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    fontSize: 18,
    marginBottom: 8,
  },
  playerTrackInfo: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
  },
});
