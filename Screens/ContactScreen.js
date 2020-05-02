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
} from "react-native";

import { Icon, Header, Right, Body } from "native-base";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
import { Card, Button } from "react-native-elements";
function sendMail() {
  MailComposer.composeAsync({
    recipients: ["shakyasushan0@gmail.com"],
    subject: "Enquiry",
    body: "To whom it may concern:",
  });
}
function Contact(props) {
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
          <Text style={{ margin: 10 }}>Chayabahal,Lalitpur</Text>
          <Text style={{ margin: 10 }}>Nepal</Text>
          <Text style={{ margin: 10 }}> Tel: +977 9860036647</Text>
          <Text style={{ margin: 10 }}> Fax: +852 8765 4321</Text>
          <Text style={{ margin: 10 }}>Email:shakyasushan0@gmail.com</Text>
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
            onPress={sendMail}
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
