import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MainNavigation from "./Navigation/MainStack";
import FirebaseKey from "./firebaseConfig";
import "./fixtimerbug";
import * as firebase from "firebase";
import AppIntroSlider from "react-native-app-intro-slider";
import Test from "./Screens/test";
const order = require("./assets/order.png");
const delivery = require("./assets/delivery.png");
const drinking = require("./assets/tempAvatar.jpg");
const slides = [
  {
    key: "s1",
    text:
      "We provide best hygienic water which is your first and foremost medicine!",
    title: "Water",
    image: require("./assets/drinking.png"),
    backgroundColor: "#3395ff",
  },
  {
    key: "s2",
    title: "Order",
    text:
      "We provide ordering in the easiest way and best service to fulfill your expectations!",
    image: require("./assets/order.png"),
    backgroundColor: "#febe29",
  },
  {
    key: "s3",
    title: "Delivery",
    text:
      "Same day at your doorstep, anytime, anywhere and on time, this is what our service means!",
    image: require("./assets/delivery.png"),
    backgroundColor: "#22bcb5",
  },
];

firebase.initializeApp(FirebaseKey);
console.disableYellowBox = true;
export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);
  _onDone = () => {
    setShowRealApp(true);
  };
  _onSkip = () => {
    setShowRealApp(true);
  };
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  if (showRealApp) return <MainNavigation />;
  else
    return (
      <AppIntroSlider
        data={slides}
        renderItem={this._renderItem}
        onDone={this._onDone}
        showSkipButton={true}
        onSkip={this._onSkip}
      />
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
