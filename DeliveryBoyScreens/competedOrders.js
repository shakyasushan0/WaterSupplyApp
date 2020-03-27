import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CompletedOrder = props => (
  <View style={styles.container}>
    <Text>CompletedOrder</Text>
  </View>
);
export default CompletedOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
