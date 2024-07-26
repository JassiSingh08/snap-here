import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CommonSlider = ({ value, onValueChange, Color = ["#08e"], label }) => {
  const progress = useSharedValue(value);
  const min = useSharedValue(10);
  const max = useSharedValue(30);

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        onValueChange={onValueChange}
        onHapticFeedback={() => {
          ReactNativeHapticFeedback.trigger("impactLight", {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
          });
        }}
        step={4}
        snapToStep={true}
        theme={{
          minimumTrackTintColor: Color[0],
          bubbleBackgroundColor: Color[0],
        }}
        renderBubble={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  slider: {
    width: "90%",
    height: 40,
    marginLeft: 20,
  },
});

export default CommonSlider;
