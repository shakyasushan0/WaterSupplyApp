import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainNavigation from "./Navigation/MainStack";
import FirebaseKey from "./firebaseConfig";
import * as firebase from "firebase";
firebase.initializeApp(FirebaseKey);

export default function App() {
  return <MainNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
