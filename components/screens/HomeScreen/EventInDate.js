import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Linking,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import RenderHtml from "react-native-render-html";
import Constants from "expo-constants";
import CustomButton from "../../elements/CustomButton/CustomButton";
import LinkIcon from "../../../assets/svg/LinkIcon";

const EventInDate = ({ point }) => {
  const [color, setColor] = useState("#000");

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  const getRandomColor = () => {
    const colorArray = ["#E7E453", "#55A290", "#B34382", "#464A88"];

    const randomNum = Math.random();
    if (randomNum <= 0.25) {
      return colorArray[0];
    }
    if (randomNum > 0.25 && randomNum <= 0.5) {
      return colorArray[1];
    }
    if (randomNum > 0.5 && randomNum <= 0.75) {
      return colorArray[2];
    }
    if (randomNum > 0.75) {
      return colorArray[3];
    }
  };

  const memoizedSystemFonts = useMemo(() => {
    return [...Constants.systemFonts, "Geometria-Regular"];
  }, [Constants.systemFonts]);

  const { width } = useWindowDimensions();

  const formattedTime = (string) => {
    const date = new Date(string);
    let start_hours = date.getHours();
    let start_minutes = date.getMinutes();

    if (start_hours < 10) {
      start_hours = "0" + start_hours;
    }
    if (start_minutes < 10) {
      start_minutes = "0" + start_minutes;
    }

    return start_hours + ":" + start_minutes;
  };

  const linkToSite = (site) => {
    Linking.openURL(site);
  };
  return (
    <View
      style={{
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: "#fff",
        paddingLeft: 8,
        marginBottom: 30,
        alignItems: "flex-start",
      }}
    >
      <Text style={[styles.event_title, { color: color }]}>
        {point.event_title}
      </Text>
      {point.text.includes("<p") ? (
        <RenderHtml
          contentWidth={width}
          source={{ html: point.text }}
          tagsStyles={description}
          enableExperimentalMarginCollapsing={true}
          systemFonts={memoizedSystemFonts}
        />
      ) : (
        <Text style={styles.event_title}>{point.text}</Text>
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.date}>{formattedTime(point.start_datetime)}</Text>
        <Text
          style={{
            color: color,
            marginHorizontal: 8,
            fontSize: 20,
            lineHeight: 22,
          }}
        >
          |
        </Text>
        <Text style={styles.location}>{point.event_location_start}</Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <View style={point.link_title ? { marginRight: 10 } : {}}>
          <Text
            style={[styles.path_title, { color: color, borderColor: color }]}
          >
            {point.path_title}
          </Text>
        </View>
        {point.link_title && (
          <CustomButton
            paddingVertical={4}
            paddingHorizontal={4}
            onClick={() => point.link && linkToSite(point.link)}
            backgroundColor={color}
            borderColor={color}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {point.link && <LinkIcon />}
              <Text style={{ marginLeft: 4, fontFamily: "Geometria-Regular" }}>
                {point.link_title}
              </Text>
            </View>
          </CustomButton>
        )}
      </View>
    </View>
  );
};

export default EventInDate;

const description = StyleSheet.create({
  p: {
    marginTop: 10,
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    lineHeight: 17,
  },
});

const styles = StyleSheet.create({
  event_title: {
    color: "#fff",
    fontFamily: "Geometria-Regular",
    fontSize: 18,
    marginBottom: 5,
  },
  date: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Geometria-Bold",
    lineHeight: 22,
  },
  location: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Geometria-Regular",
    lineHeight: 22,
    verticalAlign: "bottom",
  },
  path_title: {
    fontSize: 14,
    fontFamily: "Geometria-Regular",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
});
