// CodeWrapper.js
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CodeHighlighter from "react-native-code-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { placeholderText } from "./lib/constants";
import { AntDesign } from "@expo/vector-icons";
const width = Dimensions.get("screen").width;

const CodeWrapper = ({
  code,
  backgroundColor,
  fontSize,
  BGpadding = 10,
  theme,
  isCodeSnippet,
  fileHeading,
  enterFileHeading,
}) => {
  return (
    <LinearGradient
      colors={backgroundColor ?? []}
      style={[styles.container, { padding: BGpadding }]}
    >
      <ScrollView
        contentContainerStyle={{
          minHeight: 100,
          justifyContent: "center",
        }}
      >
        <View
          style={[
            styles.codeHeader,
            { display: !isCodeSnippet ? "none" : "flex" },
          ]}
        >
          <View
            style={[
              [
                styles.colorCircle,
                { backgroundColor: "#ff5f57", marginLeft: 8 },
              ],
            ]}
          >
            <Text style={{ color: "#fff" }}></Text>
          </View>
          <View style={[[styles.colorCircle, { backgroundColor: "#febc2e" }]]}>
            <Text style={{ color: "#fff" }}></Text>
          </View>
          <View style={[[styles.colorCircle, { backgroundColor: "#28c840" }]]}>
            <Text style={{ color: "#a9a9a9" }}></Text>
          </View>
          {enterFileHeading && (
            <>
              <TouchableOpacity
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                  backgroundColor: theme.hljs.background,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  minWidth: 50,
                  height: 18,
                  marginTop: 5,
                  paddingHorizontal: 6,
                }}
              >
                <Text style={styles.textInput}>
                  {fileHeading ? fileHeading : "untitled"}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View
          style={
            {
              // borderBottomLeftRadius: 10,
              // borderBottomRightRadius: 10,
              // overflow: "hidden",
            }
          }
        >
          <CodeHighlighter
            hljsStyle={!theme ? atomOneDarkReasonable : theme}
            textStyle={{
              fontSize: fontSize,
            }}
            language="typescript"
            scrollViewProps={{
              contentContainerStyle: {
                minWidth: width - 80,
                minHeight: 100,
                padding: 10,
                borderRadius: 10,
              },
            }}
          >
            {code ? code : placeholderText}
          </CodeHighlighter>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: "center",
  },
  colorOptions: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
  },
  codeHeader: {
    backgroundColor: "#000",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 23,
    flexDirection: "row",
    position: "fixed",
  },
  headContainer: {},
  colorCircle: {
    width: 13,
    height: 13,
    borderRadius: 20,
    marginHorizontal: 2,
    borderWidth: 2,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  textInput: {
    width: "100%",
    height: 18,
    color: "#fff",
    padding: 0,
    marginTop: 3,
    textAlign: "center",
    fontSize: 9,
  },
});

export default CodeWrapper;
