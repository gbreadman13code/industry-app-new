import { SafeAreaView, StyleSheet, Text, View, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ArrowBack from "../../../../assets/svg/ArrowBack";
import BackButton from "../../../elements/BackButton/BackButton";
import { logout } from "../../../../queries/logout";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../../../queries/getContacts";
import { clearBascketAction } from "../../../../redux/reducers/BascketReducer";

const SettingScreen = ({ navigation }) => {
  const [mailTo, setMailTo] = useState();

  const contactsRedux = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!contactsRedux) return;
    if (contactsRedux.emails.length > 0) {
      setMailTo(contactsRedux.emails[0].text);
    }
  }, [contactsRedux]);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handlePress = () => {
    Linking.openURL("mailto:" + mailTo);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginBottom: 25,
          }}
        >
          <View style={{ position: "absolute", left: 0 }}>
            <BackButton navigate={() => navigation.goBack()} />
          </View>
          <Text style={styles.header}>Настройки</Text>
        </View>
        <View style={styles.yellowHeader}>
          <Text style={styles.yellowText}>Настройки</Text>
          <View style={styles.yellowDecor}></View>
        </View>
        <View style={{ marginTop: 16 }}>
          <View style={{ marginBottom: 24 }}>
            {/* <TouchableOpacity style={{ marginBottom: 8 }} onPress={null}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Geometria-Regular",
                }}
              >
                Уведомления
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{ marginBottom: 8 }}
              onPress={() => navigation.navigate("PayAndDelivery")}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Geometria-Regular",
                }}
              >
                Оплата и доставка
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 24 }}>
            {mailTo && (
              <TouchableOpacity
                style={{ marginBottom: 8 }}
                onPress={handlePress}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "Geometria-Regular",
                  }}
                >
                  Связаться с нами
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginBottom: 24 }}>
            <TouchableOpacity
              style={{ marginBottom: 8 }}
              onPress={() => navigation.navigate("Contacts")}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Geometria-Regular",
                }}
              >
                Контакты
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 24 }}>
            <TouchableOpacity
              style={{ marginBottom: 8 }}
              onPress={() => navigation.navigate("DeleteAcount")}
            >
              <Text
                style={{
                  color: "#B34382",
                  fontSize: 14,
                  fontFamily: "Geometria-Regular",
                }}
              >
                Удалить аккаунт
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 24 }}>
            <TouchableOpacity
              style={{ marginBottom: 8 }}
              onPress={() => {
                dispatch(logout());
                dispatch(clearBascketAction());
              }}
            >
              <Text
                style={{
                  color: "#B34382",
                  fontSize: 14,
                  fontFamily: "Geometria-Regular",
                }}
              >
                Выйти
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
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
    marginBottom: 20,
  },
  yellowHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  yellowText: {
    color: "#E7E453",
    fontFamily: "Geometria-Regular",
    fontSize: 14,
    marginRight: 5,
    fontSize: 16,
  },
  yellowDecor: {
    backgroundColor: "#E7E453",
    height: 1,
    flex: 1,
  },
});
