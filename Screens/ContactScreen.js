import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Icon, Header, Right, Body } from "native-base";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
import { Card, Button } from "react-native-elements";
import Fire from "../FIre";
function sendMail(email) {
  MailComposer.composeAsync({
    recipients: [email],
    subject: "Enquiry",
    body: "To whom it may concern:",
  });
}
function Contact(props) {
  const [usr, setUser] = useState({});
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const user = props.uid || Fire.shared.uid;
    Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        setUser(doc.data());
      });

    Fire.shared.firestore
      .collection("Retailer Details")
      .onSnapshot((querySnapshot) => {
        const details = [];
        querySnapshot.forEach((doc) => {
          const { address, contact, email, name } = doc.data();
          details.push({
            id: doc.id,
            address,
            contact,
            email,
            name,
          });
        });
        setDetails(details);
      });
  }, []);

  const detail = details.filter((d) => d.id === usr.branch)[0];
  return (
    <View style={{ flex: 1 }}>
      <Header
        transparent
        style={{ alignItems: "flex-end", backgroundColor: "#2183f2" }}
      >
        <Body style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              color: "#FFF",
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            Contact Us
          </Text>
        </Body>
        <Right>
          <TouchableOpacity
            style={{ margin: 16 }}
            onPress={props.navigation.openDrawer}
          >
            <Icon
              type="FontAwesome5"
              name="bars"
              size={24}
              color="#161924"
            ></Icon>
          </TouchableOpacity>
        </Right>
      </Header>
      <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
        <Card title="Contact Information">
          {details.length === 0 && (
            <View>
              <ActivityIndicator size="large" />
            </View>
          )}
          {details.length != 0 && (
            <Animatable.View animation="zoomIn" duration={2000}>
              <Text style={{ margin: 10 }}>{detail.name}</Text>
              <Text style={{ margin: 10 }}>{detail.address}</Text>
              <Text style={{ margin: 10 }}>Nepal</Text>
              <Text style={{ margin: 10 }}>Tel: +977 {detail.contact}</Text>

              <Text style={{ margin: 10 }}>Email:{detail.email}</Text>
            </Animatable.View>
          )}

          <Button
            title="Send Email"
            buttonStyle={{ backgroundColor: "#2183f2" }}
            icon={
              <Icon
                name="envelope-o"
                type="FontAwesome"
                style={{ color: "white", marginRight: 5 }}
              />
            }
            onPress={() => sendMail(detail.email)}
          />
        </Card>
      </Animatable.View>
    </View>
  );
}
export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
