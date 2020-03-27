import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserPermissions from "../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../FIre";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        avatar: null,
        telnum: "",
        address: ""
      },
      errorMessage: null,
      authenticating: false,
      isModalVisible: false
    };
  }

  handleSignUp = () => {
    const { name, email, password, avatar, telnum, address } = this.state.user;
    var regx1 = /^[9][0-9]{9}$/;
    var regx2 = /^([a-z 0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (name.length < 3) {
      alert("Your name must have atleast 3 characters");
    } else if (!regx2.test(email)) {
      alert("Invalid email");
    } else if (avatar === null) {
      alert("Please upload the pic of your id");
    } else if (!regx1.test(telnum)) {
      alert("invalid phone number");
    } else if (address.length < 3) {
      alert("Your address is too short");
    } else if (password.length < 6) {
      alert("Your password must have atleast 6 characters");
    } else {
      this.setState({ authenticating: true, isModalVisible: true });
      Fire.shared.createUser(this.state.user);
    }
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {this.state.errorMessage === null && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => this.setState({ isModalVisible: false })}
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
        )}
        <ScrollView>
          <StatusBar barStyle="light-content"></StatusBar>
          <Image
            source={require("../assets/authHeader1.png")}
            style={{ marginTop: -110, marginLeft: -60 }}
          ></Image>
          <Image
            source={require("../assets/AuthFooter2.png")}
            style={{ position: "absolute", bottom: -325, right: -225 }}
          ></Image>
          <TouchableOpacity
            style={styles.back}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons
              name="ios-arrow-round-back"
              size={32}
              color="#FFF"
            ></Ionicons>
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: 64,
              alignItems: "center",
              width: "100%"
            }}
          >
            <Text
              style={styles.greeting}
            >{`Hello!\nSign up to get started.`}</Text>
            <TouchableOpacity
              style={styles.avatarPlaceholder}
              onPress={this.handlePickAvatar}
            >
              <Image
                source={{ uri: this.state.user.avatar }}
                style={styles.avatar}
              />
              <Ionicons
                name="ios-add"
                size={40}
                color="#FFF"
                style={{ marginTop: 6, marginLeft: 2 }}
              ></Ionicons>
            </TouchableOpacity>
          </View>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <View behavior="padding">
              <Text style={styles.inputTitle}>Full Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={name =>
                  this.setState({ user: { ...this.state.user, name } })
                }
                value={this.state.user.name}
              ></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={email =>
                  this.setState({ user: { ...this.state.user, email } })
                }
                value={this.state.user.email}
              ></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={password =>
                  this.setState({ user: { ...this.state.user, password } })
                }
                value={this.state.user.password}
              ></TextInput>
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Contact no.</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                keyboardType={"numeric"}
                onChangeText={telnum =>
                  this.setState({ user: { ...this.state.user, telnum } })
                }
                value={this.state.user.telnum}
              ></TextInput>
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={address =>
                  this.setState({ user: { ...this.state.user, address } })
                }
                value={this.state.user.address}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 30 }}
            onPress={() => this.props.navigation.navigate("LoginScreen")}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              Already have an account?{" "}
              <Text style={{ fontWeight: "500", color: "#2183f2" }}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF"
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
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
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
