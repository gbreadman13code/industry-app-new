import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DecrementProductToBascketAction,
  IncrementProductToBascketAction,
} from "../../../../redux/reducers/BascketReducer";

const CounterBlock = ({ maxCount, setCount, count, productId }) => {
  const dispatch = useDispatch();

  const increment = () => dispatch(IncrementProductToBascketAction(productId));
  const decrement = () => dispatch(DecrementProductToBascketAction(productId));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={count <= 1 ? null : () => decrement()}>
        <Text
          style={[
            styles.text,
            {
              color: count === 1 ? "#43464A" : "#fff",
            },
          ]}
        >
          -
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>{count}</Text>
      <TouchableOpacity onPress={count >= maxCount ? null : () => increment()}>
        <Text
          style={[
            styles.text,
            { marginRight: 0, color: count === maxCount ? "#43464A" : "#fff" },
          ]}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CounterBlock;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#121212",
    paddingVertical: 4,
    paddingHorizontal: 9,
  },
  text: {
    color: "#fff",
    fontFamily: "Geometria-Bold",
    fontSize: 16,
    marginRight: 30,
  },
});
