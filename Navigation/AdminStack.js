import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import UserScreen from "../AdminScreens/UserScreen";
import WorkerScreen from "../AdminScreens/WorkerScreen";
import PendingScreen from "../AdminScreens/PendingOrders";
import CompletedScreen from "../AdminScreens/CompletedOrders";
import AdminProfile from "../AdminScreens/adminProfile";

const adminDrawer = createDrawerNavigator(
  {
    PendingScreen: {
      screen: PendingScreen,
      navigationOptions: {
        title: "Pending Orders"
      }
    },
    CompletedScreen: {
      screen: CompletedScreen,
      navigationOptions: {
        title: "Completed Orders"
      }
    },
    UserScreen: {
      screen: UserScreen,
      navigationOptions: {
        title: "Users"
      }
    },
    WorkerScreen: {
      screen: WorkerScreen,
      navigationOptions: {
        title: "Delivery Boy"
      }
    }
  },
  {
    contentComponent: props => <AdminProfile {...props} />
  }
);
export default createAppContainer(adminDrawer);
