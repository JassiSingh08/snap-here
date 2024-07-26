import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const TEXT_COLOR = "#000";

const ToggleSwitch = ({
  label,
  isEnabled,
  toggleSwitch,
  bgColor = ["#314755", "#26a0da"],
  justifyContent = "space-between",
  fonts,
}) => {
  return (
    <View style={[styles.container, { justifyContent: justifyContent }]}>
      <Text style={[styles.label, fonts ? { fontFamily: "RobotoMono" } : {}]}>
        {label}
      </Text>
      <Switch
        style={styles.switch}
        trackColor={{ false: "#767577", true: bgColor[0] }}
        thumbColor={isEnabled ? bgColor[1] : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 15,
    color: TEXT_COLOR,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Adjust the size of the switch
    marginLeft: 10,
  },
});

export default ToggleSwitch;
