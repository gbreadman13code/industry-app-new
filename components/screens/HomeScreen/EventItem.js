import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Linking,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  nameOfMonth,
  nameOfMonthGeneral,
} from "../../../functions/formateDate";
import CustomButton from "../../elements/CustomButton/CustomButton";
import LinkIcon from "../../../assets/svg/LinkIcon";
import EventInDate from "./EventInDate";

const EventItem = ({ item }) => {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.monthName}>
        {item.month.split(" ")[0] +
          " " +
          nameOfMonth(Number(item.month.split(" ")[1]))}
      </Text>
      {item.items.map((point, index) => (
        <EventInDate key={index} point={point} />
      ))}
    </View>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  monthName: {
    fontFamily: "Geometria-Bold",
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
});
