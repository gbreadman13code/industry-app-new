import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

const FourDigitCodeInput = ({ onChangeText }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;

    setCode(newCode);

    if (text && index < 3) {
      switch (index) {
        case 0:
          inputRef2.current.focus();
          break;
        case 1:
          inputRef3.current.focus();
          break;
        case 2:
          inputRef4.current.focus();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    onChangeText(code.join(""));
  }, [code]);

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={code[0]}
          onChangeText={(text) => handleCodeChange(text, 0)}
          ref={inputRef1}
        />
        <TextInput
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={code[1]}
          onChangeText={(text) => handleCodeChange(text, 1)}
          ref={inputRef2}
        />
        <TextInput
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={code[2]}
          onChangeText={(text) => handleCodeChange(text, 2)}
          ref={inputRef3}
        />
        <TextInput
          style={[styles.input, { marginRight: 0 }]}
          maxLength={1}
          keyboardType="numeric"
          value={code[3]}
          onChangeText={(text) => handleCodeChange(text, 3)}
          ref={inputRef4}
        />
      </View>
      <TouchableOpacity
        onPress={() => setCode(["", "", "", ""])}
        style={{
          marginTop: 20,
          padding: 10,
        }}
      >
        <Text style={{ color: "#fff", fontFamily: "Geometria-Regular" }}>
          очистить
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FourDigitCodeInput;

const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    marginRight: 20,
    borderRadius: 10,
    fontSize: 40,
    textAlign: "center",
  },
});
