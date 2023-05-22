import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ArrowBack from "../../../../assets/svg/ArrowBack";
import BackButton from "../../../elements/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import FourDigitCodeInput from "../../../elements/FourDigitCodeInput/FourDigitCodeInput";
import CustomButton from "../../../elements/CustomButton/CustomButton";
import { DeleteAcount } from "../../../../queries/deleteAccount";
import { getContacts } from "../../../../queries/getContacts";
import LocationGreen from "../../../../assets/svg/LocationGreen";
import PhoneGreen from "../../../../assets/svg/PhoneGreen";
import MailGreen from "../../../../assets/svg/MailGreen";
import WebSiteGreen from "../../../../assets/svg/WebSiteGreen";
import VkSvg from "../../../../assets/svg/VkSvg";
import TgSvg from "../../../../assets/svg/TgSvg";
import AgreementLinePink from "../../../../assets/svg/AgreementLinePink";

const ContactPage = ({ navigation }) => {
  const [contacts, setContacts] = useState();

  const contactsRedux = useSelector((state) => state.contacts.contacts);

  const linkToCall = (number) => {
    const string = number.split(" ").join("");
    Linking.openURL(`tel:${string}`);
  };

  const linkToMail = (e_mail) => {
    Linking.openURL(`mailto:${e_mail}`);
  };

  const linkToSite = (site) => {
    Linking.openURL(site);
  };

  const linkToSocial = (link) => {
    Linking.openURL(link);
  };

  const linkToDoc = (link) => {
    Linking.openURL(link);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!contactsRedux) return;
    if (contactsRedux.socials.length > 0) {
      let vk_links = [];
      let tg_links = [];
      contactsRedux.socials.forEach((item) =>
        item.social_type === "vk" ? vk_links.push(item) : tg_links.push(item)
      );
      let newObj = contactsRedux;
      newObj.socials = { tg: tg_links, vk: vk_links };
      setContacts(newObj);
      return;
    }
    setContacts(contactsRedux);
  }, [contactsRedux]);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
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
            <Text style={styles.header}>Контакты</Text>
          </View>
          <View style={styles.yellowHeader}></View>
          <View style={{ marginTop: 16 }}>
            {contacts && (
              <>
                {contacts.addresses.length > 0 && (
                  <View style={styles.contactItem}>
                    <Text style={styles.title}>Мы находимся</Text>
                    <View style={styles.contactContent}>
                      <View style={{ marginRight: 20 }}>
                        <LocationGreen />
                      </View>
                      {contacts.addresses.map((item, index) => (
                        <Text key={index} style={styles.contactContentText}>
                          {item.text}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {contacts.phones.length > 0 && (
                  <View style={styles.contactItem}>
                    <Text style={styles.title}>Позвонить нам</Text>
                    <View style={styles.contactContent}>
                      <View style={{ marginRight: 20 }}>
                        <PhoneGreen />
                      </View>
                      {contacts.phones.map((item, index) => (
                        <Text
                          key={index}
                          style={styles.contactContentText}
                          onPress={() => linkToCall(item.text)}
                        >
                          {item.text}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {contacts.emails.length > 0 && (
                  <View style={styles.contactItem}>
                    <Text style={styles.title}>Написать нам</Text>
                    <View style={styles.contactContent}>
                      <View style={{ marginRight: 20 }}>
                        <MailGreen />
                      </View>
                      {contacts.emails.map((item, index) => (
                        <Text
                          key={index}
                          style={styles.contactContentText}
                          onPress={() => linkToMail(item.text)}
                        >
                          {item.text}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {contacts.sites.length > 0 && (
                  <View style={styles.contactItem}>
                    <Text style={styles.title}>
                      {contacts.sites.length > 1 ? "Наши сайты" : "Наш сайт"}
                    </Text>
                    <View style={styles.contactContent}>
                      <View style={{ marginRight: 20 }}>
                        <WebSiteGreen />
                      </View>
                      {contacts.sites.map((item, index) => (
                        <Text
                          key={index}
                          style={styles.contactContentText}
                          onPress={() => linkToSite(item.link)}
                        >
                          {item.text}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {contacts.socials && (
                  <View style={styles.contactItem}>
                    <Text style={styles.title}>Мы в соцсетях</Text>
                    {contacts.socials.vk.length > 0 && (
                      <View style={styles.contactContent}>
                        <View style={{ marginRight: 20 }}>
                          <VkSvg />
                        </View>
                        {contacts.socials.vk.map((subItem, subindex) => (
                          <Text
                            key={subindex}
                            style={styles.contactContentText}
                            onPress={() => linkToSocial(subItem.link)}
                          >
                            {subItem.text}
                          </Text>
                        ))}
                      </View>
                    )}
                    {contacts.socials.tg.length > 0 && (
                      <View style={[styles.contactContent, { marginTop: 10 }]}>
                        <View style={{ marginRight: 20 }}>
                          <TgSvg />
                        </View>
                        {contacts.socials.tg.map((subItem, subindex) => (
                          <Text
                            key={subindex}
                            style={styles.contactContentText}
                            onPress={() => linkToSocial(subItem.link)}
                          >
                            {subItem.text}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                )}
                <View style={styles.contactItem}>
                  {contacts.user_agreement && (
                    <TouchableOpacity
                      onPress={() => linkToDoc(contacts.user_agreement)}
                      style={[styles.contactContent, { marginBottom: 20 }]}
                    >
                      <View style={{ marginRight: 20 }}>
                        <AgreementLinePink />
                      </View>
                      <Text style={styles.contactContentText}>
                        Пользовательское соглашение
                      </Text>
                    </TouchableOpacity>
                  )}
                  {contacts.confidential_policy && (
                    <TouchableOpacity
                      onPress={() => linkToDoc(contacts.confidential_policy)}
                      style={[styles.contactContent, { marginBottom: 20 }]}
                    >
                      <View style={{ marginRight: 20 }}>
                        <AgreementLinePink />
                      </View>
                      <Text style={styles.contactContentText}>
                        Политика конфиденциальности
                      </Text>
                    </TouchableOpacity>
                  )}
                  {contacts.ogrn && (
                    <View style={[styles.contactContent, { marginBottom: 10 }]}>
                      <View>
                        <Text
                          style={{
                            fontFamily: "Geometria-Bold",
                            fontSize: 16,
                            color: "#fff",
                          }}
                        >
                          ОГРН:{" "}
                        </Text>
                      </View>
                      <Text style={styles.contactContentText}>
                        {contacts.ogrn}
                      </Text>
                    </View>
                  )}
                  {contacts.inn && (
                    <View style={styles.contactContent}>
                      <View>
                        <Text
                          style={{
                            fontFamily: "Geometria-Bold",
                            fontSize: 16,
                            color: "#fff",
                          }}
                        >
                          ИНН:{" "}
                        </Text>
                      </View>
                      <Text style={styles.contactContentText}>
                        {contacts.inn}
                      </Text>
                    </View>
                  )}
                </View>
              </>
            )}
            {/* <View style={styles.contactItem}>
            <Text style={styles.title}></Text>
            <View style={styles.contactContent}>
              <View></View>
            </View>
          </View> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ContactPage;

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
    fontSize: 16,
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
  contactItem: {
    padding: 11,
    borderWidth: 1,
    borderColor: "#43464A",
    marginBottom: 5,
  },
  title: {
    color: "#E7E453",
    fontFamily: "Geometria-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  contactContent: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  contactContentText: {
    fontFamily: "Geometria-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationColor: "#fff",
    color: "#fff",
    marginRight: 20,
  },
});
