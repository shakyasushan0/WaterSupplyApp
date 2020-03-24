import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function InfoScreen(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ alignItems: "flex-end", margin: 16 }}
          onPress={props.navigation.openDrawer}
        >
          <FontAwesome5 name="bars" size={24} color="#161924"></FontAwesome5>
        </TouchableOpacity>
        <Text>InfoScreen</Text>
      </SafeAreaView>
    </View>
  );
}
