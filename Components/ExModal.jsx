import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ExModal({
  isVisible,
  children,
  onClose,
  Color = ["#192f6a"],
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={[styles.modalContent, { backgroundColor: Color[0] }]}>
        <Pressable
          onPress={onClose}
          style={{ position: "absolute", right: 15, marginVertical: 15 }}
        >
          <MaterialIcons name="close" color="#fff" size={22} />
        </Pressable>

        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "15%",
    width: "80%",
    borderRadius: 18,
    alignSelf: "center",
    elevation: 5,
    marginVertical: "auto",
  },
  titleContainer: {
    height: "40%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
});
