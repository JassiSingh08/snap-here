import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch ";
import BackgroundColors from "./BackgroundColors";
import CommonSlider from "./CommonSlider";
import CodeThemeDropdown from "./CodeThemeDropdown";

const TEXT_COLOR = "#000";

export default function Settings({
  Color = ["#192f6a"],
  setBgColor,
  BGpadding,
  setBGpadding,
  theme,
  setTheme,
  isCodeSnippet,
  setIsCodeSnippetd,
  fileHeading,
  setfileHeading,
  enterFileHeading,
  setEnterFileHeading,
  fonts,
}) {
  const [isBackground, setBackground] = useState(false);
  const [isSize, setSize] = useState(false);
  const [isTheme, setisTheme] = useState(false);
  const [placeholder, setPlaceholder] = useState("A11Y Dark");

  return (
    <>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: fonts ? "RobotoMono" : undefined,
          }}
        >
          SETTINGS
        </Text>
      </View>
      <View style={styles.container}>
        <ToggleSwitch
          label="CODE SNIPPET"
          isEnabled={isCodeSnippet}
          toggleSwitch={() => {
            setIsCodeSnippetd((previousState) => !previousState);
            if (enterFileHeading) {
              setEnterFileHeading(false);
            }
          }}
          bgColor={Color}
          fonts={fonts}
        />
        {isCodeSnippet && (
          <>
            <ToggleSwitch
              label="FILE NAME"
              isEnabled={enterFileHeading}
              toggleSwitch={() =>
                setEnterFileHeading((previousState) => !previousState)
              }
              bgColor={Color}
              fonts={fonts}
            />
          </>
        )}
        {enterFileHeading && (
          <>
            <TextInput
              style={styles.textInput}
              value={fileHeading}
              onChangeText={setfileHeading}
              multiline={false}
              numberOfLines={1}
              placeholder="untitled"
              placeholderTextColor="#a9a9a9"
            />
          </>
        )}
        <ToggleSwitch
          label="COLOR"
          isEnabled={isBackground}
          toggleSwitch={() => {
            setBackground((previousState) => !previousState);
          }}
          bgColor={Color}
          fonts={fonts}
        />
        {isBackground && (
          <>
            <BackgroundColors setBgColor={setBgColor} />
          </>
        )}
        <ToggleSwitch
          label="SIZE"
          isEnabled={isSize}
          toggleSwitch={() => {
            setSize((previousState) => !previousState);
          }}
          bgColor={Color}
          fonts={fonts}
        />
        {isSize && (
          <>
            <CommonSlider
              value={BGpadding}
              onValueChange={setBGpadding}
              step={4}
              label="Background Size"
              Color={Color}
            />
          </>
        )}
        <ToggleSwitch
          label="THEME"
          isEnabled={isTheme}
          toggleSwitch={() => {
            setisTheme((previousState) => !previousState);
          }}
          bgColor={Color}
          fonts={fonts}
        />
        {isTheme && (
          <>
            <CodeThemeDropdown
              theme={theme}
              setTheme={setTheme}
              Color={Color}
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    paddingVertical: 10,
    paddingRight: 15,
    marginVertical: 20,
    gap: 20,
  },
  textInput: {
    width: "100%",
    height: 18,
    color: TEXT_COLOR,
    textAlign: "center",
    fontSize: 15,
    marginVertical: 10,
    marginBottom: 20,
  },
});
