import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Header, Body, Right, Icon } from "native-base";
import { Card, CheckBox } from "react-native-elements";
import DatePicker from "react-native-date-picker";

function Order(props) {
  const [single, setSingle] = useState(false);
  const [recurrence, setReccurence] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <ScrollView style={styles.container}>
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

      <View>
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
          <Text>Sel</Text>
          <DatePicker date={date} onDateChange={setDate} />
        </Card>
      </View>
    </ScrollView>
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
});
