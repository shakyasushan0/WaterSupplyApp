import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Fire from "../FIre";

const TestScreen = props => (
  <View style={styles.container}>
    <Text onPress={() => Fire.shared.signOut()}>TestScreen</Text>
  </View>
);
export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
