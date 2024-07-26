import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "./lib/constants";

export default function BackgroundColors({ setBgColor }) {
  return (
    <View style={styles.container}>
      <View style={styles.colorOptionsContainer}>
        {colors.map((colorPair, index) => (
          <TouchableOpacity
            key={index}
            style={styles.colorCircle}
            onPress={() => {
              setBgColor(colorPair);
            }}
          >
            <LinearGradient colors={colorPair} style={styles.gradient} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    padding: 10,
    alignItems: "center",
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "#fffF",
  },
  colorOptions: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
  },
  colorOptionsContainer: {
    flexDirection: "row",
    width: "70%",
    flexWrap: "wrap",
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 2,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
  },
  colors: {
    width: "100%",
    height: 40,
  },
});
