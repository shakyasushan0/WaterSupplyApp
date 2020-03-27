import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Card, CardItem, Header, Body, Icon } from "native-base";
import Fire from "../FIre";
export default function PastOrder(props) {
  const [orders, setOrders] = useState([]);
  const [errMess, setErrMess] = useState(null);
  useEffect(() => {
    const user = props.id || Fire.shared.uid;
    Fire.shared.firestore
      .collection("orders")
      .where("userId", "==", user)

      .onSnapshot(querySnapshot => {
        const orders = [];
        querySnapshot.forEach(doc => {
          const {
            address,
            amount,
            contact,
            customer,
            date,
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
              Your Pending Orders
            </Text>
          </Body>
        </Header>
        {orders
          .filter(order => {
            return order.status != "delivered";
          })
          .map(order => {
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
                    {order.date}
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
                  {order.status === "pending" && (
                    <Icon
                      type="FontAwesome5"
                      name="truck-loading"
                      size={16}
                      style={{ color: "#2183f2" }}
                    />
                  )}
                  {order.status === "delivery on progress" && (
                    <Icon
                      type="MaterialCommunityIcons"
                      name="truck-delivery"
                      size={20}
                      style={{ color: "#2183f2" }}
                    />
                  )}
                  <Text style={{ color: "#2183f2" }}>Rs. {order.amount}</Text>
                </CardItem>
              </Card>
            );
          })}
      </ScrollView>
    );
  }
}
