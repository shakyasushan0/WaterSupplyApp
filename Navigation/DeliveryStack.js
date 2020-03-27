import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import AssignedOrder from "../DeliveryBoyScreens/assignedOrders";
import CompletedOrder from "../DeliveryBoyScreens/competedOrders";
import ProfileScreen from "../DeliveryBoyScreens/deliveryBoyProfile";

const tab = createMaterialTopTabNavigator({
  ProfileScreen,
  AssignedOrder,
  CompletedOrder
});
export default createAppContainer(tab);
