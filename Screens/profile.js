import React from "react";
import { View, Text } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LineaGradient, { LinearGradient } from "expo-linear-gradient";

export default function Profile(props) {
  return (
    <ScrollView>
      <LinearGradient
        style={{ paddingTop: 60, padding: 16 }}
        colors={["#0A79DF", "#74B9FF"]}
      >
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 3,
            borderColor: "#FFFR"
          }}
        ></TouchableOpacity>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <DrawerNavigatorItems {...props} />
      </View>
    </ScrollView>
  );
}
