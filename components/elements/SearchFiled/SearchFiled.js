import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchIcon from "../../../assets/svg/SearchIcon";

const SearchFiled = ({ color, onChange }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <View style={[styles.container, { borderBottomColor: color }]}>
      <SearchIcon fill={color} />
      <TextInput
        style={[styles.input, { color: color }]}
        placeholder="Что найти? "
        placeholderTextColor={color}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

export default SearchFiled;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // paddingVertical: 10,
    paddingBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  input: {
    marginLeft: 5,
    fontFamily: "Geometria-Regular",
    flex: 1,
  },
});
