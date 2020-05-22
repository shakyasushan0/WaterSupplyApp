import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const TestScreen = (props) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#22bcb5",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 100,
    }}
  >
    <Text style={styles.title}>Abc screen</Text>
    <Image style={styles.image} source={require("../assets/order.png")} />
    <Text style={styles.text}>asjdklasj lsjdl jsdjaslj lsjd l</Text>
  </View>
);
export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
});
