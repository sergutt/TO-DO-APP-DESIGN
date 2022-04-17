import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const FloatingInput = ({ show, newToDo, setNewToDo, inputRef, onAdd }) => {
  return (
    <View style={{ position: "relative", height: 50, width: 250 }}>
      {!show ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 250,
            height: 50,
            backgroundColor: "#F2F1F6",
            zIndex: 10,
          }}
        />
      ) : null}

      <TextInput
        placeholder="Add to do item"
        value={newToDo}
        onChangeText={setNewToDo}
        onBlur={() => onAdd()}
        ref={inputRef}
        style={{
          height: 50,
          width: 250,
          position: "absolute",
          textAlign: "center",
          top: 0,
          left: 0,
        }}
      />
    </View>
  );
};

export default FloatingInput;

const styles = StyleSheet.create({});
