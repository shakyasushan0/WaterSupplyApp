import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
  PanResponder,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Icon, Right, Header, Body } from "native-base";
import { Card } from "react-native-elements";
import Fire from "../FIre";
import call from "react-native-phone-call";
import Swipeout from "react-native-swipeout";
import * as MailComposer from "expo-mail-composer";

function UserScreen(props) {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const makeCall = (number) => {
    const args = {
      number: number,
      prompt: false,
    };
    call(args);
  };

  useEffect(() => {
    Fire.shared.firestore.collection("users").onSnapshot((snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        const { address, avatar, email, name, telnum } = doc.data();
        users.push({
          address,
          avatar,
          email,
          name,
          telnum,
        });
      });
      setUsers(users);
    });
  }, []);
  const sendMail = (email) => {
    MailComposer.composeAsync({
      recipients: [email],
      body: "Dear user, ",
    });
  };

  if (users.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <Header transparent style={{ backgroundColor: "#2183f2" }}>
          <Body style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "#FFF",
                fontWeight: "900",
                textAlign: "center",
              }}
            >
              Users
            </Text>
          </Body>
        </Header>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header transparent style={{ backgroundColor: "#2183f2" }}>
        <Body style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              color: "#FFF",
              fontWeight: "900",
              //              marginLeft: 10
              //textAlign: "center"
            }}
          >
            Users
          </Text>
        </Body>
        <Right>
          <TouchableOpacity
            style={{ margin: 16 }}
            onPress={props.navigation.openDrawer}
          >
            <Icon
              type="FontAwesome"
              name="bars"
              size={24}
              color="#161924"
            ></Icon>
          </TouchableOpacity>
        </Right>
      </Header>
      <ScrollView>
        {users.map((user) => {
          var swipeOutButtons = [
            {
              component: (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Icon
                    name="gmail"
                    type="MaterialCommunityIcons"
                    style={{ fontSize: 40 }}
                  />
                </View>
              ),
              backgroundColor: "#F4C724",
              onPress: () => sendMail(user.email),
            },
            {
              component: (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Icon
                    name="phone"
                    type="AntDesign"
                    style={{ fontSize: 36 }}
                  />
                </View>
              ),
              backgroundColor: "#2ecc72",
              onPress: () => makeCall(user.telnum),
            },
          ];

          return (
            <Swipeout
              right={swipeOutButtons}
              autoClose={true}
              key={user.telnum}
            >
              <Card
                image={{ uri: user.avatar }}
                featuredTitle={user.name}
                featuredSubtitle={user.address}
              />
            </Swipeout>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default UserScreen;
