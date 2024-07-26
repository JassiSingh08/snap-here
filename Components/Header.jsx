import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from '@rneui/themed';

export default function Header() {
  return (
    <>

      <SafeAreaView style={styles.container}>
        <View>
          <Text>Header</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 8,
    backgroundColor: "#000",
    width: "100%",
  },
});
