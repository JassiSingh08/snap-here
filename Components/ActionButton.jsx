import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const ActionButton = ({ onPress, Color = ["#192f6a"], work, textStyle }) => {
  const getButtonText = (work) => {
    switch (work) {
      case "copy":
        return <Feather name="copy" size={24} color="white" />;
      case "clear":
        return <FontAwesome5 name="eraser" size={24} color="white" />;
      case "export":
        return <Entypo name="export" size={24} color="white" />;
      case "download":
        return <AntDesign name="download" size={24} color="white" />;
      default:
        return "Action";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Color[0] }]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{getButtonText(work)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 99,
    width: 70,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ActionButton;
