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
  Alert
} from "react-native";

import { Icon, Header, Right } from "native-base";

import { Card, CardItem } from "native-base";
import { PricingCard, CheckBox } from "react-native-elements";
import Fire from "../FIre";
export default function InfoScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked_20l, setChecked_20l] = useState(false);

  const [checked_18l, setChecked_18l] = useState(false);
  const [checked_1l, setChecked_1l] = useState(false);
  const [qty20l, setqty20l] = useState(0);
  const [qty18l, setqty18l] = useState(0);
  const [qty1l, setqty1l] = useState(0);
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  var total = qty20l * 50 + qty18l * 40 + qty1l * 20;
  useEffect(() => {
    const user = props.uid || Fire.shared.uid;
    Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(doc => {
        setUser(doc.data());
      });

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var fullDate = date + "/" + month + "/" + year;
    var fullTime = hours + ":" + min + ":" + sec;
    setDate(fullDate);
    setTime(fullTime);
  }, []);
  const info = [
    {
      title: "Water jar",
      price: "Rs.50",
      qty: "per jar",
      vol: "20l"
    },
    {
      title: "Water jar",
      price: "Rs.40",
      qty: "per jar",
      vol: "18l"
    },
    {
      title: "Mineral Water Bottle",
      price: "Rs.20",
      qty: "per bottle",
      vol: "1l"
    }
  ];
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header
        transparent
        style={{ alignItems: "flex-end", backgroundColor: "#2183f2" }}
      >
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
      <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <SafeAreaView style={{ flex: 1 }}>
          {info.map(inf => {
            return (
              <PricingCard
                key={inf.vol}
                color="#4f9deb"
                title={inf.title}
                price={inf.price}
                info={[inf.qty, inf.vol]}
                button={{
                  title: "Order Now",
                  icon: "add",
                  buttonStyle: { borderRadius: 4 }
                }}
                onButtonPress={() => setModalVisible(true)}
              ></PricingCard>
            );
          })}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
              setqty18l(0);
              setqty20l(0);
              setqty1l(0);
              setChecked_18l(false);
              setChecked_1l(false);
              setChecked_20l(false);
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                // width: 400,
                height: 300,
                borderRadius: 5,
                borderColor: "#0A79DF",
                borderWidth: 3,
                // backgroundColor: "#0A3D62",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0
              }}
            >
              <Image
                source={require("../assets/ModalBg.png")}
                style={{ position: "absolute", bottom: -150, right: -150 }}
              />
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  center
                  title="Water Jar 20l"
                  iconRight
                  iconType="material"
                  checkedIcon="clear"
                  uncheckedIcon="add"
                  checkedColor="red"
                  uncheckedColor="green"
                  checked={checked_20l}
                  onPress={() => setChecked_20l(!checked_20l)}
                />
                {checked_20l && (
                  <View>
                    <TextInput
                      style={{
                        borderWidth: 2,
                        width: 100,
                        marginTop: 6,
                        textAlign: "center",
                        height: 45
                      }}
                      onChangeText={value => setqty20l(value)}
                      placeholder="Enter Quantity"
                      keyboardType="number-pad"
                    ></TextInput>
                  </View>
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  center
                  title="Water Jar 18l"
                  iconRight
                  iconType="material"
                  checkedIcon="clear"
                  uncheckedIcon="add"
                  checkedColor="red"
                  uncheckedColor="green"
                  checked={checked_18l}
                  onPress={() => setChecked_18l(!checked_18l)}
                />
                {checked_18l && (
                  <View>
                    <TextInput
                      style={{
                        borderWidth: 2,
                        width: 100,
                        marginTop: 6,
                        textAlign: "center",
                        height: 45
                      }}
                      onChangeText={value => setqty18l(value)}
                      placeholder="Enter Quantity"
                      keyboardType="number-pad"
                    ></TextInput>
                  </View>
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  center
                  title="Water Bottle 1l"
                  iconRight
                  iconType="material"
                  checkedIcon="clear"
                  uncheckedIcon="add"
                  checkedColor="red"
                  uncheckedColor="green"
                  checked={checked_1l}
                  onPress={() => setChecked_1l(!checked_1l)}
                />
                {checked_1l && (
                  <View>
                    <TextInput
                      style={{
                        borderWidth: 2,
                        width: 100,
                        marginTop: 6,
                        textAlign: "center",
                        height: 45
                      }}
                      onChangeText={value => setqty1l(value)}
                      placeholder="Enter Quantity"
                      keyboardType="number-pad"
                    ></TextInput>
                  </View>
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    width: 120,
                    height: 45,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 7,
                    marginTop: 10,
                    backgroundColor: "#2183f2"
                  }}
                  onPress={async () => {
                    if (qty20l === 0 && qty18l === 0 && qty1l === 0)
                      alert("Sorry this order cant be placed");
                    else {
                      await Fire.shared.addOrder(
                        user.id,
                        total,
                        user.name,
                        user.telnum,
                        user.address,
                        date,
                        time,
                        qty20l,
                        qty18l,
                        qty1l,
                        "pending"
                      );
                      alert("Thank you ! Your order has been placed");
                      setModalVisible(false);
                      setqty18l(0);
                      setqty20l(0);
                      setqty1l(0);
                      setChecked_18l(false);
                      setChecked_1l(false);
                      setChecked_20l(false);
                    }
                  }}
                >
                  <Text style={{ color: "#FFF", fontWeight: "600" }}>
                    Confirm Total = {total}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
