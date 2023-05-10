import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import OpenEye from "../../../assets/svg/OpenEye";
import ClosedEye from "../../../assets/svg/ClosedEye";

const CustomTextInput = ({
  keyboardType = "default",
  placeholder,
  password,
  onChangeText,
  value,
  maxLength,
  editable,
}) => {
  const [isFocudes, setFocused] = useState(false);
  const [isPassword, setPassword] = useState(password);

  return (
    <View style={{ position: "relative" }}>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        placeholderTextColor={"#43464A"}
        style={
          editable
            ? isFocudes
              ? styles.focusedInput
              : styles.input
            : styles.nonEditableInput
        }
        secureTextEntry={isPassword}
        // autoComplete={"off"}
        textContentType={"oneTimeCode"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType={keyboardType}
        keyboardAppearance="light"
        maxLength={maxLength}
        editable={editable}
      />
      {password && value && (
        <TouchableOpacity
          onPress={() => setPassword(!isPassword)}
          style={{
            width: 40,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: 10,
            top: 15,
          }}
        >
          {isPassword ? <OpenEye /> : <ClosedEye />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    padding: 16,
    fontFamily: "Geometria-Regular",
    fontSize: 14,
  },
  focusedInput: {
    borderWidth: 1,
    borderColor: "#E7E453",
    color: "#fff",
    padding: 16,
    fontFamily: "Geometria-Regular",
    fontSize: 14,
  },
  nonEditableInput: {
    borderWidth: 1,
    borderColor: "#43464A",
    color: "#43464A",
    padding: 16,
    fontFamily: "Geometria-Regular",
    fontSize: 14,
  },
});
