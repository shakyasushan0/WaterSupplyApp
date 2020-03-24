import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = props => (
  <View style={styles.container}>
    <Text>LoginScreen</Text>
    <View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("SignupScreen")}
      >
        <Text style={{ color: "blue" }}>New User?</Text>
      </TouchableOpacity>
    </View>
  </View>
);
export default LoginScreen;
LoginScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
