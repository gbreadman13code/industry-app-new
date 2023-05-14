import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BackButton from "../../elements/BackButton/BackButton";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../../queries/getEvents";
import {
  reformattedArray,
  reformattedEventsArray,
} from "../../../functions/reformattedArray";
import EventItem from "./EventItem";

const Events = ({ navigation }) => {
  const [events, setEvents] = useState();

  const eventsRedux = useSelector((state) => state.events.events);

  useEffect(() => {
    if (!eventsRedux) return;
    setEvents(reformattedEventsArray(eventsRedux));
  }, [eventsRedux]);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getEvents());
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrap}>
          <View style={{ position: "absolute", left: 0, top: 0 }}>
            <BackButton navigate={() => navigation.goBack()} />
          </View>
          <Text style={styles.header}>Куда сходить?</Text>
        </View>
        {events && events.length > 0 && (
          <ScrollView>
            {events.map((point, index) => (
              <EventItem key={index} item={point} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
    // paddingBottom: 30,
    paddingHorizontal: 10,
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 15,
  },
  header: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    textAlign: "center",
    fontSize: 20,
    marginTop: 12,
  },
});
