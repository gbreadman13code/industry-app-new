import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLkedPartners } from "../../../../queries/getPartners";
import { useFocusEffect } from "@react-navigation/native";

const FavoritePartners = ({ navigation }) => {
  const [likedPartners, setLikedPartners] = useState();

  const likedPartnersRedux = useSelector(
    (state) => state.partners.liked_partners
  );

  useEffect(() => {
    if (!likedPartnersRedux) return;
    setLikedPartners(likedPartnersRedux);
  }, [likedPartnersRedux]);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getLkedPartners());

      return async () => {};
    }, [])
  );

  const { width } = useWindowDimensions();
  return (
    <>
      <View style={styles.yellowHeader_more}>
        <Text style={styles.yellowText_more}>Мои подписки</Text>
        <View style={styles.yellowDecor_more}></View>
        <TouchableOpacity activeOpacity={1}>
          <Text style={styles.yellowText_more_end}>
            {likedPartners && likedPartners.length}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        {likedPartners
          ? likedPartners.length > 0 &&
            likedPartners.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Partner", { id: item.id })}
                style={{
                  borderWidth: 1,
                  borderColor: "#C7CBC9",
                  marginRight:
                    index === likedPartners.length - 1 ? 0 : width * 0.03,
                }}
              >
                <ImageBackground
                  source={{ uri: item.cropped_image }}
                  style={{
                    height: width * 0.18,
                    width: width * 0.18,
                  }}
                ></ImageBackground>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </>
  );
};

export default FavoritePartners;

const styles = StyleSheet.create({
  yellowHeader_more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  yellowText_more: {
    color: "#E7E453",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  yellowText_more_end: {
    color: "#E7E453",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginLeft: 5,
    fontSize: 16,
  },
  yellowDecor_more: {
    backgroundColor: "#E7E453",
    height: 1,
    flex: 1,
  },
});
