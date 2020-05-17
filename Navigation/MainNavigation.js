import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import InfoScreen from "../Screens/infoScreen";
import PastOrder from "../Screens/pastOrderScreen";
import CompletedOrder from "../Screens/completedOrderScreen";
import Profile from "../Screens/profile";
import Contact from "../Screens/ContactScreen";
import Order from "../Screens/OrderScreen";

import { Icon } from "react-native-elements";
const myDrawerNvigator = createDrawerNavigator(
  {
    InfoScreen: {
      screen: InfoScreen,
      navigationOptions: {
        title: "Info",
        drawerIcon: ({ tintColor }) => (
          <Icon type="entypo" name="info" size={24} color={tintColor} />
        ),
      },
    },
    PastOrder: {
      screen: PastOrder,
      navigationOptions: {
        title: "Pending Orders",
        drawerIcon: ({ tintColor }) => (
          <Icon type="feather" name="file-minus" size={24} color={tintColor} />
        ),
      },
    },
    CompletedOrder: {
      screen: CompletedOrder,
      navigationOptions: {
        title: "History",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-icons"
            name="history"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    ContactScreen: {
      screen: Contact,
      navigationOptions: {
        title: "Contact Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="font-awesome"
            name="address-card"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Order: {
      screen: Order,
      navigationOptions: {
        title: "Place Order",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-icons"
            name="add-shopping-cart"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },

  {
    contentComponent: (props) => <Profile {...props} />,
  }
);
export default createAppContainer(myDrawerNvigator);
