import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Card, CardItem, Header, Body, Icon, Right, Badge } from "native-base";
import Fire from "../FIre";
import * as Animatable from "react-native-animatable";
export default function PastOrder(props) {
  const [orders, setOrders] = useState([]);
  const [errMess, setErrMess] = useState(null);
  useEffect(() => {
    const user = props.id || Fire.shared.uid;
    Fire.shared.firestore
      .collection("orders")
      .where("userId", "==", user)

      .onSnapshot((querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          const {
            address,
            amount,
            contact,
            customer,
            date,
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
      <View>
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
              Your Pending Orders
            </Text>
          </Body>
        </Header>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
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
              Your Pending Orders
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
          {orders
            .filter((order) => {
              return order.status != "delivered";
            })
            .map((order) => {
              return (
                <Animatable.View
                  animation="fadeInDown"
                  duration={2000}
                  key={order.id}
                >
                  <Card style={{ borderColor: "#2183f2" }}>
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
                        <View style={{ flexDirection: "row" }}>
                          <Icon
                            name="check"
                            type="FontAwesome5"
                            style={{ color: "gray" }}
                          />
                          <Text style={{ marginTop: 5 }}>Sent</Text>
                        </View>
                      )}
                      {order.status === "delivery on progress" && (
                        <View style={{ flexDirection: "row" }}>
                          <Icon
                            name="check-double"
                            type="FontAwesome5"
                            style={{ color: "#2183f2" }}
                          />
                          <Text>Delivery on Progress</Text>
                        </View>
                      )}
                      <Text style={{ color: "#2183f2" }}>
                        Rs. {order.amount}
                      </Text>
                    </CardItem>
                  </Card>
                </Animatable.View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
