import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPartnersCategories } from "../../../queries/getPartnersCategories";
import { getPartners } from "../../../queries/getPartners";
import Lottie from "lottie-react-native";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import { setGastronomyIdAction } from "../../../redux/reducers/GastronomyReducer";

const PartnersList = ({ navigation, route }) => {
  const [categories, setCategories] = useState();
  const [partners, setPartners] = useState();
  const [isLoad, setLoad] = useState(false);
  const [isLoadPartners, setLoadPartners] = useState(false);

  const [activeCategories, setActiveCategories] = useState([]);

  const categoriesRedux = useSelector(
    (state) => state.partnersCategories.categories
  );
  const partnersRedux = useSelector((state) => state.partners.partners);

  const gastronomyId = useSelector(
    (state) => state.gastronomy_id.gastronomy_id
  );

  useEffect(() => {
    if (gastronomyId !== -1) {
      if (activeCategories.includes(gastronomyId)) return;
      categoryClickHandler(gastronomyId);
    }
  }, [gastronomyId]);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoadPartners(true);

    let sort_parametres_array = [];
    if (activeCategories.length > 0) {
      activeCategories.map((item) =>
        sort_parametres_array.push("category=" + item)
      );
    }
    const sort_parametres = sort_parametres_array.join("&");
    dispatch(getPartners(sort_parametres, setLoad, setLoadPartners));
  }, [dispatch, activeCategories]);

  const categoryClickHandler = (categoryId) => {
    if (activeCategories.includes(categoryId)) {
      setActiveCategories(
        activeCategories.filter((item) => item !== categoryId)
      );
    } else {
      setActiveCategories((prevState) => [...prevState, categoryId]);
    }
  };

  const navigateToProfile = (id) => {
    navigation.navigate("Partner", { id: id });
  };

  useEffect(() => {
    if (!categoriesRedux || categoriesRedux.length < 1) return;
    setCategories(categoriesRedux);
  }, [categoriesRedux]);

  useEffect(() => {
    if (!partnersRedux || partnersRedux.length < 1) return;
    setPartners(partnersRedux);
  }, [partnersRedux]);

  const clearActiveCategories = () => {
    setActiveCategories([]);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setActiveCategories([]);
      };
    }, [])
  );

  useEffect(() => {
    setLoad(true);
    dispatch(getPartnersCategories());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(setGastronomyIdAction(-1));
    }, [])
  );

  const { width } = useWindowDimensions();

  return isLoad ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrap}>
          <TouchableOpacity
            onPress={clearActiveCategories}
            activeOpacity={1}
            style={{
              borderColor: activeCategories.length < 1 ? "#E7E453" : "#43464A",
              borderWidth: 1,
              padding: 4,
              position: "absolute",
              left: 0,
              top: 0,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                color: activeCategories.length < 1 ? "#E7E453" : "#43464A",
                fontFamily:
                  activeCategories.length < 1
                    ? "Geometria-Bold"
                    : "Geometria-Regular",
                fontSize: 14,
              }}
            >
              Все
            </Text>
          </TouchableOpacity>
          <Text style={styles.header}>Список партнеров</Text>
        </View>
        <View style={styles.lottieContainer}>
          <Lottie
            source={require("../../../assets/img/lotties/loader-square.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      </View>
    </SafeAreaView>
  ) : isLoadPartners ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrap}>
          <TouchableOpacity
            onPress={clearActiveCategories}
            activeOpacity={1}
            style={{
              borderColor: activeCategories.length < 1 ? "#E7E453" : "#43464A",
              borderWidth: 1,
              padding: 4,
              position: "absolute",
              left: 0,
              top: 0,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                color: activeCategories.length < 1 ? "#E7E453" : "#43464A",
                fontFamily:
                  activeCategories.length < 1
                    ? "Geometria-Bold"
                    : "Geometria-Regular",
                fontSize: 14,
              }}
            >
              Все
            </Text>
          </TouchableOpacity>
          <Text style={styles.header}>Список партнеров</Text>
        </View>
        {categories && (
          <View style={styles.sort}>
            {categories &&
              categories.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  style={{
                    borderColor: activeCategories.includes(item.id)
                      ? "#E7E453"
                      : "#43464A",
                    borderWidth: 1,
                    padding: 4,
                  }}
                  onPress={() => categoryClickHandler(item.id)}
                >
                  <Text
                    style={{
                      color: activeCategories.includes(item.id)
                        ? "#E7E453"
                        : "#43464A",
                      fontFamily: activeCategories.includes(item.id)
                        ? "Geometria-Bold"
                        : "Geometria-Regular",
                      fontSize: 14,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            {/* <FlatList
              horizontal={true}
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={(item) => {
                return (
                  
                );
              }}
            /> */}
          </View>
        )}
        <View style={styles.lottieContainer}>
          <Lottie
            source={require("../../../assets/img/lotties/loader-square.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.headerWrap}>
            <TouchableOpacity
              onPressIn={clearActiveCategories}
              activeOpacity={1}
              style={{
                borderColor:
                  activeCategories.length < 1 ? "#E7E453" : "#43464A",
                borderWidth: 1,
                padding: 4,
                position: "absolute",
                left: 0,
                top: 0,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  color: activeCategories.length < 1 ? "#E7E453" : "#43464A",
                  fontFamily:
                    activeCategories.length < 1
                      ? "Geometria-Bold"
                      : "Geometria-Regular",
                  fontSize: 14,
                }}
              >
                Все
              </Text>
            </TouchableOpacity>
            <Text style={styles.header}>Список партнеров</Text>
          </View>
          {categories && (
            <View style={styles.sort}>
              {categories &&
                categories.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={index}
                    style={{
                      borderColor: activeCategories.includes(item.id)
                        ? "#E7E453"
                        : "#43464A",
                      borderWidth: 1,
                      padding: 4,
                    }}
                    onPress={() => categoryClickHandler(item.id)}
                  >
                    <Text
                      style={{
                        color: activeCategories.includes(item.id)
                          ? "#E7E453"
                          : "#43464A",
                        fontFamily: activeCategories.includes(item.id)
                          ? "Geometria-Bold"
                          : "Geometria-Regular",
                        fontSize: 14,
                      }}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              {/* <FlatList
                horizontal={true}
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={(item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        borderColor: activeCategories.includes(item.item.id)
                          ? "#E7E453"
                          : "#43464A",
                        borderWidth: 1,
                        marginRight: 8,
                        padding: 4,
                      }}
                      onPress={() => categoryClickHandler(item.item.id)}
                    >
                      <Text
                        style={{
                          color: activeCategories.includes(item.item.id)
                            ? "#E7E453"
                            : "#43464A",
                          fontFamily: activeCategories.includes(item.item.id)
                            ? "Geometria-Bold"
                            : "Geometria-Regular",
                          fontSize: 14,
                        }}
                      >
                        {item.item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              /> */}
            </View>
          )}
          {partners && (
            <View style={{ gap: 8, marginTop: 24 }}>
              {partners.map((item, index) => (
                <TouchableOpacity
                  style={styles.item}
                  key={index}
                  onPress={() => navigateToProfile(item.id)}
                >
                  <ImageBackground
                    source={{ uri: item.cropped_image }}
                    style={{
                      width: width * 0.16,
                      height: width * 0.16,
                      flex: 1,
                    }}
                  ></ImageBackground>
                  <View
                    style={{
                      justifyContent: "center",
                      minHeight: 48,
                      flex: 4,
                    }}
                  >
                    <Text
                      style={[
                        styles.title,
                        { marginBottom: item.address ? 6 : 0 },
                      ]}
                    >
                      {item.title}
                    </Text>
                    {item.address && (
                      <Text style={styles.address}>{item.address}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PartnersList;

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
    marginTop: 12,
    fontSize: 20,
  },
  sort: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  item: {
    flexDirection: "row",
    gap: 8,
    width: "85%",
    marginBottom: 15,
  },
  title: {
    fontFamily: "Geometria-Bold",
    color: "#fff",
    fontSize: 16,
    flexWrap: "wrap",
  },
  address: {
    color: "#C7CBC9",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
  },

  lottieContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    backgroundColor: "#000",
    width: 200,
    height: 120,
  },
});
