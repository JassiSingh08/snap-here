import {
  Alert,
  BackHandler,
  Dimensions,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { placeholderText, showToast, errorText } from "./lib/constants";
import Settings from "./Settings";
import { Header as HeaderRNE } from "@rneui/themed";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import ToggleSwitch from "./ToggleSwitch ";
import { Icon } from "@rneui/base";
import ExModal from "./ExModal";
import Xapp from "./SVG/Xapp";
import { ScrollView } from "react-native-gesture-handler";
const width = Dimensions.get("screen").width;

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
  const [isDrafts, setDrafts] = useState(false);
  const [isModal, setModal] = useState(false);
  const [placeholder, setPlaceholder] = useState(placeholderText);

  const handleSnapPress = useCallback(() => {
    // if (isDrafts) {
    //   // Add your logic here for handling drafts
    // }
    if (codeSnippet.trim() !== "") {
      setShowHelperBtns(false);
      Keyboard.dismiss();
      setPlaceholder(placeholderText);
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      setPlaceholder(errorText);
    }
  }, [isDrafts, codeSnippet, errorText]);

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

  const pasteFromClipboard = async () => {
    try {
      const content = await Clipboard.getStringAsync();
      setCodeSnippet(content);
    } catch (error) {
      alert("Failed to read clipboard content");
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

  const openTwitter = async (message) => {
    const url = `twitter://post?message=${encodeURIComponent(message)}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  const onModalClose = () => {
    setModal(false);
  };

  return (
    <>
      <HeaderRNE
        elevated={true}
        placement="left"
        centerComponent={{
          text: isDrafts ? "Drafts Here" : "Snap Here",
          style: [styles.heading, fonts ? { fontFamily: "RobotoMono" } : {}],
        }}
        // rightComponent={
        //   <View style={styles.headerRight}>
        //     <TouchableOpacity
        //       onPress={() => {
        //         console.log("first");
        //       }}
        //     >
        //       <Icon name="menu" color="white" />
        //     </TouchableOpacity>
        //   </View>
        // }
        backgroundColor={bgColor[0]}
      />
      {/* <ToggleSwitch
        label="Drafts Mode"
        isEnabled={isDrafts}
        toggleSwitch={() => {
          setDrafts(!isDrafts);
          setPlaceholder(placeholderText);
        }}
        bgColor={bgColor}
      /> */}
      <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.colorOptions}
          showsHorizontalScrollIndicator={false}
        >
          {isDrafts ? (
            <View>
              <Text
                style={{
                  minWidth: width - 80,
                  minHeight: 120,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: theme.hljs.background,
                  color: theme.hljs.color,
                }}
              >
                {codeSnippet}
              </Text>
            </View>
          ) : (
            <>
              <ViewShot ref={viewShotRef}>
                <CodeWrapper
                  code={codeSnippet}
                  backgroundColor={bgColor}
                  fontSize={textSize}
                  theme={theme}
                  isCodeSnippet={isCodeSnippet}
                  fileHeading={fileHeading}
                  enterFileHeading={enterFileHeading}
                  fonts={fonts}
                />
              </ViewShot>
            </>
          )}
        </ScrollView>
      </SafeAreaView>

      <View style={styles.textAreaContainer}>
        <CustomTextInput
          style={[styles.textArea, fonts ? { fontFamily: "RobotoMono" } : {}]}
          value={codeSnippet}
          onChangeText={setCodeSnippet}
          placeholder={placeholder}
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
              fonts={fonts}
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
              onPress={pasteFromClipboard}
              Color={bgColor}
              work="paste"
            />
            <ActionButton
              onPress={() => {
                setCodeSnippet("");
                setPlaceholder(placeholderText);
              }}
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
      <ExModal isVisible={isModal} onClose={onModalClose} Color={bgColor}>
        <View style={{ height: 65, width: 65, marginLeft: 20, marginTop: 40 }}>
          <Xapp />
        </View>
      </ExModal>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 20,
    paddingVertical: 10,
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 12,
    marginHorizontal: 20,
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
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    bottom: "4%",
  },
});
