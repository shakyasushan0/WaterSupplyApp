import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as firebase from "firebase";

export default function LoadingScreen(props) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // props.navigation.navigate(user ? "Main" : "Auth");
      if (user && user.uid === "GpL4uAumQrYJmQiE2hqMtG3pMxP2") {
        props.navigation.navigate("Admin");
      } else if (user && user.uid != "GpL4uAumQrYJmQiE2hqMtG3pMxP2")
        props.navigation.navigate("Main");
      else if (
        user &&
        user.uid != "GpL4uAumQrYJmQiE2hqMtG3pMxP2" &&
        user.displayName === "delivery boy"
      )
        props.navigation.navigate("DeliveryBoy");
      else props.navigation.navigate("Auth");
    });
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Loading Please Wait .... </Text>
    </View>
  );
}
