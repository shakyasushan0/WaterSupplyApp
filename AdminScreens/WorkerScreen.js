import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Card, CardItem, Icon, Right, Header, Body } from "native-base";
import call from "react-native-phone-call";
import Fire from "../FIre";
const width = Dimensions.get("window").width;

export default function WorkerScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pword, setpword] = useState("");
  const [contact, setContact] = useState("");
  const [users, setUsers] = useState([]);
  const makeCall = number => {
    const args = {
      number: number,
      prompt: false
    };
    call(args);
  };
  const deleteOrder = id => {
    Fire.shared.firestore
      .collection("DeliveryBoy")
      .doc(id)
      .delete()
      .then(() => alert("deleted successfully"))
      .catch(err => alert(err));
  };
  useEffect(() => {
    Fire.shared.firestore.collection("DeliveryBoy").onSnapshot(snapshot => {
      const users = [];
      snapshot.forEach(doc => {
        const { Contact, FirstName, LastName, address, email } = doc.data();
        users.push({
          id: doc.id,
          Contact,
          FirstName,
          LastName,
          address,
          email
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
              Delivery Boy
            </Text>
          </Body>
        </Header>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
            Delivery Boy
          </Text>
        </Body>
      </Header>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
              width: width - 60,
              borderWidth: 1,
              //  height: "50%",
              borderRadius: 7,
              backgroundColor: "white",
              borderColor: "#2183f2"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles.textInput}
                placeholder="First Name"
                onChangeText={fn => setFirstName(fn)}
              ></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Last Name "
                onChangeText={ln => setLastName(ln)}
              ></TextInput>
            </View>
            <TextInput
              style={{
                borderWidth: 1,
                height: 50,
                textAlign: "center",
                color: "#2183f2",
                borderColor: "#2183f2"
              }}
              placeholder="Email"
              keyboardAppearance="dark"
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
              keyboardType="email-address"
              autoCapitalize="none"
            ></TextInput>
            <TextInput
              style={{
                borderWidth: 1,
                height: 50,
                textAlign: "center",
                color: "#2183f2",
                borderColor: "#2183f2"
              }}
              placeholder="Address "
              onChangeText={pword => setpword(pword)}
              autoCapitalize="none"
            ></TextInput>
            <TextInput
              style={{
                borderWidth: 1,
                height: 50,
                textAlign: "center",
                color: "#2183f2",
                borderColor: "#2183f2"
              }}
              placeholder="Contact No."
              keyboardType="number-pad"
              onChangeText={con => setContact(con)}
            ></TextInput>
          </View>
          <View style={{ marginTop: 50 }}>
            <TouchableOpacity
              style={{
                width: 130,
                height: 50,
                backgroundColor: "#2183f2",
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                Fire.shared.addDeliveryBoy(
                  firstName,
                  lastName,
                  email,
                  pword,
                  contact
                );
                setModalVisible(false);
              }}
            >
              <Text>Add Delivery Boy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView>
        {users.map(user => {
          return (
            <Card
              key={user.email}
              style={{ borderRadius: 10, borderColor: "#2183f2" }}
            >
              <CardItem>
                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text>
                    {user.FirstName} {user.LastName}
                  </Text>
                  <Text>{user.email}</Text>
                  <Text>{user.address}</Text>
                  <Text>{user.Contact}</Text>
                </View>
                <Right>
                  <TouchableOpacity
                    onPress={() => {
                      makeCall(user.Contact);
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
              <CardItem
                footer
                bordered
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <TouchableOpacity onPress={() => deleteOrder(user.id)}>
                  <Icon
                    type="MaterialIcons"
                    name="delete"
                    size={16}
                    style={{ color: "red" }}
                  />
                </TouchableOpacity>
              </CardItem>
            </Card>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 30,
          right: 30
        }}
        onPress={() => setModalVisible(true)}
      >
        <Icon
          name="user-plus"
          type="FontAwesome5"
          style={{ color: "#2183f2" }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    borderWidth: 1,
    width: "50%",
    height: 50,
    textAlign: "center",
    color: "#2183f2",
    borderColor: "#2183f2"
  }
});
