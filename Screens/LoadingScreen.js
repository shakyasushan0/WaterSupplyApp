import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as firebase from "firebase";

export default function LoadingScreen(props) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? "Main" : "Auth");
    });
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size='large' />
      <Text>Loading Please Wait .... </Text>
    </View>
  );
}
