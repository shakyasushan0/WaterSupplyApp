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
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { Header, Right, Icon, Card, CardItem, Body } from "native-base";
import call from "react-native-phone-call";
import Fire from "../FIre";
import { Divider } from "react-native-elements";
import getDirections from "react-native-google-maps-directions";

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
  const handleUpdate = async (id, name, cust, ord, lat, long, mob) => {
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
      `You have been assingned new order, ***Customer:${cust}***orders:${JSON.stringify(
        ord
      )}***Location:${lat},${long}***   `,
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
                type="FontAwesome5"
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
              type="FontAwesome5"
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
                  {order.status === "pending" && (
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                        setId(order.id);
                        setCustName(order.customer);
                        setOrd(order.order);
                        setLat(order.latitude);
                        setLong(order.longitude);
                      }}
                    >
                      <Icon
                        type="FontAwesome5"
                        name="user-edit"
                        size={16}
                        style={{ color: "#2183f2" }}
                      ></Icon>
                    </TouchableOpacity>
                  )}
                  {order.status === "delivery on progress" && (
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          alert(`Assigned to : ${order.occupiedBy}`)
                        }
                      >
                        <Icon
                          type="FontAwesome5"
                          name="user-check"
                          size={20}
                          style={{ color: "green" }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ marginLeft: 30 }}
                        onPress={() => setDelivered(order.id)}
                      >
                        <Icon name="checkcircle" type="AntDesign" />
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() =>
                        handleGetDirections(order.latitude, order.longitude)
                      }
                    >
                      <Icon type="Entypo" name="location" />
                    </TouchableOpacity>
                  </View>
                  <Text style={{ color: "#2183f2" }}>Rs. {order.amount}</Text>
                </CardItem>
              </Card>
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
                          name="whatsapp"
                          type="FontAwesome"
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
