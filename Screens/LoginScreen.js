import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Modal
} from "react-native";
import * as firebase from "firebase";
//import { Icon } from "native-base";
import { Zocial, Entypo } from "@expo/vector-icons";
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    email: "",
    password: "",
    errorMessage: null,
    authenticating: false,
    isModalVisible: false
  };

  handleLogin = () => {
    const { email, password } = this.state;
    this.setState({ authenticating: true });
    this.setState({ isModalVisible: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  renderCurrentScreen() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}
        >
          <View
            style={{
              backgroundColor: "#000000aa",
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 100,
                borderRadius: 5,
                backgroundColor: "#0A3D62"
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Authenticating please wait...
              </Text>
              <ActivityIndicator size="large" />
            </View>
          </View>
        </Modal>
        <ScrollView>
          <StatusBar barStyle="light-content"></StatusBar>
          <Image
            source={require("../assets/authHeader1.png")}
            style={{ marginTop: -176, marginLeft: -50 }}
          ></Image>
          <Image
            source={require("../assets/AuthFooter2.png")}
            style={{ position: "absolute", bottom: -325, right: -225 }}
          ></Image>
          <Image
            source={require("../assets/loginLogo.png")}
            style={{ marginTop: -120, alignSelf: "center" }}
          ></Image>
          <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <View style={styles.SectionStyle}>
              <Zocial
                name="email"
                size={25}
                style={{
                  color: "#2183f2",
                  marginLeft: -100,
                  padding: 10,
                  margin: 5
                }}
              />
              <TextInput
                style={{ backgroundColor: "white" }}
                placeholder="Enter Your Email Here"
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.SectionStyle}>
              <Entypo
                name="key"
                size={25}
                style={{
                  color: "#2183f2",
                  marginLeft: -80,
                  padding: 10,
                  margin: 5
                }}
              />
              <TextInput
                style={{ backgroundColor: "white" }}
                placeholder="Enter Your Password Here"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => this.props.navigation.navigate("SignupScreen")}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              New User?{" "}
              <Text style={{ fontWeight: "500", color: "#2183f2" }}>
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  render() {
    LayoutAnimation.easeInEaseOut();

    return <View style={styles.container}>{this.renderCurrentScreen()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting: {
    marginTop: -32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 18
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#2183f2",
    borderRadius: 7,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  lottie: {
    width: 100,
    height: 100
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 52,
    borderRadius: 5,
    margin: 10
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  }
});
