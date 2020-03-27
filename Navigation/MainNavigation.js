import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import InfoScreen from "../Screens/infoScreen";
import PastOrder from "../Screens/pastOrderScreen";
import CompletedOrder from "../Screens/completedOrderScreen";
import Profile from "../Screens/profile";

import { Icon } from "native-base";
const myDrawerNvigator = createDrawerNavigator(
  {
    InfoScreen: {
      screen: InfoScreen,
      navigationOptions: {
        title: "Info",
        drawerIcon: ({ tintColor }) => (
          <Icon type="Entypo" name="info" size={16} color={tintColor} />
        )
      }
    },
    PastOrder: {
      screen: PastOrder,
      navigationOptions: {
        title: "Pending Orders",
        drawerIcon: ({ tintColor }) => (
          <Icon type="Feather" name="file-minus" size={16} color={tintColor} />
        )
      }
    },
    CompletedOrder: {
      screen: CompletedOrder,
      navigationOptions: {
        title: "History",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="MaterialIcons"
            name="history"
            size={16}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    contentComponent: props => <Profile {...props} />
  }
);
export default createAppContainer(myDrawerNvigator);
