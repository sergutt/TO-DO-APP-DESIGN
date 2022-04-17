import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "./Colors";

export default ({ buttonStyle, textStyle, onPress, text }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    lineHeight: 35,
    letterSpacing: -0.08,
  },
});
