import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Picker,
} from "react-native";
import { Header, Body, Right, Icon } from "native-base";
import { Card, CheckBox } from "react-native-elements";
import DatePicker from "react-native-datepicker";

function Order(props) {
  const [single, setSingle] = useState(false);
  const [recurrence, setReccurence] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
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
            />
          </View>
        </Card>

        <Card>
          <Text style={{ color: "#99AAAB" }}>Order Type</Text>

          <CheckBox
            title="One Time Order"
            checked={single}
            onPress={() => setSingle(!single)}
            containerStyle={{ backgroundColor: null, borderWidth: 0 }}
          />
          <CheckBox
            title="Recurrence Order"
            checked={recurrence}
            onPress={() => setReccurence(!recurrence)}
            containerStyle={{
              backgroundColor: null,
              borderWidth: 0,
              marginTop: -20,
            }}
          />
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
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Add Order</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 15 }} />
      </ScrollView>
    </View>
  );
}
export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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
    marginTop: 30,
    width: 200,
  },
});
