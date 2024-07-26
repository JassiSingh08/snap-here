import React, { useMemo, forwardRef } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";

const BottomSheets = forwardRef(
  ({ children, bottomSheetViewStyle, handleSheetChange }, ref) => {
    const snapPoints = useMemo(() => ["65%", "95%"], []);

    return (
      <BottomSheet
        index={-1}
        ref={ref}
        snapPoints={snapPoints}
        handleStyle={{
          // backgroundColor: "#000",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        // handleIndicatorStyle={{ backgroundColor: "#fff" }}
        onChange={handleSheetChange}
        enablePanDownToClose
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <View style={[styles.View, bottomSheetViewStyle]}>{children}</View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    // backgroundColor: "black",
  },
  View: {
    flex: 1,
  },
});

export default BottomSheets;
