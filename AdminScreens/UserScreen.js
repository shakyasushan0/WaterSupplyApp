import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator
} from "react-native";
import { Card, CardItem, Icon, Right, Header, Body } from "native-base";
import Fire from "../FIre";
import call from "react-native-phone-call";

function UserScreen(props) {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const makeCall = number => {
    const args = {
      number: number,
      prompt: false
    };
    call(args);
  };

  useEffect(() => {
    Fire.shared.firestore.collection("users").onSnapshot(snapshot => {
      const users = [];
      snapshot.forEach(doc => {
        const { address, avatar, email, name, telnum } = doc.data();
        users.push({
          address,
          avatar,
          email,
          name,
          telnum
        });
      });
      setUsers(users);
    });
  }, []);

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
                textAlign: "center"
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
              fontSize: 16,
              color: "#FFF",
              fontWeight: "900",
              textAlign: "center"
            }}
          >
            Users
          </Text>
        </Body>
      </Header>
      <ScrollView>
        {users.map(user => {
          return (
            <View key={user.telnum}>
              <TouchableOpacity>
                <Card style={{ borderRadius: 10 }}>
                  <CardItem>
                    <Image
                      source={{ uri: user.avatar }}
                      style={{ width: 100, height: 100 }}
                    ></Image>
                    <View style={{ flexDirection: "column", marginLeft: 10 }}>
                      <Text>{user.name}</Text>
                      <Text>{user.email}</Text>
                      <Text>{user.address}</Text>
                      <Text>{user.telnum}</Text>
                    </View>
                    <Right>
                      <TouchableOpacity
                        onPress={() => {
                          makeCall(user.telnum);
                        }}
                      >
                        <Icon
                          name="phone-call"
                          type="Feather"
                          style={{ color: "green", fontSize: 24 }}
                        />
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default UserScreen;
