import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Linking,
  TouchableHighlight,
  Alert,
  PanResponder,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import {
  Header,
  Right,
  Card,
  CardItem,
  Body,
  Badge,
  ActionSheet,
} from "native-base";
import call from "react-native-phone-call";
import Fire from "../FIre";
import { Divider, Icon } from "react-native-elements";
import getDirections from "react-native-google-maps-directions";
import Swipeout from "react-native-swipeout";
import * as Animatable from "react-native-animatable";

function PendingScreen(props) {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("this is whatsapp");
  const [custName, setCustName] = useState("");
  const [ord, setOrd] = useState({});
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [total, setTotal] = useState(0);

  const sendOnWhatsApp = (msg, mobile) => {
    // let msg = msg;
    // let mobile = "9860036647";
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg + "&phone=+977" + mobile;
        Linking.openURL(url)
          .then((data) => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            alert("Make sure Whatsapp installed on your device");
          });
      } else {
        alert("Please insert message to send");
      }
    } else {
      alert("Please insert mobile no");
    }
  };
  const informUser = (msg, mobile) => {
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg + "&phone=+977" + mobile;
        Linking.openURL(url)
          .then((data) => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            alert("Make sure Whatsapp installed on your device");
          });
      } else {
        alert("Please insert message to send");
      }
    } else {
      alert("Please insert mobile no");
    }
  };
  const makeCall = (number) => {
    const args = {
      number: number,
      prompt: false,
    };
    call(args);
  };
  const handleGetDirections = (lat, long) => {
    const data = {
      destination: {
        latitude: lat,
        longitude: long,
      },
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };
  const handleUpdate = async (id, name, cust, ord, amt, lat, long, mob) => {
    let db = Fire.shared.firestore.collection("orders").doc(id);
    await db
      .update({
        occupiedBy: name,
        occupied: true,
        status: "delivery on progress",
      })
      .then((result) => {
        alert("Successfully Assigned");
        setModalVisible(false);
      })
      .catch((err) => alert("error: ", err));

    sendOnWhatsApp(
      `You have been assingned new order, \nCustomer => ${cust}\norders : \n 20l jar =>${ord.jar_20l}\n 18l jar => ${ord.jar_18l}\n 1l bottle => ${ord.bottle_1l} \nAmount => ${amt}\nLocation => ${lat},${long}   `,
      mob
    );
  };
  const setDelivered = (id) => {
    let db = Fire.shared.firestore.collection("orders").doc(id);
    db.update({
      status: "delivered",
      deliveredDate: date,
    })
      .then((result) => alert("Successfully set to delivered"))
      .catch((err) => alert("error :", err));
  };
  useEffect(() => {
    //const user = props.id || Fire.shared.uid;
    Fire.shared.firestore.collection("orders").onSnapshot((querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        const {
          address,
          amount,
          contact,
          customer,
          date,
          latitude,
          longitude,
          occupiedBy,
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
          latitude,
          longitude,
          occupiedBy,
          order,
          status,
          time,
        });
      });
      setOrders(orders);
    });

    Fire.shared.firestore.collection("DeliveryBoy").onSnapshot((snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        const { Contact, FirstName, LastName, address, email } = doc.data();
        users.push({
          id: doc.id,
          Contact,
          FirstName,
          LastName,
          address,
          email,
        });
      });
      setUsers(users);
    });
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    var fullDate = date + "/" + month + "/" + year;
    setDate(fullDate);
  }, []);
  if (orders.length === 0) {
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
                type="font-awesome"
                name="bars"
                size={24}
                color="#161924"
              ></Icon>
            </TouchableOpacity>
          </Right>
        </Header>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

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
              type="font-awesome"
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
          .reverse()
          .map((order) => {
            const rightButtonDel = [
              {
                text: "Delivered",
                backgroundColor: "green",
                onPress: () =>
                  Alert.alert(
                    "Delivered?",
                    `Are you sure you want to set order of ${order.customer} as delivered?`,
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Not Deleted"),
                        style: " cancel",
                      },
                      {
                        text: "Ok",
                        onPress: () => setDelivered(order.id),
                      },
                    ],
                    {
                      cancelable: false,
                    }
                  ),
              },
            ];
            const rightButtonAssign = [
              {
                text: "Assign",
                type: "primary",
                onPress: () =>
                  Alert.alert(
                    "Assign Delivery Boy?",
                    "Are you sure you want to assign delivery boy?",

                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Not Deleted"),
                        style: " cancel",
                      },
                      {
                        text: "Ok",
                        onPress: () => {
                          setModalVisible(true);
                          setId(order.id);
                          setCustName(order.customer);
                          setOrd(order.order);
                          setLat(order.latitude);
                          setLong(order.longitude);
                          setTotal(order.amount);
                        },
                      },
                    ],
                    {
                      cancelable: false,
                    }
                  ),
              },
            ];

            return (
              <Swipeout
                right={
                  order.status == "pending" ? rightButtonAssign : rightButtonDel
                }
                autoClose={true}
              >
                <Card style={{ borderColor: "#2183f2" }} key={order.id}>
                  <CardItem
                    header
                    style={{ justifyContent: "space-between" }}
                    bordered
                  >
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      {order.date}
                    </Text>
                    {order.status === "pending" && (
                      <Badge
                        danger
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "white" }}>Pending ...</Text>
                      </Badge>
                    )}
                    {order.status === "delivery on progress" && (
                      <TouchableOpacity>
                        <Badge
                          success
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: "white" }}>
                            Assigned to {order.occupiedBy}
                          </Text>
                        </Badge>
                      </TouchableOpacity>
                    )}
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
                            Bottle 1l
                            ...............................................
                            {order.order.bottle_1l} bottles
                          </Text>
                        )}
                        <View style={{ marginTop: 7 }}>
                          <Text>
                            <Divider
                              style={{
                                width: 300,
                                height: 2,
                                backgroundColor: "gray",
                              }}
                            />
                          </Text>
                        </View>
                        <Text style={{ color: "#2183f2", fontSize: 18 }}>
                          Amount ............................ Rs.
                          {order.amount}
                        </Text>
                      </View>
                    </Body>
                  </CardItem>
                  <CardItem
                    footer
                    bordered
                    style={{ justifyContent: "center" }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (order.status === "pending") {
                          informUser(
                            `Thank you for placing the order.We will inform you whenever you order is ready to be delivered`,
                            order.contact
                          );
                        } else {
                          informUser(
                            "Your order is going to be deliverd today...",
                            order.contact
                          );
                        }
                      }}
                    >
                      <Icon
                        raised
                        reverse
                        name="whatsapp"
                        type="font-awesome"
                        color="green"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleGetDirections(order.latitude, order.longitude)
                      }
                    >
                      <Icon
                        raised
                        reverse
                        type="entypo"
                        name="location"
                        color="#2475B0"
                      />
                    </TouchableOpacity>
                  </CardItem>
                </Card>
              </Swipeout>
            );
          })}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setId("");
        }}
      >
        <View
          style={{
            backgroundColor: "#000000aa",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#ffffff",
              // alignItems: "center",
              // justifyContent: "center",
              width: 350,
              height: 400,
              borderRadius: 5,
              backgroundColor: "#0A3D62",
            }}
          >
            <ScrollView>
              {users.map((user) => (
                <TouchableOpacity
                  key={user.email}
                  onPress={() =>
                    handleUpdate(
                      id,
                      user.FirstName,
                      custName,
                      ord,
                      total,
                      lat,
                      long,
                      user.Contact
                    )
                  }
                >
                  <Card>
                    <CardItem style={{ justifyContent: "space-between" }}>
                      <Text>
                        {user.FirstName} {user.LastName}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          makeCall(user.Contact);
                        }}
                      >
                        <Icon
                          name="phone"
                          type="Feather"
                          style={{ color: "green", fontSize: 24 }}
                        />
                      </TouchableOpacity>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default PendingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
