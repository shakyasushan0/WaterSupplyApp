import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LineaGradient, { LinearGradient } from "expo-linear-gradient";
import Fire from "../FIre";
import { Icon } from "native-base";
export default function Profile(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = props.uid || Fire.shared.uid;
    Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(doc => {
        setUser(doc.data());
      });
  }, []);
  return (
    <ScrollView>
      <LinearGradient
        style={{ paddingTop: 60, padding: 5 }}
        colors={["#0A79DF", "#74B9FF"]}
      >
        {!user && <ActivityIndicator size="large" />}
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              shadowColor: "#151734",
              shadowRadius: 30,
              shadowOpacity: 0.4
            }}
          >
            <Image
              source={
                user.avatar
                  ? { uri: user.avatar }
                  : require("../assets/tempAvatar.jpg")
              }
              style={{
                width: 110,
                height: 110,
                borderRadius: 68,
                borderWidth: 3,
                borderColor: "white"
              }}
            />
          </View>

          <View style={{ marginHorizontal: 5, marginVertical: 12 }}>
            <Text
              style={{
                color: "#FFF",
                fontSize: 20,
                fontWeight: "800"
                //  marginVertical: 8
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                color: "#FFF",
                fontSize: 14,
                fontWeight: "100"
              }}
            >
              {user.email}
            </Text>
            <Text
              style={{
                color: "#FFF",
                fontSize: 14,
                fontWeight: "100"
              }}
            >
              {user.address}
            </Text>
            <Text
              style={{
                color: "#FFF",
                fontSize: 14,
                fontWeight: "100"
              }}
            >
              {user.telnum}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => Fire.shared.signOut()}
          style={{
            borderWidth: 1,
            borderRadius: 7,
            width: 100,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
            marginLeft: 70
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon type="MaterialCommunityIcons" name="logout" size={20} />
            <Text style={{ color: "#040505", marginTop: 5 }}>Logout</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <DrawerNavigatorItems {...props} />
      </View>
    </ScrollView>
  );
}
