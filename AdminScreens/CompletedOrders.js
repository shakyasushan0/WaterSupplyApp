import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Card, CardItem, Header, Body, Icon, Right } from "native-base";
import { Divider } from "react-native-elements";
import Fire from "../FIre";
const deleteOrder = (id) => {
  Fire.shared.firestore
    .collection("orders")
    .doc(id)
    .delete()
    .then(() => alert("deleted successfully"))
    .catch((err) => alert(err));
};
export default function CompletedScreen(props) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // const user = props.id || Fire.shared.uid;
    Fire.shared.firestore
      .collection("orders")
      // .where("userId", "==", user)
      .where("status", "==", "delivered")
      .onSnapshot((querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          const {
            address,
            amount,
            contact,
            customer,
            date,
            deliveredDate,
            order,
            status,
            time,
          } = doc.data();
          orders.push({
            id: doc.id,
            address,
            amount,
            contact,
            customer,
            date,
            deliveredDate,
            order,
            status,
            time,
          });
        });
        setOrders(orders);
      });
  }, []);
  if (orders.length === 0) {
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
              Completed Orders
            </Text>
          </Body>
        </Header>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  } else {
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
              Completed Orders
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
        <ScrollView style={{ flex: 1 }}>
          {orders.map((order) => {
            return (
              <Card style={{ borderColor: "green" }} key={order.id}>
                <CardItem
                  header
                  style={{ justifyContent: "space-between" }}
                  bordered
                >
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    {order.id}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    {order.deliveredDate}
                  </Text>
                </CardItem>
                <CardItem style={{ justifyContent: "space-between" }}>
                  <Body>
                    <Text style={{ fontSize: 18 }}>{order.customer}</Text>
                    <Text style={{ fontSize: 18 }}>{order.address}</Text>
                    <Text style={{ fontSize: 18 }}>{order.contact}</Text>
                    <Text>
                      <Divider
                        style={{
                          width: 150,
                          height: 2,
                          backgroundColor: "red",
                        }}
                      />
                    </Text>
                    <View style={{ marginTop: 5, marginLeft: 15 }}>
                      {order.order.jar_20l != 0 && (
                        <Text style={{ color: "#2183f2" }}>
                          Water jar 20l
                          ................................................{" "}
                          {order.order.jar_20l} jars
                        </Text>
                      )}
                      {order.order.jar_18l != 0 && (
                        <Text style={{ color: "#2183f2" }}>
                          Water jar 18l
                          ................................................{" "}
                          {order.order.jar_18l} jars
                        </Text>
                      )}
                      {order.order.bottle_1l != 0 && (
                        <Text style={{ color: "#2183f2" }}>
                          Water Bottle
                          ................................................{" "}
                          {order.order.bottle_1l} bottles
                        </Text>
                      )}
                    </View>
                  </Body>
                </CardItem>
                <CardItem
                  footer
                  style={{ justifyContent: "space-between" }}
                  bordered
                >
                  <TouchableOpacity onPress={() => deleteOrder(order.id)}>
                    <Icon
                      type="MaterialIcons"
                      name="delete"
                      size={16}
                      style={{ color: "red" }}
                    />
                  </TouchableOpacity>
                  <Text style={{ color: "#2183f2" }}>Rs. {order.amount}</Text>
                </CardItem>
              </Card>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
