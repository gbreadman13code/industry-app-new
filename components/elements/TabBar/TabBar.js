import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// import SvgUri from "react-native-svg-uri";

import { useEffect, useRef, useState } from "react";
import HomeSvg from "../../../assets/svg/HomeSvg";
import BlogSvg from "../../../assets/svg/BlogSvg";
import ShowroomSvg from "../../../assets/svg/ShowroomSvg";
import PartnersSvg from "../../../assets/svg/PartnersSvg";
import ProfileSvg from "../../../assets/svg/ProfileSvg";
import { useSelector } from "react-redux";
import BlogWithPlay from "../../../assets/svg/BlogWithPlay";

const MyTabBar = ({ state, descriptors, navigation }) => {
  const [barHeight, setBarHeight] = useState(74);
  const [isAudio, setAudio] = useState(false);
  const barWrap = useRef(null);
  const audioInstance = useSelector((state) => state.currentAudio.audio);
  const isPlay = useSelector((state) => state.currentAudio.isPlay);

  useEffect(() => {
    if (!audioInstance) {
      setAudio(false);
    } else {
      if (isPlay) {
        setAudio(true);
      } else {
        setAudio(false);
      }
    }
  }, [audioInstance, isPlay]);

  const AddImg = (label, isFocused, isAudio) => {
    switch (label) {
      case "Медиа":
        return isAudio ? (
          isFocused ? (
            <BlogSvg fill={"#E7E453"} />
          ) : (
            <BlogWithPlay />
          )
        ) : (
          <BlogSvg fill={isFocused ? "#E7E453" : "#43464A"} />
        );
      case "Шоурум":
        return <ShowroomSvg fill={isFocused ? "#E7E453" : "#43464A"} />;
      case "Главная":
        return <HomeSvg fill={isFocused ? "#E7E453" : "#43464A"} />;
      case "Партнеры":
        return <PartnersSvg fill={isFocused ? "#E7E453" : "#43464A"} />;
      case "Профиль":
        return <ProfileSvg fill={isFocused ? "#E7E453" : "#43464A"} />;
      default:
        return;
    }
  };

  useEffect(() => {
    barWrap.current.measure((x, y, width, height) => {
      setBarHeight(height);
    });
  }, [barWrap]);
  return (
    <View style={styles.barWrap} ref={barWrap}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            activeOpacity={1}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}
          >
            <View
              style={{
                width: 22,
                height: 23,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {AddImg(label, isFocused, isAudio)}
            </View>
            {/* <SvgUri
              width={20}
              height={20}
              source={isFocused ? icon_active : icon}
            /> */}
            <Text
              style={{
                color: isFocused ? "#e7e453" : "#43464A",
                fontFamily: isFocused ? "Geometria-Bold" : "Geometria-Regular",
                marginTop: 10,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // paddingBottom: 74,
    paddingBottom: 10,
    paddingTop: 10,
  },
  barWrap: {
    flexDirection: "row",
    // position: "absolute",
    // bottom: -74,
    // top: 20,
    // left: 0,
    width: "100%",
    backgroundColor: "#121212",
  },
});
