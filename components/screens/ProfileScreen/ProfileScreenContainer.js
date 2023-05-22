import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import ProfileScreen from "./ProfileScreen";
import SettingScreen from "./SettingsScreens/SettingScreen";
import EditInfoScreen from "./SettingsScreens/EditInfoScreen";
import DeleteAcountPage from "./SettingsScreens/DeleteAcountPage";
import ContactPage from "./SettingsScreens/ContactPage";
import PayAndDeliveryPage from "./SettingsScreens/PayAndDeliveryPage";
import PartnerProfile from "../PartnersScreen/PartnerProfile";
import ProductCard from "../ShowroomScreen/ProductCard";
import ProductProfile from "../ShowroomScreen/ProductProfile";
import ArticleProfile from "../BlogScreen/ArticleProfile";
import BascketScreen from "./OrderScreens/BascketScreen";

import { useFocusEffect, useRoute } from "@react-navigation/native";
import SuccessPay from "../../../assets/svg/SuccessPay";
import CustomButton from "../../elements/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { clearBascketAction } from "../../../redux/reducers/BascketReducer";
import LastOrdersScreen from "./OrderScreens/LastOrdersScreen";
import SellerProfile from "../ShowroomScreen/SellerProfile";

const ProfileScreenContainer = ({ navigation }) => {
  const [isShowSuccessPage, setShowSuccessPage] = useState(false);
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  const route = useRoute();
  // const { isSuccessPay } = route.params;

  useEffect(() => {
    if (route.params && route.params.isSuccessPay) {
      setShowSuccessPage(true);
    }
  }, [route]);

  const continuiePress = () => {
    setShowSuccessPage(false);
    route.params.isSuccessPay = false;

    dispatch(clearBascketAction());

    // navigation.navigate("Главная");
  };

  return (
    <>
      <Stack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="EditInfo" component={EditInfoScreen} />
        <Stack.Screen name="DeleteAcount" component={DeleteAcountPage} />
        <Stack.Screen name="Contacts" component={ContactPage} />
        <Stack.Screen name="PayAndDelivery" component={PayAndDeliveryPage} />

        <Stack.Screen name="Partner" component={PartnerProfile} />
        <Stack.Screen name="Seller" component={SellerProfile} />
        <Stack.Screen name="Product" component={ProductProfile} />
        <Stack.Screen name="ArticleProfile" component={ArticleProfile} />

        <Stack.Screen name="BascketScreen" component={BascketScreen} />
        <Stack.Screen name="LastOrders" component={LastOrdersScreen} />
      </Stack.Navigator>
      {isShowSuccessPage && (
        <View style={styles.success}>
          <SuccessPay />
          <Text
            style={{
              fontFamily: "Geometria-Regular",
              fontSize: 20,
              textAlign: "center",
              color: "#fff",
              marginTop: 28,
              marginBottom: 28,
            }}
          >
            Спасибо!
          </Text>
          <Text
            style={{
              fontFamily: "Geometria-Regular",
              fontSize: 20,
              textAlign: "center",
              color: "#fff",
            }}
          >
            Заказ успешно оплачен!
          </Text>
          <Text
            style={{
              fontFamily: "Geometria-Regular",
              fontSize: 20,
              textAlign: "center",
              color: "#fff",
              marginBottom: 28,
            }}
          >
            Администратор свяжется с Вами в ближайшее время
          </Text>
          <View style={{ width: "80%" }}>
            <CustomButton onClick={continuiePress}>
              <Text
                style={{
                  fontFamily: "Geometria-Regular",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Далее
              </Text>
            </CustomButton>
          </View>
        </View>
      )}
    </>
  );
};

export default ProfileScreenContainer;

const styles = StyleSheet.create({
  success: {
    flex: 1,
    backgroundColor: "#000",
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
