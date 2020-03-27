import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AssingnedOrder = props => (
  <View style={styles.container}>
    <Text>AssingnedOrder</Text>
  </View>
);
export default AssingnedOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
