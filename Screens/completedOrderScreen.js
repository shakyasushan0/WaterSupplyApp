import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Card, CardItem, Header, Body, Icon } from "native-base";
import Fire from "../FIre";
const deleteOrder = id => {
  Fire.shared.firestore
    .collection("orders")
    .doc(id)
    .delete()
    .then(() => alert("deleted successfully"))
    .catch(err => alert(err));
};
export default function CompletedOrder(props) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const user = props.id || Fire.shared.uid;
    Fire.shared.firestore
      .collection("orders")
      .where("userId", "==", user)
      .where("status", "==", "delivered")
      .onSnapshot(querySnapshot => {
        const orders = [];
        querySnapshot.forEach(doc => {
          const {
            address,
            amount,
            contact,
            customer,
            date,
            deliveredDate,
            order,
            status,
            time
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
            time
          });
        });
        setOrders(orders);
      });
  }, []);
  if (!orders) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ flex: 1 }}>
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
              Transaction History
            </Text>
          </Body>
        </Header>
        {orders.map(order => {
          return (
            <Card style={{ borderColor: "#2183f2" }} key={order.id}>
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
                  {order.order.jar_20l != 0 && (
                    <Text style={{ color: "#2183f2" }}>
                      Water jar 20l
                      .......................................................{" "}
                      {order.order.jar_20l} jars
                    </Text>
                  )}
                  {order.order.jar_18l != 0 && (
                    <Text style={{ color: "#2183f2" }}>
                      Water jar 18l
                      .......................................................{" "}
                      {order.order.jar_18l} jars
                    </Text>
                  )}
                  {order.order.bottle_1l != 0 && (
                    <Text style={{ color: "#2183f2" }}>
                      Water Bottle
                      ..................................................{" "}
                      {order.order.bottle_1l} bottles
                    </Text>
                  )}
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
    );
  }
}
