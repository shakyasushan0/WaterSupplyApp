import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Picker,
  Alert,
  ToastAndroid,
} from "react-native";
import { Header, Body, Right, Icon } from "native-base";
import { Card, CheckBox } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import RadioButton from "../Components/RadioButton";
import Fire from "../FIre";

function Order(props) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [jar, setJar] = useState(0);
  const [bottle, setBottle] = useState(0);
  const [orderType, setOrderType] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = props.uid || Fire.shared.uid;
    Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
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
    setOrderDate(fullDate);
    setOrderTime(fullTime);
  }, []);

  const PROP = [
    {
      key: "One Time Order",
      text: "One Time Order",
    },
    {
      key: "Recurrence Order",
      text: "Recurrence Order",
    },
  ];

  const getValue = (value) => {
    setOrderType(value);
  };

  const resetForm = () => {
    setDate(new Date());
    setJar(0);
    setBottle(0);
  };

  const handleSubmit = () => {
    if (jar == 0 && bottle == 0) alert("Sorry this order cant be placed");
    else {
      Alert.alert(
        "Place Order ? ",
        ` Jar : ${jar} cans \n Bottle : ${bottle} cans \n Order Type : ${orderType} \n Preferd delivey date : ${date} \n Prefered delivery time : ${time} \n Total Amount : ${
          jar * 35 + bottle * 15
        }`,
        [
          {
            text: "Cancel",
            type: "cancel",
          },
          {
            text: "Confirm",
            onPress: () => {
              Fire.shared.addOrder(
                user.id,
                jar * 35 + bottle * 15,
                user.branch,
                user.name,
                user.telnum,
                user.address,
                orderDate,
                orderTime,
                jar,
                bottle,
                "pending",
                user.latitude,
                user.longitude,
                date,
                time,
                orderType
              );

              ToastAndroid.showWithGravityAndOffset(
                "Your Order has been Placed",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
            },
          },
        ]
      );
      resetForm();
    }
  };
  return (
    <View style={styles.container}>
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
            Place Order
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

      <ScrollView>
        <Card>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.stretch}
              source={require("../assets/WaterJar.png")}
            />
            <View style={{ padding: 20, paddingLeft: 45 }}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Normal 20L Can
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 10,
                  fontWeight: "600",
                }}
              >
                Rs. 35
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18 }}>Enter no. of Cans: </Text>
            <TextInput
              style={{ width: 80, borderWidth: 1, textAlign: "center" }}
              keyboardType="decimal-pad"
              onChangeText={(qty) => setJar(qty)}
              value={jar}
            />
          </View>
        </Card>
        <Card>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.stretch2}
              source={require("../assets/bottle.png")}
            />
            <View style={{ padding: 20, paddingLeft: 45 }}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Normal 1L Can
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 10,
                  fontWeight: "600",
                }}
              >
                Rs. 15
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18 }}>Enter no. of Cans: </Text>
            <TextInput
              style={{ width: 80, borderWidth: 1, textAlign: "center" }}
              keyboardType="decimal-pad"
              onChangeText={(qty) => setBottle(qty)}
              value={bottle}
            />
          </View>
        </Card>

        <Card>
          <Text style={{ color: "#99AAAB" }}>Order Type</Text>
          <View style={{ marginTop: 10 }} />
          <RadioButton PROP={PROP} getValue={(val) => getValue(val)} />
          <Text style={{ color: "#99AAAB" }}>
            Select Prefered Delivery Date and Time
          </Text>
          <DatePicker
            style={{ width: 200, marginTop: 20, marginLeft: 15 }}
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => setDate(date)}
          />
          <View style={{ marginTop: 20, marginLeft: 17, flexDirection: "row" }}>
            <Icon
              name="ios-clock"
              type="Ionicons"
              style={{ fontSize: 32, color: "#E44236" }}
            />
            <View
              style={{
                width: 163,
                borderWidth: 0.5,
                marginLeft: 8,
                justifyContent: "center",
              }}
            >
              <Picker
                selectedValue={time}
                style={{
                  height: 50,
                  width: 170,
                  marginTop: -7,
                  height: 47,
                }}
                onValueChange={(itemValue, itemIndex) => setTime(itemValue)}
                mode="dropdown"
              >
                <Picker.Item label="9 to 12 am" value="9 to 12 am" />
                <Picker.Item label="2 to 5 pm" value="2 to 5 pm" />
                <Picker.Item label="6 to 9 pm" value="6 to 9 pm" />
              </Picker>
            </View>
          </View>
        </Card>
        <Card>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#00C853" }}>
              Your total price is : {jar * 35 + bottle * 15}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={{ color: "#FFF", fontWeight: "500" }}>
                Add Order
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
        <View style={{ height: 15 }} />
      </ScrollView>
    </View>
  );
}
export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    width: 80,
    height: 115,
    resizeMode: "stretch",
    marginLeft: 20,
  },
  stretch2: {
    width: 90,
    height: 115,
    resizeMode: "stretch",
    marginLeft: 18,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#2183f2",
    borderRadius: 7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 200,
  },
});
