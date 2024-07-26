import {
  Alert,
  BackHandler,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ViewShot from "react-native-view-shot";
import CodeWrapper from "./CodeWrapper";
import { CustomTextInput } from "./CustomTextInput";
import BottomSheets from "./BottomSheet.";
import ActionButton from "./ActionButton";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as MediaLibrary from "expo-media-library";
import { placeholderText, showToast } from "./lib/constants";
import Settings from "./Settings";
import { Header as HeaderRNE } from "@rneui/themed";
import * as Clipboard from "expo-clipboard";
import { useFonts } from "expo-font";

let colorScheme;

export default function MainScreen({
  deviceTheme,
  fonts,
  bgColor,
  setBgColor,
}) {
  colorScheme = deviceTheme;
  const [codeSnippet, setCodeSnippet] = useState("");
  const viewShotRef = useRef();
  const bottomSheetRef = useRef(null);
  const [textSize, setTextSize] = useState(15);
  const [BGpadding, setBGpadding] = useState(10);
  const [showHelperBtns, setShowHelperBtns] = useState(true);
  const [theme, setTheme] = useState(atomOneDarkReasonable);
  const [isCodeSnippet, setIsCodeSnippetd] = useState(false);
  const [enterFileHeading, setEnterFileHeading] = useState(false);
  const [fileHeading, setfileHeading] = useState("");
  const [backPressedCount, setBackPressedCount] = useState(0);

  const handleSnapPress = useCallback(() => {
    setShowHelperBtns(false);
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const handleSheetChange = useCallback((index) => {
    setShowHelperBtns(index === -1);
  }, []);

  const saveToGallery = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await MediaLibrary.createAssetAsync(uri);
        showToast(
          "success",
          `Image ${
            fileHeading ? `${fileHeading}-SnapHereShot` : "SnapHereShot"
          } Saved to Gallery!`
        );
      } else {
        showToast(
          "error",
          "Permission Denied",
          "Media library permission is Required!!"
        );
      }
    } catch (error) {
      showToast("error", "Image Couldn't be Saved!");
      console.error("Error saving image:", error);
    }
  };

  const captureView = async () => {
    try {
      const uri = await viewShotRef.current.capture({
        format: "png",
        quality: 1,
        fileName: fileHeading
          ? `${fileHeading}"-SnapHereShot"`
          : "SnapHereShot",
      });
      console.log("Image saved to", uri);
      saveToGallery(uri);
    } catch (error) {
      console.error("Failed to capture screenshot", error);
    }
  };

  const handleCopy = async () => {
    if (codeSnippet.trim()) {
      await Clipboard.setStringAsync(codeSnippet);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current?.close();
          setBackPressedCount(0);
        }

        if (backPressedCount < 1) {
          setBackPressedCount(1);
          showToast("info", "Press Back gain to Exit!", "", 2000);
          const timeoutId = setTimeout(() => {
            setBackPressedCount(0);
          }, 2000);

          return true;
        } else {
          BackHandler.exitApp();
          return true;
        }
      }
    );

    return () => {
      backHandler.remove(); // Clean up back handler on unmount
    };
  }, [backPressedCount]);

  return (
    <>
      <HeaderRNE
        elevated={true}
        placement="left"
        centerComponent={{
          text: "Snap Here",
          style: [styles.heading, fonts ? { fontFamily: "RobotoMono" } : {}],
        }}
        backgroundColor={bgColor[0]}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.colorOptions}
          showsHorizontalScrollIndicator={false}
        >
          <ViewShot ref={viewShotRef}>
            <CodeWrapper
              code={codeSnippet}
              backgroundColor={bgColor}
              fontSize={textSize}
              theme={theme}
              isCodeSnippet={isCodeSnippet}
              fileHeading={fileHeading}
              enterFileHeading={enterFileHeading}
            />
          </ViewShot>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.textAreaContainer}>
        <CustomTextInput
          style={[styles.textArea, fonts ? { fontFamily: "RobotoMono" } : {}]}
          value={codeSnippet}
          onChangeText={setCodeSnippet}
          placeholder={placeholderText}
          maxLength={1000}
          lineLength={50}
          autoFocus={showHelperBtns}
        />
      </View>
      <BottomSheets
        bottomSheetViewStyle={styles.bottomSheet}
        ref={bottomSheetRef}
        handleSheetChange={handleSheetChange}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ViewShot ref={viewShotRef}>
            <CodeWrapper
              code={codeSnippet}
              backgroundColor={bgColor}
              fontSize={textSize}
              BGpadding={BGpadding}
              theme={theme}
              isCodeSnippet={isCodeSnippet}
              fileHeading={fileHeading}
              enterFileHeading={enterFileHeading}
            />
          </ViewShot>
        </ScrollView>
        <Settings
          setBgColor={setBgColor}
          Color={bgColor}
          BGpadding={BGpadding}
          setBGpadding={setBGpadding}
          theme={theme}
          setTheme={setTheme}
          isCodeSnippet={isCodeSnippet}
          setIsCodeSnippetd={setIsCodeSnippetd}
          fileHeading={fileHeading}
          setfileHeading={setfileHeading}
          enterFileHeading={enterFileHeading}
          setEnterFileHeading={setEnterFileHeading}
          fonts={fonts}
        />
      </BottomSheets>

      <View style={styles.buttonContainer}>
        {showHelperBtns && (
          <>
            <ActionButton onPress={handleCopy} Color={bgColor} work="copy" />
            <ActionButton
              onPress={() => setCodeSnippet("")}
              Color={bgColor}
              work="clear"
            />
            <ActionButton
              onPress={handleSnapPress}
              Color={bgColor}
              work="export"
            />
          </>
        )}
        {!showHelperBtns && (
          <ActionButton onPress={captureView} Color={bgColor} work="download" />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 30,
    // backgroundColor: colorScheme === "light" ? "#fff" : "#000",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textAreaContainer: {
    flex: 1 / 2,
    padding: 15,
    // backgroundColor: colorScheme === "light" ? "#fff" : "#000",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  colorOptions: {
    paddingTop: 20,
  },
  textArea: {
    height: 200,
    padding: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    textAlignVertical: "top",
    marginVertical: 10,
    // color: colorScheme === "light" ? "#000" : "#fff",
    // fontFamily: "RobotoMono",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  exportButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  exportButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  bottomSheet: {
    padding: 5,
    width: "100%",
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    position: "absolute",
    bottom: "2%",
    right: "3%",
  },
});
