import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import Fire from "../FIre";
import { Icon } from "native-base";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { Divider } from "react-native-elements";

const AdminProfile = props => (
  <ScrollView>
    <View style={{ paddingTop: 50, paddingLeft: 20 }}>
      <Image
        source={require("../assets/ModalBg.png")}
        size={{ width: 200, height: 100 }}
        style={{ position: "absolute", bottom: -10, right: -80 }}
      />
      <Text style={{ fontWeight: "500", fontSize: 32, marginTop: 15 }}>
        Welcome Admin
      </Text>

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
      <Text style={{}}>
        <Divider style={{ backgroundColor: "blue", width: 400, height: 2 }} />
      </Text>
    </View>
    <View style={{ flex: 1 }}>
      <DrawerNavigatorItems {...props} />
    </View>
  </ScrollView>
);
export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
